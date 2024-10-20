import React, { useEffect } from "react"
import { addDays, isAfter, isBefore } from "date-fns"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import PropertyRows from "@/module/Hosting/Reservations/calendar/property/property-rows"
import { generateDays, generateMonth } from "./helpers/calendar-table"
import { useCalendarStore } from "@/module/Hosting/Reservations/calendar/property/stores/use-calendar-store"
import Controls from "@/module/Hosting/Reservations/calendar/property/controls"
import ModalsWrapper from "@/module/Hosting/Reservations/calendar/property/modals-wrapper"
import useGetProperties from "./hooks/use-get-properties"
import { QK_CALENDAR_PROPERTIES } from "./constants"
import {
  T_Calendar_Property,
  T_Calendar_Property_Unit,
  T_Calendar_Property_Unit_Group,
} from "@repo/contract"

const CalendarTable = () => {
  const queryClient = useQueryClient()
  const {
    daysPerPage,
    startDate,
    searchString,
    setPropertyData,
    setSearchString,
  } = useCalendarStore((state) => state)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 11)
  const { data: calendarProperties } = useGetProperties(
    startDate.toLocaleDateString(),
    endDate.toLocaleDateString()
  )

  useEffect(() => {
    const calendarEnd = addDays(startDate, daysPerPage - 1)

    const isReservationWithinRange = (reservation: {
      startDate: string | number | Date
      endDate: string | number | Date
    }) => {
      const bookingStart = new Date(reservation.startDate)
      const bookingEnd = new Date(reservation.endDate)
      return !(
        isAfter(bookingStart, calendarEnd) || isBefore(bookingEnd, startDate)
      )
    }

    const transformUnitType = (unitType: T_Calendar_Property_Unit_Group) => {
      const bookableUnits: T_Calendar_Property_Unit[] = []

      const units = [
        ...(unitType.beds || []),
        ...(unitType.rooms || []),
        ...(unitType.wholePlaces || []),
      ]

      units.forEach((unit) => {
        const filteredReservations = unit.reservations.filter(
          isReservationWithinRange
        )

        bookableUnits.push({
          id: unit.id,
          name: unit.name,
          status: unit.status,
          reservations: filteredReservations,
        })
      })

      return bookableUnits
    }

    const filterItems = (items: T_Calendar_Property[]) =>
      items
        .map((item: T_Calendar_Property) => ({
          propertyTitle: item.propertyTitle,
          bookableUnitTypes: item.bookableUnitTypes.reduce(
            (
              acc: T_Calendar_Property_Unit_Group[],
              unitType: T_Calendar_Property_Unit_Group
            ) => {
              if (unitType.beds || unitType.rooms || unitType.wholePlaces) {
                const transformedUnits = transformUnitType(unitType)
                if (transformedUnits.length > 0) {
                  acc.push({
                    id: unitType.id,
                    name: unitType.name,
                    price: unitType.price,
                    units: transformedUnits,
                    pricePerDates: unitType.pricePerDates,
                  })
                }
              }
              return acc
            },
            []
          ),
        }))
        .filter(
          (item: { bookableUnitTypes: string | any[] }) =>
            item.bookableUnitTypes.length > 0
        )

    const applySearchFilter = (data: T_Calendar_Property[]) => {
      if (!searchString) return data // No search string, return original data

      const trimmedSearchString = searchString.toLowerCase().trim()

      const filteredItems = data
        .map((property: T_Calendar_Property) => ({
          ...property,
          bookableUnitTypes: property.bookableUnitTypes
            .map((unitType: T_Calendar_Property_Unit_Group) => ({
              ...unitType,
              beds: unitType.beds?.filter((unit: T_Calendar_Property_Unit) => {
                const trimmedAbbr = unit.name.toLowerCase().trim()
                return (
                  trimmedAbbr.includes(trimmedSearchString) ||
                  unit.reservations.some((reservation: { name: string }) => {
                    const trimmedName = reservation.name.toLowerCase().trim()
                    return trimmedName.includes(trimmedSearchString)
                  })
                )
              }),
              rooms: unitType.rooms?.filter(
                (unit: T_Calendar_Property_Unit) => {
                  const trimmedAbbr = unit.name.toLowerCase().trim()
                  return (
                    trimmedAbbr.includes(trimmedSearchString) ||
                    unit.reservations.some((reservation: { name: string }) => {
                      const trimmedName = reservation.name.toLowerCase().trim()
                      return trimmedName.includes(trimmedSearchString)
                    })
                  )
                }
              ),
              wholePlaces: unitType.wholePlaces?.filter(
                (unit: T_Calendar_Property_Unit) => {
                  const trimmedAbbr = unit.name.toLowerCase().trim()
                  return (
                    trimmedAbbr.includes(trimmedSearchString) ||
                    unit.reservations.some((reservation: { name: string }) => {
                      const trimmedName = reservation.name.toLowerCase().trim()
                      return trimmedName.includes(trimmedSearchString)
                    })
                  )
                }
              ),
            }))
            .filter(
              (unitType: T_Calendar_Property_Unit_Group) =>
                (unitType.wholePlaces && unitType.wholePlaces?.length > 0) ||
                (unitType.rooms && unitType.rooms?.length > 0) ||
                (unitType.beds && unitType.beds?.length > 0)
            ), // Only keep unitTypes with matching units
        }))
        .filter(
          (property: T_Calendar_Property) =>
            property.bookableUnitTypes.length > 0 // Only keep categories with matching bookableUnitTypes
        )

      return filteredItems
    }
    // Create the newFilteredData based on the original filter logic
    const newFilteredData = filterItems(calendarProperties?.items ?? [])

    // Apply the search filter to newFilteredData
    const finalFilteredData = applySearchFilter(newFilteredData)
    // Update the state based on the final filtered data
    if (finalFilteredData.length > 0) {
      setPropertyData(finalFilteredData)
    } else if (searchString && finalFilteredData.length === 0) {
      toast.error(`No matched results for "${searchString}"`)
      setSearchString("")
    }
  }, [
    startDate,
    daysPerPage,
    calendarProperties?.items,
    searchString,
    setPropertyData,
  ])

  useEffect(() => {
    if (startDate) {
      queryClient.invalidateQueries({
        queryKey: [QK_CALENDAR_PROPERTIES],
      })
    }
  }, [startDate])

  return (
    <>
      <div className="w-full mt-4 overflow-hidden rounded-xl border border-b-0">
        <div>
          <div className="overflow-auto">
            <table className="min-w-max w-full rounded-xl">
              <thead>
                <tr className="uppercase text-sm leading-normal">
                  <td colSpan={1} rowSpan={2}>
                    {/* Header Top Left Controls */}
                    <Controls />
                  </td>
                  {/* Header Month */}
                  {generateMonth({ daysPerPage, startDate })}
                </tr>
                <tr className="uppercase text-sm leading-normal">
                  {/* Header Days */}
                  {generateDays({ daysPerPage, startDate })}
                </tr>
              </thead>
              <tbody>
                <PropertyRows />
              </tbody>
            </table>
          </div>
          <ModalsWrapper />
        </div>
      </div>
    </>
  )
}

export default CalendarTable

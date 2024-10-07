import React, { useEffect } from "react"
import { addDays, isAfter, isBefore } from "date-fns"
import toast from "react-hot-toast"
import { Room, Bed, WholePlace } from "../../types/CalendarTable"
import useGetCalendarProperty from "../hooks/useGetCalendarProperty"
import { useQueryClient } from "@tanstack/react-query"
import PropertyRows from "./property-rows"
import { generateDays, generateMonth } from "./helpers/calendar-table"
import { useCalendarStore } from "./stores/use-calendar-store"
import Controls from "./controls"
import ModalsWrapper from "./modals-wrapper"

const CalendarTable = () => {
  const queryClient = useQueryClient()
  const { daysPerPage, startDate, searchString, setUnitData, setSearchString } =
    useCalendarStore((state) => state)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 11)
  const { data: calendarProperties } = useGetCalendarProperty(
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

    const transformUnitType = (unitType: {
      beds: Bed[]
      rooms: Room[]
      wholePlaces: WholePlace[]
    }) => {
      const bookableUnits: Bed[] = []

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
          bookings: [],
        })
      })

      return bookableUnits
    }

    const filterItems = (items: any[]) =>
      items
        .map((item: { propertyTitle: string; bookableUnitTypes: any[] }) => ({
          name: item.propertyTitle,
          bookableUnitTypes: item.bookableUnitTypes.reduce(
            (
              acc: {
                id: string
                unitType: any
                units: any[]
                price: any
                pricePerDates: any[]
              }[],
              unitType: {
                beds: any
                rooms: any
                wholePlaces: any
                name: any
                price: any
                pricePerDates: any[]
              }
            ) => {
              if (unitType.beds || unitType.rooms || unitType.wholePlaces) {
                const transformedUnits = transformUnitType(unitType)
                if (transformedUnits.length > 0) {
                  acc.push({
                    //@ts-ignore
                    id: unitType.id,
                    unitType: unitType.name,
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

    const applySearchFilter = (data: any) => {
      if (!searchString) return data // No search string, return original data

      const trimmedSearchString = searchString.toLowerCase().trim()

      const filteredItems = data.items
        .map((category: { name: string; bookableUnitTypes: any[] }) => ({
          ...category,
          bookableUnitTypes: category.bookableUnitTypes
            .map((unitType: any) => ({
              ...unitType,
              units: unitType.units.filter(
                (unit: { name: string; reservations: any[] }) => {
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
            .filter((unitType: { units: any[] }) => unitType.units.length > 0), // Only keep unitTypes with matching units
        }))
        .filter(
          (category: { bookableUnitTypes: any[] }) =>
            category.bookableUnitTypes.length > 0 // Only keep categories with matching bookableUnitTypes
        )

      return {
        ...data,
        items: filteredItems,
      }
    }

    // Create the newFilteredData based on the original filter logic
    const newFilteredData = {
      items: filterItems(calendarProperties?.items ?? []),
    }
    // Apply the search filter to newFilteredData
    const finalFilteredData = applySearchFilter(newFilteredData)
    // Update the state based on the final filtered data
    if (finalFilteredData.items.length > 0) {
      setUnitData(finalFilteredData)
    } else if (searchString && finalFilteredData.items.length === 0) {
      toast.error(`No matched results for "${searchString}"`)
      setSearchString("")
    }
  }, [
    startDate,
    daysPerPage,
    calendarProperties?.items,
    searchString,
    setUnitData,
  ])

  useEffect(() => {
    if (startDate) {
      queryClient.invalidateQueries({
        queryKey: ["calendar-property"],
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

import React, { useEffect } from "react"
import { addDays, isAfter, isBefore } from "date-fns"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { generateDays, generateMonth } from "../helpers/calendar-table"
import ModalsWrapper from "./modals-wrapper"
import { QK_CALENDAR_BIKE_RENTALS } from "../constants"
import {
  T_Calendar_Bike_Rental,
  T_Calendar_Rental,
  T_Calendar_Reservation,
} from "@repo/contract"
import useGetBikeRentals from "../hooks/use-get-bike-rentals"
import { useCalendarStore } from "../stores/use-private-store"
import Controls from "./controls"
import RentalRows from "./rental-rows"

const BikeCalendarTable = () => {
  const queryClient = useQueryClient()
  const {
    daysPerPage,
    startDate,
    searchString,
    setSearchString,
    setRentalData,
  } = useCalendarStore((state) => state)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 11)
  const { data: calendarRentals } = useGetBikeRentals(
    startDate.toLocaleDateString(),
    endDate.toLocaleDateString()
  )

  useEffect(() => {
    const calendarEnd = addDays(startDate, daysPerPage - 1)

    const isReservationWithinRange = (reservation: T_Calendar_Reservation) => {
      const bookingStart = new Date(reservation.startDate)
      const bookingEnd = new Date(reservation.endDate)
      return !(
        isAfter(bookingStart, calendarEnd) || isBefore(bookingEnd, startDate)
      )
    }

    const filterReservations = (reservations: T_Calendar_Reservation[]) =>
      reservations.filter(isReservationWithinRange)

    const filterBicycles = (bicycles: T_Calendar_Rental[]) =>
      bicycles
        .map((bicycles) => ({
          ...bicycles,
          reservations: filterReservations(bicycles.reservations),
        }))
        .filter(
          (car) =>
            !searchString ||
            car.name.toLowerCase().includes(searchString.toLowerCase())
        )

        const filterCategories = (categories: T_Calendar_Bike_Rental[]) =>
          categories
            .map((category: T_Calendar_Bike_Rental) => ({
              ...category,
              bicycles: filterBicycles(category.bicycles),
            }))
            .filter((category: T_Calendar_Bike_Rental) => category.bicycles.length > 0);
        
        const newFilteredData = filterCategories(calendarRentals?.items ?? []);

        if (newFilteredData.length > 0) {
          setRentalData(newFilteredData);
        } else if (searchString && newFilteredData.length == 0) {
      toast.error(`No matched results for "${searchString}"`)
      setSearchString("")
    }
  }, [startDate, daysPerPage, calendarRentals?.items, searchString])

  useEffect(() => {
    if (startDate) {
      queryClient.invalidateQueries({
        queryKey: [QK_CALENDAR_BIKE_RENTALS],
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
                <RentalRows />
              </tbody>
            </table>
          </div>
          {/* <ModalsWrapper /> */}
        </div>
      </div>
    </>
  )
}

export default BikeCalendarTable

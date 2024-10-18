import React from "react"
import { format, addDays } from "date-fns"
import { ChevronDown, ChevronRight } from "lucide-react"
import { T_Calendar_Motor_Rental } from "@repo/contract"
import { pricePerDatesMotor } from "../helpers/price-per-dates"
import VehicleUnitRows from "./rental-unit-rows"
import { useCalendarStore } from "../stores/use-motor-store"

const RentalRows = () => {
  const {
    startDate,
    daysPerPage,
    collapsed,
    rentalData,
    setCollapsed,
    setIsEditPricePerDatesModalOpen,
    setSelectedDate,
    setSelectedUnitId,
  } = useCalendarStore((state) => state)
  const toggleCollapse = (category: string) => {
    setCollapsed({ ...collapsed, [category]: !collapsed[category] })
  }
  const handleOpenPricePerDatesModal = (date: string, category: string) => {
    setIsEditPricePerDatesModalOpen(true)
    setSelectedDate(date)
    setSelectedUnitId(category)
  }

  return (
    <>
      {rentalData.map((rental: T_Calendar_Motor_Rental, index) => (
        <React.Fragment key={rental.name}>
          <tr
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => toggleCollapse(rental.name)}
          >
            <td className={`border p-4 text-left font-bold border-l-0`}>
              <span className="flex gap-2 items-center">
                {collapsed[rental.name] ? <ChevronRight /> : <ChevronDown />}
                {rental.name}
              </span>
            </td>
            {[...Array(daysPerPage)].map((_, i) => {
              const today = new Date()
              const date = format(addDays(startDate, i), "yyyy-MM-dd")
              const isToday =
                format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
              const noReservationCount = rental.motorcycles.reduce(
                (count: any, motorRental: any) => {
                  const hasReservation = motorRental.reservations.some(
                    (reservation: any) => {
                      const reservationStart = format(
                        new Date(reservation.startDate),
                        "yyyy-MM-dd"
                      )
                      const reservationEnd = format(
                        new Date(reservation.endDate),
                        "yyyy-MM-dd"
                      )
                      return date >= reservationStart && date <= reservationEnd
                    }
                  )
                  return count + (hasReservation ? 0 : 1)
                },
                0
              )
              return (
                <td
                  key={i}
                  className={`border gap-1 hover:bg-gray-200 text-sm p-2 h-max text-center text-gray-500 font-semibold max-w-24 ${i + 1 === daysPerPage && "border-r-0"} ${isToday && "bg-primary-100"}`}
                >
                  <div
                    onClick={(e) => {
                      handleOpenPricePerDatesModal(date, rental.id)
                      e.stopPropagation()
                    }}
                    className="flex flex-col"
                  >
                    <div>{noReservationCount}</div>
                    <div>
                      &#8369;
                      {pricePerDatesMotor({ rental, date })}
                    </div>
                  </div>
                </td>
              )
            })}
          </tr>
          <VehicleUnitRows rental={rental} activityIndex={index} />
        </React.Fragment>
      ))}
    </>
  )
}

export default RentalRows

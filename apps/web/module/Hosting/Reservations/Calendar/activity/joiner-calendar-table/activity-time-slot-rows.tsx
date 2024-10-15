import React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { generateTimeSlotRowBorder } from "../helpers/calendar-table"
import { useCalendarStore } from "../stores/use-joiner-store"
import {
  T_Calendar_Joiner_Activity,
  T_Calendar_Reservation,
  T_Joiner_Slot,
} from "@repo/contract"
import ActivityQtySlotRows from "./activity-qty-slot-rows"
import { addDays, format } from "date-fns"
import { pricePerDatesJoiner } from "../helpers/price-per-dates"

const ActivityTimeSlotRows = ({
  activity,
  activityIndex,
}: {
  activity: T_Calendar_Joiner_Activity
  activityIndex: number
}) => {
  const {
    startDate,
    daysPerPage,
    collapsed,
    setCollapsed,
    setSelectedDate,
    setSelectedUnitId,
    setIsEditPricePerDatesModalOpen,
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
      {/* Sub Category (Units) */}
      {!collapsed[activity.name] &&
        activity.joinerActivities.map((joinerActivity, index) => {
          const today = new Date()
          const date = format(addDays(startDate, index), "yyyy-MM-dd")
          const isToday =
            format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
          const noReservationCount = joinerActivity.slots.reduce(
            (count: number, slot: T_Joiner_Slot) => {
              const hasReservation = slot.reservations.some(
                (reservation: T_Calendar_Reservation) => {
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
          const price = (
            <button
              onClick={(e) => {
                handleOpenPricePerDatesModal(date, joinerActivity.id)
                e.stopPropagation()
              }}
              className="flex flex-col w-full h-full items-center justify-center text-sm font-normal"
            >
              <div>{noReservationCount}</div>
              <div>
                &#8369;
                {pricePerDatesJoiner({ joinerActivity, date })}
              </div>
            </button>
          )
          return (
            <>
              <tr
                key={joinerActivity.name}
                className="hover:bg-gray-100 relative cursor-pointer"
              >
                <td
                  className="border py-4 pr-4 pl-12 text-left border-l-0"
                  onClick={() => toggleCollapse(joinerActivity.name)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {collapsed[joinerActivity.name] ? (
                        <ChevronRight />
                      ) : (
                        <ChevronDown />
                      )}
                      <span>{joinerActivity.name}</span>
                    </div>
                  </div>
                </td>
                <td
                  colSpan={daysPerPage}
                  className={`border text-center relative ${activityIndex + 1 !== daysPerPage && "border-r-0"}`}
                >
                  <div className="absolute inset-0 z-10 flex h-full">
                    {generateTimeSlotRowBorder({
                      daysPerPage,
                      startDate,
                      content: price,
                    })}
                  </div>
                </td>
              </tr>
              <ActivityQtySlotRows
                activity={activity}
                joinerActivity={joinerActivity}
                activityIndex={index}
              />
            </>
          )
        })}
    </>
  )
}

export default ActivityTimeSlotRows

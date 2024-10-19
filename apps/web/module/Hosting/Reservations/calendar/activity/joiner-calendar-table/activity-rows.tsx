import React from "react"
import { format, addDays } from "date-fns"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useCalendarStore } from "../stores/use-joiner-store"
import ActivityTimeSlotRows from "./activity-time-slot-rows"
import { T_Calendar_Joiner_Activity, T_Joiner_Activity } from "@repo/contract"
import {
  pricePerDatesJoiner,
  pricePerDatesPrivate,
} from "../helpers/price-per-dates"

const ActivityRows = () => {
  const {
    startDate,
    daysPerPage,
    collapsed,
    activityData,
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
      {activityData.map((activity: T_Calendar_Joiner_Activity, index) => (
        <React.Fragment key={activity.name}>
          <tr
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => toggleCollapse(activity.name)}
          >
            <td className={`border p-4 text-left font-bold border-l-0`}>
              <span className="flex gap-2 items-center">
                {collapsed[activity.name] ? <ChevronRight /> : <ChevronDown />}
                {activity.name}
              </span>
            </td>
            {[...Array(daysPerPage)].map((_, i) => {
              const today = new Date()
              const date = format(addDays(startDate, i), "yyyy-MM-dd")
              const isToday =
                format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
              const noReservationCount = activity.joinerActivities.reduce(
                (count: any, joinerActivity: any) => {
                  const reservations = joinerActivity.reservations || []
                  const hasReservation = reservations.some(
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
                      handleOpenPricePerDatesModal(date, activity.id)
                      e.stopPropagation()
                    }}
                    className="flex flex-col"
                  >
                    <div>{noReservationCount}</div>

                    <div>
                      &#8369;
                      {pricePerDatesJoiner({
                        joinerActivity: activity.joinerActivities[0]!,
                        date,
                      })}
                    </div>
                  </div>
                </td>
              )
            })}
          </tr>
          <ActivityTimeSlotRows activity={activity} activityIndex={index} />
        </React.Fragment>
      ))}
    </>
  )
}

export default ActivityRows

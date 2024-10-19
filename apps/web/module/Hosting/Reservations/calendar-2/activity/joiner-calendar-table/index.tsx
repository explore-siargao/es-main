import React, { useEffect } from "react"
import { addDays, isAfter, isBefore } from "date-fns"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import ActivityRows from "@/module/Hosting/Reservations/calendar-2/activity/joiner-calendar-table/activity-rows"
import { generateDays, generateMonth } from "../helpers/calendar-table"
import { useCalendarStore } from "@/module/Hosting/Reservations/calendar-2/activity/stores/use-joiner-store"
import Controls from "./controls"
import ModalsWrapper from "@/module/Hosting/Reservations/calendar-2/activity/joiner-calendar-table/modals-wrapper"
import useGetJoinerActivities from "../hooks/use-get-joiner-activities"
import { QK_CALENDAR_JOINER_ACTIVITIES } from "../constants"
import {
  T_Calendar_Joiner_Activity,
  T_Calendar_Reservation,
  T_Joiner_Activity,
  T_Joiner_Slot,
} from "@repo/contract"
import normalizeDate from "../helpers/normalize-date"

const PrivateCalendarTable = () => {
  const queryClient = useQueryClient()
  const {
    daysPerPage,
    startDate,
    searchString,
    setSearchString,
    setActivityData,
  } = useCalendarStore((state) => state)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 12)
  const { data: calendarActivities } = useGetJoinerActivities(
    startDate.toLocaleDateString(),
    endDate.toLocaleDateString()
  )

  useEffect(() => {
    const calendarEnd = addDays(startDate, daysPerPage)

    const isReservationWithinRange = (reservation: T_Calendar_Reservation) => {
      const bookingStart = new Date(reservation.startDate)
      const bookingEnd = new Date(reservation.endDate)
      return !(
        isAfter(bookingStart, calendarEnd) ||
        isBefore(bookingEnd, normalizeDate(startDate))
      )
    }

    const filterReservations = (slot: T_Joiner_Slot) =>
      slot.reservations.filter(isReservationWithinRange)

    const filterPrivateActivities = (joinerActivities: T_Joiner_Activity[]) =>
      joinerActivities
        .map((joinerActivity) => ({
          ...joinerActivity,
          slots: joinerActivity.slots.map((slot) => ({
            ...slot,
            reservations: filterReservations(slot),
          })),
        }))
        .filter(
          (joinerActivity: T_Joiner_Activity) =>
            !searchString ||
            joinerActivity.name
              .toLowerCase()
              .includes(searchString.toLowerCase())
        )

    const filterActivities = (activities: T_Calendar_Joiner_Activity[]) =>
      activities
        .map((activity: T_Calendar_Joiner_Activity) => ({
          ...activity,
          joinerActivities: filterPrivateActivities(activity.joinerActivities),
        }))
        .filter(
          (activity: T_Calendar_Joiner_Activity) =>
            activity.joinerActivities.length > 0
        )

    const newFilteredData = filterActivities(calendarActivities?.items ?? [])

    if (newFilteredData.length > 0) {
      setActivityData(newFilteredData)
    } else if (searchString && newFilteredData.length == 0) {
      toast.error(`No matched results for "${searchString}"`)
      setSearchString("")
    }
  }, [startDate, daysPerPage, calendarActivities?.items, searchString])

  useEffect(() => {
    if (startDate) {
      queryClient.invalidateQueries({
        queryKey: [QK_CALENDAR_JOINER_ACTIVITIES],
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
                <ActivityRows />
              </tbody>
            </table>
          </div>
          <ModalsWrapper />
        </div>
      </div>
    </>
  )
}

export default PrivateCalendarTable

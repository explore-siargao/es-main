import React, { useEffect } from "react"
import { addDays, isAfter, isBefore } from "date-fns"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import ActivityRows from "@/module/Hosting/Reservations/calendar/activity/private-calendar-table/activity-rows"
import { generateDays, generateMonth } from "../helpers/calendar-table"
import { useCalendarStore } from "@/module/Hosting/Reservations/calendar/activity/stores/use-private-store"
import Controls from "@/module/Hosting/Reservations/calendar/activity/private-calendar-table/controls"
import ModalsWrapper from "./modals-wrapper"
import useGetPrivateActivities from "../hooks/use-get-private-activities"
import { QK_CALENDAR_PRIVATE_ACTIVITIES } from "../constants"
import {
  T_Calendar_Activity,
  T_Calendar_Private_Activity,
  T_Calendar_Reservation,
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
  const { data: calendarActivities } = useGetPrivateActivities(
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

    const filterReservations = (reservations: T_Calendar_Reservation[]) =>
      reservations.filter(isReservationWithinRange)

    const filterPrivateActivities = (
      privateActivities: T_Calendar_Activity[]
    ) =>
      privateActivities
        .map((privateActivity) => ({
          ...privateActivity,
          reservations: filterReservations(privateActivity.reservations),
        }))
        .filter(
          (privateActivity: T_Calendar_Activity) =>
            !searchString ||
            privateActivity.name
              .toLowerCase()
              .includes(searchString.toLowerCase())
        )

    const filterActivities = (activities: T_Calendar_Private_Activity[]) =>
      activities
        .map((activity: T_Calendar_Private_Activity) => ({
          ...activity,
          privateActivities: filterPrivateActivities(
            activity.privateActivities
          ),
        }))
        .filter(
          (activity: T_Calendar_Private_Activity) =>
            activity.privateActivities.length > 0
        )

    const newFilteredData = filterActivities(calendarActivities?.items ?? [])

    if (newFilteredData.length > 0) {
      setActivityData(newFilteredData ?? [])
    } else if (searchString && newFilteredData.length == 0) {
      toast.error(`No matched results for "${searchString}"`)
      setSearchString("")
    }
  }, [startDate, daysPerPage, calendarActivities?.items, searchString])

  useEffect(() => {
    if (startDate) {
      queryClient.invalidateQueries({
        queryKey: [QK_CALENDAR_PRIVATE_ACTIVITIES],
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

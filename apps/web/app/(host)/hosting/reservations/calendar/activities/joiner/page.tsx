import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import JoinerReservationCalendar from "@/module/Hosting/Reservations/calendar/activity/joiner-activity"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const ReservationCalendarPage = () => {
  return (
    <AuthGuard>
      <JoinerReservationCalendar />
    </AuthGuard>
  )
}

export default ReservationCalendarPage

import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import CalendarActivity from "@/module/Hosting/Reservations/Calendar/Activity"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const ReservationCalendarPage = () => {
  return (
    <AuthGuard>
      <CalendarActivity />
    </AuthGuard>
  )
}

export default ReservationCalendarPage
"use client"
import { Typography } from "@/common/components/ui/Typography"
import ActivitiesCalendarTable from "./CalendarTable"
import { useRouter } from "next/navigation"
import Tabs from "@/common/components/Tabs"
import reservationCalendarTabs from "../../helpers/reservationCalendarTabs"

const ActivitiesReservationCalendar = () => {
  const router = useRouter()
  return (
    <div className="mt-20">
      <div className="mb-4">
        <div className="flex flex-col justify-between">
          <Typography
            variant="h1"
            fontWeight="semibold"
            className="flex justify-between items-center"
          >
            Activity Reservations
          </Typography>
          <Tabs tabs={reservationCalendarTabs} />
        </div>
        
        <div className="flex mt-6">
          <ActivitiesCalendarTable />
        </div>
      </div>
    </div>
  )
}

export default ActivitiesReservationCalendar

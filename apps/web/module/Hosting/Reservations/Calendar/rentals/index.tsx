"use client"
import { Typography } from "@/common/components/ui/Typography"
import RentalsCalendarTable from "./CalendarTable"
import { useRouter } from "next/navigation"
import reservationCalendarTabs from "../../helpers/reservationCalendarTabs"
import Tabs from "@/common/components/Tabs"

const RentalsReservationCalendar = () => {
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
            Rental Reservations
          </Typography>
          <Tabs tabs={reservationCalendarTabs} />
        </div>
        
        <div className="flex mt-6">
          <RentalsCalendarTable />
        </div>
      </div>
    </div>
  )
}

export default RentalsReservationCalendar

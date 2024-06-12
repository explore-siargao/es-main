"use client"
import { Typography } from "@/common/components/ui/Typography"
import Sidebar from "./Sidebar"

const ReservationCalendar = () => {
  return (
    <div className="mt-20">
      <div className="mb-4">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center mb-2"
        >
          Calendar
        </Typography>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default ReservationCalendar

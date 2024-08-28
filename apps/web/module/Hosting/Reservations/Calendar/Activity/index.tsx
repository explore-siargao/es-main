"use client"
import { Typography } from "@/common/components/ui/Typography"
import ActivitiesCalendarTable from "./CalendarTable"
import { useRouter } from "next/navigation"
import { Button } from "@/common/components/ui/Button"
import { Table } from "lucide-react"
import ReservationCalendarTab from "../../components/ReservationCalendarTab"

const ActivitiesReservationCalendar = () => {
  const router = useRouter()
  return (
    <div className="mt-20">
      <div className="mb-4">
        <div className="flex-flex-col">
          <div className="flex gap-2 items-center justify-between">
            <Typography
              variant="h1"
              fontWeight="semibold"
              className="flex justify-between items-center"
            >
              Reservations
            </Typography>
            <Button
              onClick={() => router.push("/hosting/reservations/upcoming")}
              variant={"primary"}
              className="flex gap-2"
            >
              <Table />
              Table View
            </Button>
          </div>
          <ReservationCalendarTab />
        </div>

        <div className="flex mt-2">
          <ActivitiesCalendarTable />
        </div>
      </div>
    </div>
  )
}

export default ActivitiesReservationCalendar

"use client"
import { Typography } from "@/common/components/ui/Typography"
import CalendarTable from "./CalendarTable"
import { Table } from "lucide-react"
import { Button } from "@/common/components/ui/Button"
import { useRouter } from "next/navigation"
import ReservationTab from "../../components/ReservationTab"
import CalendarLegend from "../../components/CalendarLegend"

const ReservationCalendar = () => {
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
          <ReservationTab />
        </div>

        <div className="flex mt-2">
          <CalendarTable />
        </div>

        <div className="fixed bottom-4 right-4 z-20">
          <CalendarLegend />
        </div>
      </div>
    </div>
  )
}

export default ReservationCalendar
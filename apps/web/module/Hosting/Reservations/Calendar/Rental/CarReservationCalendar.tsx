"use client"
import { Typography } from "@/common/components/ui/Typography"
import CarCalendarTable from "./CarCalendarTable"
import ReservationTab from "../../components/ReservationTab"
import CalendarLegend from "../../components/CalendarLegend"
import RentalCalendarLegend from "../../components/RentalCalendarLegend"

const CarReservationCalendar = () => {
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
            {/* <Button
              onClick={() => router.push("/hosting/reservations/upcoming")}
              variant={"primary"}
              className="flex gap-2"
            >
              <Table />
              Table View
            </Button> */}
          </div>
          <ReservationTab />
        </div>

        <div className="flex mt-2">
          <CarCalendarTable />
        </div>

        <div className="fixed bottom-4 right-4 z-20">
          <RentalCalendarLegend />
        </div>
      </div>
    </div>
  )
}

export default CarReservationCalendar

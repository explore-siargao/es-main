"use client"
import { Typography } from "@/common/components/ui/Typography"
import ReservationCalendarTab from "../../components/ReservationTab"
import ActivityCalendarLegend from "../../components/ActivityCalendarLegend"
import sampleData from "../Rental/SampleData.json"
import JoinerCalendarTable from "./JoinerCalendarTable"

const JoinerReservationCalendar = () => {
  const hasData =
    sampleData &&
    Array.isArray(sampleData.categories) &&
    sampleData.categories.length > 0 &&
    sampleData.categories.some((category) =>
      category?.rooms?.some((room) => room.bookings.length > 0)
    )

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
          <ReservationCalendarTab />
        </div>

        {hasData ? (
          <>
            <div className="flex mt-2">
              <JoinerCalendarTable />
            </div>
            <div className="fixed bottom-4 right-4 z-20">
              <ActivityCalendarLegend />
            </div>
          </>
        ) : (
          <div>
            <Typography fontWeight="semibold" className="pt-4">
              Activity have not been created yet. Please create a activity to
              display on the calendar.
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default JoinerReservationCalendar

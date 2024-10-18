"use client"
import { Typography } from "@/common/components/ui/Typography"
// import CarCalendarTable from "./CarCalendarTable"
import ReservationTab from "../../components/ReservationTab"
// import RentalCalendarLegend from "../../components/RentalCalendarLegend"
// import useGetCalendarProperty from "../hooks/useGetCalendarProperty"

const CarReservationCalendar = () => {
  const currentDate = new Date()
  // const { data: sampleData } = useGetCalendarProperty(
  //   currentDate.toLocaleDateString(),
  //   currentDate.toLocaleDateString()
  // )

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
              Reservation
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
        <div>
          {/* {sampleData?.items?.length === 0 ? (
            <Typography fontWeight="semibold" className="pt-4">
              Rental units have not been created yet. Please create a rental
              unit to display on the calendar.
            </Typography>
          ) : (
            <>
              <div className="flex mt-2">
                <CarCalendarTable />
              </div>
              <div className="fixed bottom-4 right-4 z-20">
                <RentalCalendarLegend />
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default CarReservationCalendar

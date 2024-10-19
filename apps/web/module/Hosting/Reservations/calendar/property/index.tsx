"use client"
import { Typography } from "@/common/components/ui/Typography"
import ReservationTab from "../../components/reservation-tab"
import Legends from "./legends"
import { Spinner } from "@/common/components/ui/Spinner"
import CalendarTable from "@/module/Hosting/Reservations/calendar-2/property/calendar-table"
import useGetProperties from "./hooks/use-get-properties"

const PropertyCalendar = () => {
  const currentDate = new Date()
  const { data, isLoading } = useGetProperties(
    currentDate.toLocaleDateString(),
    currentDate.toLocaleDateString()
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
          </div>
          <ReservationTab />
        </div>

        {/* Loading indicator */}
        {isLoading ? (
          <div className="flex w-full h-[75vh] overflow-hidden justify-center items-center overflow-y-hidden">
            <Spinner variant={"primary"} />
          </div>
        ) : null}

        {/* Main content */}
        {data && !isLoading && data?.items && data?.items?.length > 0 ? (
          <>
            <div className="flex mb-20">
              <CalendarTable />
            </div>
            <div className="fixed bottom-4 right-4 z-20">
              <Legends />
            </div>
          </>
        ) : null}

        {/* No data content */}
        {!isLoading && (!data || (data?.items && data?.items?.length === 0)) ? (
          <div className="flex w-full h-[75vh] overflow-hidden pt-2 overflow-y-hidden">
            <Typography className="text-text-400 italic">
              Property units have not been created yet. Please create a property
              unit to display on the calendar.
            </Typography>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PropertyCalendar

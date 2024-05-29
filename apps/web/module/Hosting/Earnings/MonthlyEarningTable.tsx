import { PaymentHistoryBookingsData } from "@/common/components/Table/Type"
import Table from "@/common/components/Table"
import useGetMonthYearEarningsWithBookings from "../hooks/useGetMonthYearEarningsWithBookings"
import earningsColumns from "../helpers/earningsColumns"

const MonthlyEarningTable = ({ date }: { date: string }) => {
  const { data: bookings, isPending } =
    useGetMonthYearEarningsWithBookings(date)
  const filteredBookings = bookings?.item?.bookings?.filter(
    (booking: PaymentHistoryBookingsData) => {
      return booking.dateFrom !== null
    }
  )
  return (
    <div className="mt-7">
      <Table
        data={
          !isPending ? (filteredBookings as PaymentHistoryBookingsData[]) : []
        }
        columns={earningsColumns}
      />
    </div>
  )
}

export default MonthlyEarningTable

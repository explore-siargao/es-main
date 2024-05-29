import useGetPaymentHistoryTable from "./hooks/useGetPaymentHistoryTable"
import { PaymentHistoryBookingsData } from "@/common/components/Table/Type"
import Table from "@/common/components/Table"
import earningsColumns from "../helpers/earningsColumns"

const BookingsTable = () => {
  const { data: bookings, isPending } = useGetPaymentHistoryTable("all")
  return (
    <div className="pt-8">
      <Table
        data={
          !isPending
            ? (bookings?.item?.bookings as PaymentHistoryBookingsData[])
            : []
        }
        columns={earningsColumns}
      />
    </div>
  )
}

export default BookingsTable

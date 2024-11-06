import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import Image from "@/common/components/ui/image"
import { createColumnHelper } from "@tanstack/react-table"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Spinner } from "@/common/components/ui/Spinner"
import formatCurrency from "@/common/helpers/formatCurrency"
import EarningsTable from "@/common/components/Table"

const EarningBookingsTable = () => {
  const dummy = [
    {
      bookings: {
        listing: "1.jpg",
        dateFrom: "03-04-2024 11:05:04",
        dateTo: "03-05-2024 11:05:04",
        earnings: 2000,
      },
    },
    {
      bookings: {
        listing: "2.jpg",
        dateFrom: "03-06-2024 11:05:04",
        dateTo: "03-07-2024 11:05:04",
        earnings: 5000,
      },
    },
  ]

  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("bookings.listing", {
      header: "Listing",
      cell: (listing) => (
        <Link href="/profile">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              <Image
                src={`/assets/${listing.getValue()}`}
                alt="Image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>
      ),
    }),
    columnHelper.accessor("bookings.dateFrom", {
      header: "Date Range",
      cell: (dateRange) => {
        const dateFrom = new Date(dateRange.getValue()).toLocaleDateString(
          "en-US",
          { month: "long", day: "2-digit" }
        )
        const dateTo = new Date(
          dateRange.row.original.bookings.dateTo
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
        return <Typography variant="p">{dateFrom + " - " + dateTo}</Typography>
      },
    }),
    columnHelper.accessor("bookings.earnings", {
      header: "Earnings",
      cell: (earnings) => {
        return (
          <Typography variant="p">
            {formatCurrency(earnings.getValue())}
          </Typography>
        )
      },
    }),
  ]

  return (
    <div className="mt-20">
      <Spinner size="md">Loading...</Spinner>
      <div className="px-12">
        <EarningsTable data={dummy} columns={columns} />
      </div>
    </div>
  )
}

export default EarningBookingsTable

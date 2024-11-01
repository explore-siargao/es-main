"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import Table from "../../common/components/Table"
import Image from "@/common/components/ui/image"
import { Typography } from "@/common/components/ui/Typography"
import { LucidePlus, LucideTable } from "lucide-react"
import { PaymentStatus } from "./SingleView/components/PaymentStatus"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
import useGetBookings from "./hooks/useGetBookings"
import { Spinner } from "@/common/components/ui/Spinner"
import { createColumnHelper } from "@tanstack/react-table"

const Bookings = () => {
  const { data, isPending } = useGetBookings(2)

  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("Listing.imageKey", {
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
            <span>
              <Typography variant="p">
                {listing.row.original.Listing.title}
              </Typography>
            </span>
          </div>
        </Link>
      ),
    }),
    columnHelper.accessor("guestCount", {
      header: "Guest Count",
      cell: (guestCount) => (
        <Typography variant="p">{guestCount.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("fromDate", {
      header: "Date",
      cell: (dateRange) => {
        const fromDate = new Date(dateRange.getValue()).toLocaleDateString(
          "en-US",
          { month: "long", day: "2-digit" }
        )
        const toDate = new Date(
          dateRange.row.original.toDate
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
        return <Typography variant="p">{fromDate + " - " + toDate}</Typography>
      },
    }),
    columnHelper.accessor("Listing.address", {
      header: "Location",
      cell: (location) => (
        <Typography variant="p">{location.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("totalFee", {
      header: "Total Cost",
      cell: (totalCost) => (
        <Typography variant="p">{totalCost.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("Transaction.status", {
      header: "Payment Status",
      cell: (paymentStatus) => (
        <Link href="/payment-status">
          <div className="flex items-center">
            <span>
              <PaymentStatus />
            </span>
            <Typography variant="p">{paymentStatus.getValue()}</Typography>
          </div>
        </Link>
      ),
    }),
  ]

  return (
    <WidthWrapper className="mt-40 w-full">
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : data?.items?.length !== 0 ? (
        <div className="px-12">
          <div className="mb-12">
            <Typography
              variant="h1"
              fontWeight="semibold"
              className="flex justify-between items-center pl-4"
            >
              Your bookings
              <div className="flex gap-5">
                <span className="bg-white rounded-full p-2 cursor-pointer shadow-lg">
                  <LucideTable />
                </span>
                <span className="bg-white rounded-full p-2 cursor-pointer shadow-lg">
                  <LucidePlus />
                </span>
              </div>
            </Typography>
          </div>
          <Table data={data?.items as any} columns={columns} />
        </div>
      ) : (
        <div className="px-12">
          <Typography variant="h1" fontWeight="semibold">
            Trips
          </Typography>
          <hr className="mt-5 mb-5"></hr>
          <Typography variant="h1" fontWeight="semibold">
            No trips booked...yet!
          </Typography>
          <Typography
            variant="h4"
            fontWeight="semibold"
            className="text-gray-600"
          >
            Time to dust off your bags and start planning your next adventure
          </Typography>
          <Button variant="outline" size="lg" className="mt-3 font-semibold">
            Start searching
          </Button>
          <hr className="mt-12 mb-5"></hr>
          <Typography
            variant="h4"
            fontWeight="semibold"
            className="text-gray-600"
          >
            Can't find your reservation here?{" "}
            <button className="font-semibold underline text-gray-800">
              Visit the help center
            </button>
          </Typography>
        </div>
      )}
    </WidthWrapper>
  )
}

export default Bookings

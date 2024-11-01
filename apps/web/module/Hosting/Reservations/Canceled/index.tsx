"use client"
import Tabs from "@/common/components/Tabs"
import { Typography } from "@/common/components/ui/Typography"
import TABS from "../constants/tabs"
import Table from "@/common/components/Table"
import { useState } from "react"
import Link from "next/link"
import { createColumnHelper } from "@tanstack/react-table"
import Image from "@/common/components/ui/image"
import { LucideMessageCircleMore } from "lucide-react"
import Filter from "../components/Filter"
import useGetReservations from "../hooks/useGetReservations"
import { format } from "date-fns"

const Canceled = () => {
  const { data } = useGetReservations({ status: "Canceled" })
  const reservations = data?.items || []
  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("property", {
      header: "Listing",
      cell: (context) => {
        const original = context.row.original
        const listingType = original.listingType
        const listing = original[listingType.toLocaleLowerCase()]
        return (
          <Link
            href={`/hosting/reservations/${original._id}`}
            className="flex items-center gap-5"
          >
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              {listing ? (
                <Image
                  src={`/assets/${listing.photos ? listing.photos[0].key : "1.jpg"}`}
                  alt="Image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="h-full w-full bg-primary-100"></div>
              )}
            </div>
            <span>
              <Typography variant="p">
                {listingType !== "Rental"
                  ? listing.name
                  : `${listing.year} ${listing.make} ${listing.modelBadge}`}{" "}
                {listingType === "Property" && listing.type
                  ? `(${listing.type})`
                  : null}
                {listingType === "Rental" && listing.category
                  ? `(${listing.category})`
                  : null}
              </Typography>
            </span>
          </Link>
        )
      },
    }),
    columnHelper.accessor("listingType", {
      header: "Type",
      cell: (context) => {
        const original = context.row.original
        return (
          <Link
            href={`/hosting/reservations/${original._id}`}
            className="flex items-center gap-5"
          >
            <Typography variant="p">
              {context.getValue() ? context.getValue() : ""}
            </Typography>
          </Link>
        )
      },
    }),
    columnHelper.accessor("guest", {
      header: "Guest",
      cell: (context) => {
        const original = context.row.original
        return (
          <Link
            href={`/hosting/reservations/${original._id}`}
            className="flex items-center gap-5"
          >
            <Typography variant="p">
              {context.getValue() && context.getValue().firstName
                ? `${context.getValue().firstName} `
                : ""}
              {context.getValue() && context.getValue().lastName
                ? context.getValue().lastName
                : ""}
            </Typography>
          </Link>
        )
      },
    }),
    columnHelper.accessor("startDate", {
      header: "Date Range",
      cell: (context) => {
        const original = context.row.original
        const startDate = original.startDate
        const endDate = original.endDate
        return (
          <Link
            href={`/hosting/reservations/${original._id}`}
            className="flex items-center gap-5"
          >
            <Typography variant="p">
              {startDate ? format(new Date(startDate), "MMM dd, yyyy") : "---"}{" "}
              - {endDate ? format(new Date(endDate), "MMM dd, yyyy") : "---"}
            </Typography>
          </Link>
        )
      },
    }),
    columnHelper.accessor("", {
      header: "Actions",
      cell: () => (
        <div className="flex gap-4">
          <Link href="/conversation" target="_blank">
            <button className="py-1 text-sm px-3 bg-primary-500 rounded-md text-white hover:bg-primary-600 transition flex gap-1 items-center">
              <LucideMessageCircleMore className="h-3 w-3" /> Message Guest
            </button>
          </Link>
          {/* <button className="py-1 text-sm px-3 bg-error-500 rounded-md text-white hover:bg-error-600 transition flex gap-1 items-center">
           <LucideBan className="h-3 w-3" /> Cancel
          </button>
          <button className="py-1 text-sm px-3 bg-error-500 rounded-md text-white hover:bg-error-600 transition flex gap-1 items-center">
            <LucideMessageCircleQuestion className="h-3 w-3" /> Request for Cancellation
          </button> */}
        </div>
      ),
    }),
  ]

  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 5

  const paginatedData = () => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    return reservations.slice(startIndex, endIndex)
  }

  const gotoPage = (pageIndex: number) => {
    setPageIndex(pageIndex)
  }

  const nextPage = () => {
    if (pageIndex < Math.ceil(reservations.length / pageSize) - 1) {
      setPageIndex(pageIndex + 1)
    }
  }

  const previousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1)
    }
  }
  return (
    <div className="mt-20">
      <div className="mb-4">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center mb-2"
        >
          Reservations
        </Typography>
        <div className="grid grid-cols-6 gap-4 my-6">
          <Filter status="upcoming" />
        </div>
        <Tabs tabs={TABS} includeSearchParams />
      </div>
      <Table
        data={paginatedData() || []}
        columns={columns}
        pageIndex={pageIndex}
        pageCount={Math.ceil(reservations.length / pageSize)}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < Math.ceil(reservations.length / pageSize) - 1}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageSize={pageSize}
      />
    </div>
  )
}

export default Canceled

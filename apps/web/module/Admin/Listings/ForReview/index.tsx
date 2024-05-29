"use client"
import Image from "next/image"
import { Typography } from "@/common/components/ui/Typography"
import { createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"
import Table from "@/common/components/Table"
import { useState } from "react"
import Tabs from "@/common/components/Tabs"
import listingTabs from "../helpers/listingTabs"
import useGetHostProperties from "../hooks/useGetHostProperties"

const HostListing = () => {
  const { data } = useGetHostProperties()
  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("Photos", {
      header: "Listing",
      cell: (context) => {
        return (
          <Link
            href={`/admin/listings/properties${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original.id}/property-type`}
            className="flex items-center gap-5"
          >
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              <Image
                src={`/assets/${context.getValue() ? context.getValue()[0]?.key : "1.jpg"}`}
                alt="Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span>
              <Typography variant="p">{context.row.original.name}</Typography>
            </span>
          </Link>
        )
      },
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (context) => (
        <Link
          href={`/admin/listings/rentals${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original.id}/basic-info`}
          className="flex items-center gap-5"
        >
          <Typography variant="p">
            {context.getValue() ? context.getValue() : ""}
          </Typography>
        </Link>
      ),
    }),
    columnHelper.accessor("Host", {
      header: "Host",
      cell: (context) => (
        <Link
          href={`/admin/listings/properties${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original.id}/property-type`}
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
      ),
    }),
    columnHelper.accessor("type", {
      header: "Action",
      cell: (context) => (
        <div className="flex gap-2">
          <button className="py-1 text-sm px-3 bg-secondary-400 rounded-lg text-text-500 hover:bg-secondary-600 transition">
            Mark as For Review
          </button>
          <button className="py-1 text-sm px-3 bg-error-400 rounded-lg text-white hover:bg-error-600 transition">
            Mark as Declined
          </button>
        </div>
      ),
    }),
  ]

  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 5

  const paginatedData = () => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    return data?.items?.slice(startIndex, endIndex)
  }

  const gotoPage = (pageIndex: number) => {
    setPageIndex(pageIndex)
  }

  const nextPage = () => {
    if (pageIndex < Math.ceil((data?.items?.length || 0) / pageSize) - 1) {
      setPageIndex(pageIndex + 1)
    }
  }

  const previousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1)
    }
  }

  return (
    <div className="mt-20 mb-14">
      <div className="mb-4">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center mb-2"
        >
          Listings
        </Typography>
        <div className="mt-6 mb-2">
          <input
            type="text"
            className="w-1/6 relative rounded-md px-2 py-1 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-1 focus-within:ring-text-600 border-0 text-text-900 placeholder:text-text-400 focus:ring-1 sm:text-sm sm:leading-6 disabled:opacity-50"
            placeholder="Search"
          />
        </div>
        <Tabs tabs={listingTabs} />
      </div>
      <Table
        data={[
          {
            name: "Siargao Land Tour",
            Photos: [
              {
                key: "3.jpg",
              },
            ],
            Host: {
              firstName: "John Patrick",
              lastName: "Madrigal",
            },
            type: "Activity",
          },
        ]}
        columns={columns}
        pageIndex={pageIndex}
        pageCount={Math.ceil(0 / pageSize)}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < Math.ceil(0 / pageSize) - 1}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageSize={pageSize}
      />
    </div>
  )
}

export default HostListing

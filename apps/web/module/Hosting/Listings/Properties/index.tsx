"use client"
import Image from "next/image"
import { Typography } from "@/common/components/ui/Typography"
import { createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"
import Table from "@/common/components/Table"
import { useState } from "react"
import Tabs from "@/common/components/Tabs"
import { StatusDot } from "../../components/StatusDot"
import listingTabs from "../helpers/listingTabs"
import useGetPropertyByHost from "./hooks/useGetPropertyByHost"
import { isArray } from "lodash"
import { T_Photo } from "@repo/contract"

const HostListing = () => {
  const { data } = useGetPropertyByHost()
  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("photos", {
      header: "Listing",
      cell: (context) => {
        const photo =
          context.getValue() && isArray(context.getValue())
            ? context.getValue().find((photo: T_Photo) => photo.isMain)
            : null
        return (
          <Link
            href={`/hosting/listings/properties${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original._id}/property-type`}
            className="flex items-center gap-5"
          >
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              {photo ? (
                <Image
                  src={`/assets/${photo.key}`}
                  alt="Image"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="h-full w-full bg-primary-100"></div>
              )}
            </div>
            <span>
              <Typography variant="p">
                {context.row.original.year} {context.row.original.title}{" "}
              </Typography>
            </span>
          </Link>
        )
      },
    }),
    columnHelper.accessor("location", {
      header: "Location",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original._id}/property-type`}
          className="flex items-center gap-5"
        >
          <Typography variant="p">
            {context.getValue() && context.getValue().street
              ? `${context.getValue().street}, `
              : ""}
            {context.getValue() && context.getValue().city
              ? context.getValue().city
              : ""}
          </Typography>
        </Link>
      ),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original._id}/property-type`}
          className="flex items-center gap-4"
        >
          <Typography variant="p">
            {context.getValue() ? context.getValue() : ""}
          </Typography>
        </Link>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties${context.row.original.status === "Incomplete" ? "/setup" : ""}/${context.row.original._id}/property-type`}
          className="flex items-center"
        >
          <StatusDot
            variant={
              (context.getValue()
                ? context.getValue().toLocaleLowerCase()
                : "incomplete") as any
            }
          />
          <Typography variant="p">
            {context.getValue() ? context.getValue() : "Incomplete"}
          </Typography>
        </Link>
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
          Your listings
        </Typography>
        <Tabs tabs={listingTabs} />
      </div>
      <Table
        data={paginatedData() || []}
        columns={columns}
        pageIndex={pageIndex}
        pageCount={Math.ceil((data?.items?.length || 0) / pageSize)}
        canPreviousPage={pageIndex > 0}
        canNextPage={
          pageIndex < Math.ceil((data?.items?.length || 0) / pageSize) - 1
        }
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageSize={pageSize}
      />
    </div>
  )
}

export default HostListing

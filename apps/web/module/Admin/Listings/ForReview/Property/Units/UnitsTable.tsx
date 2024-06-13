import { createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"
import Image from "next/image"
import Table from "@/common/components/Table"
import { Typography } from "@/common/components/ui/Typography"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import useGetPropertyById from "../../../hooks/useGetPropertyById"
// import useGetPaginatedBookableUnitTypes from "../../../hooks/useGetPaginatedBookableUnitTypes"

const UnitsTable = () => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  // const { data } = useGetPaginatedBookableUnitTypes(listingId)
  const { data } = useGetPropertyById(listingId)
  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("BookableUnitType.Photo", {
      header: "Unit",
      cell: (context) => (
        // /hosting/listings/properties/1/units/beds/1/edit
        <Link
          href={`/hosting/listings/properties/${listingId}/units/${context.row.original.BookableUnitType.category.toLowerCase()}/${context.row.original.BookableUnitType.id}/edit`}
        >
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              {context.getValue()?.key ? (
                <Image
                  src={`/assets/${context.getValue()?.key}`}
                  alt="Image"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="h-full w-full bg-primary-100"></div>
              )}
            </div>
          </div>
        </Link>
      ),
    }),
    columnHelper.accessor("BookableUnitType.name", {
      header: "Name",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties/${listingId}/units/${context.row.original.BookableUnitType.category.toLowerCase()}/${context.row.original.BookableUnitType.id}/edit`}
        >
          <Typography variant="p">{context.getValue()}</Typography>
        </Link>
      ),
    }),
    columnHelper.accessor("BookableUnitType.description", {
      header: "Description",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties/${listingId}/units/${context.row.original.BookableUnitType.category.toLowerCase()}/${context.row.original.BookableUnitType.id}/edit`}
        >
          <Typography variant="p">{context.getValue()}</Typography>
        </Link>
      ),
    }),
    columnHelper.accessor("BookableUnitType.category", {
      header: "Type",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties/${listingId}/units/${context.row.original.BookableUnitType.category.toLowerCase()}/${context.row.original.BookableUnitType.id}/edit`}
        >
          <Typography variant="p">{context.getValue()}</Typography>
        </Link>
      ),
    }),
    columnHelper.accessor("BookableUnitType.qty", {
      header: "Quantity",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties/${listingId}/units/${context.row.original.BookableUnitType.category.toLowerCase()}/${context.row.original.BookableUnitType.id}/edit`}
        >
          <Typography variant="p">{context.getValue()}</Typography>
        </Link>
      ),
    }),
  ]

  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 5

  const paginatedData = useMemo(() => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    return data?.item?.BookableUnit?.slice(startIndex, endIndex)
  }, [pageIndex, data])

  const gotoPage = (pageIndex: number) => {
    setPageIndex(pageIndex)
  }

  const nextPage = () => {
    if (
      pageIndex <
      Math.ceil(data?.item?.BookableUnit?.length / pageSize) - 1
    ) {
      setPageIndex(pageIndex + 1)
    }
  }

  const previousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1)
    }
  }

  return (
    <div className="mt-5">
      <Table
        data={paginatedData || []}
        columns={columns}
        pageIndex={pageIndex}
        pageCount={Math.ceil(data?.item?.BookableUnit?.length / pageSize)}
        canPreviousPage={pageIndex > 0}
        canNextPage={
          pageIndex < Math.ceil(data?.item?.BookableUnit?.length / pageSize) - 1
        }
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageSize={pageSize}
      />
    </div>
  )
}

export default UnitsTable

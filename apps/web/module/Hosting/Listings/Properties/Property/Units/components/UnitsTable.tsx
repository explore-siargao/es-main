import { createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"
import Image from "@/common/components/ui/image"
import Table from "@/common/components/Table"
import { Typography } from "@/common/components/ui/Typography"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import useGetPropertyById from "../../../hooks/useGetPropertyById"
import { Spinner } from "@/common/components/ui/Spinner"
import { T_Photo } from "@repo/contract"
import { isArray } from "lodash"
import { capitalizeFirstLetter } from "@/common/helpers/capitalizeFirstLetter"
import { E_Property_Category } from "../constants"
const numWords = require("num-words")

interface UnitsTableProps {
  category?: string
  pageType?: "setup" | "edit"
}

const UnitsTable: React.FC<UnitsTableProps> = ({
  category,
  pageType = "edit",
}) => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isPending } = useGetPropertyById(listingId)
  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("photos", {
      header: "Units",
      cell: (context) => {
        const photo =
          context.getValue() && isArray(context.getValue())
            ? context.getValue().find((photo: T_Photo) => photo.isMain)
            : null
        return (
          <Link
            href={`/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/${context.row.original.category.toLowerCase() + "s"}/${context.row.original?._id}/edit`}
            className="flex items-center gap-5"
          >
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              {photo ? (
                <Image
                  src={`/assets/${photo.key}`}
                  alt="Image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="h-full w-full bg-primary-100"></div>
              )}
            </div>
          </Link>
        )
      },
    }),
    columnHelper.accessor("title", {
      header: "Name",
      cell: (context) => {
        const category = context.row.original.category
        const numBedrooms = context.row.original.qty
        const title = context.row.original.title || ""
        const subtitle = context.row.original.subtitle || ""
        const value = context.getValue() || ""
        const cleanValue = value.startsWith("Custom: ")
          ? value.slice("Custom: ".length)
          : value

        const displayTitle = title || subtitle || cleanValue

        return (
          <Link
            href={`/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/${category.toLowerCase() + "s"}/${context.row.original?._id}/edit`}
          >
            <Typography variant="p">
              {category === E_Property_Category.WholePlace && displayTitle}

              {category === E_Property_Category.Bed &&
                `${capitalizeFirstLetter(numWords(numBedrooms))}-bedroom ${displayTitle}`}

              {category === E_Property_Category.Room && displayTitle}
            </Typography>
          </Link>
        )
      },
    }),

    columnHelper.accessor("category", {
      header: "Type",
      size: 400,
      cell: (context) => {
        const type = context.getValue()
        const displayType = type === "Whole-Place" ? "Whole Place" : type

        return (
          <Link
            href={`/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/${(context.getValue() || "").toLowerCase() + "s"}/${context.row.original?._id}/edit`}
            className="flex items-center gap-4"
          >
            <Typography variant="p">{displayType || ""}</Typography>
          </Link>
        )
      },
    }),
    columnHelper.accessor("qty", {
      header: "Quantity",
      cell: (context) => (
        <Link
          href={`/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/${context.row.original?.category.toLowerCase() + "s"}/${context.row.original?._id}/edit`}
        >
          <Typography variant="p">
            {context.getValue() ? context.getValue() : 0}
          </Typography>
        </Link>
      ),
    }),
  ]

  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 5

  const paginatedData = useMemo(() => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    return data?.item?.bookableUnits?.slice(startIndex, endIndex)
  }, [pageIndex, data])

  const gotoPage = (pageIndex: number) => {
    setPageIndex(pageIndex)
  }

  const nextPage = () => {
    if (
      pageIndex <
      Math.ceil(data?.item?.bookableUnits?.length / pageSize) - 1
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
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <div className="mt-5">
          <Table
            data={paginatedData || []}
            columns={columns}
            pageIndex={pageIndex}
            pageCount={Math.ceil(data?.item?.bookableUnits?.length / pageSize)}
            canPreviousPage={pageIndex > 0}
            canNextPage={
              pageIndex <
              Math.ceil(data?.item?.bookableUnits?.length / pageSize) - 1
            }
            gotoPage={gotoPage}
            previousPage={previousPage}
            nextPage={nextPage}
            pageSize={pageSize}
          />
        </div>
      )}
    </>
  )
}

export default UnitsTable

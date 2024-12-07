"use client"
import React, { useEffect, useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useRouter, useSearchParams } from "next/navigation"
import Map from "./map"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetRentalListings from "./hooks/use-get-listings"
import { E_Rental_Category } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"
import RentalCard from "./card"
import getNumberOrAny from "@/common/helpers/getNumberOrAny"
import { E_Location } from "@repo/contract-2/search-filters"
import Pagination from "../components/pagination"

const RentalsFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [page, setPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  )

  const location = searchParams.get("location") || "any"
  const vehicleTypes = searchParams.get("vehicleTypes") || "any"
  const transmissionTypes = searchParams.get("transmissionTypes") || "any"
  const seatCount = getNumberOrAny(searchParams.get("seatCount"))
  const priceFrom = getNumberOrAny(searchParams.get("priceFrom"))
  const priceTo = getNumberOrAny(searchParams.get("priceTo"))
  const starRating = getNumberOrAny(searchParams.get("starRating"))
  const pickUpDate = searchParams.get("pickUpDate") || "any"
  const dropOffDate = searchParams.get("dropOffDate") || "any"

  const {
    data: rentalUnits,
    isLoading,
    isRefetching,
    refetch: refetchRentalUnits,
  } = useGetRentalListings({
    page,
    location: location as E_Location,
    vehicleTypes,
    transmissionTypes,
    seatCount,
    priceFrom,
    priceTo,
    starRating,
    pickUpDate,
    dropOffDate,
  })

  useEffect(() => {
    refetchRentalUnits()
  }, [
    page,
    location,
    vehicleTypes,
    transmissionTypes,
    seatCount,
    priceFrom,
    priceTo,
    starRating,
    pickUpDate,
    dropOffDate,
  ])

  const allItemCount = rentalUnits?.allItemCount || 0

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`?${params.toString()}`)
  }

  const totalPages = Math.max(1, Math.ceil(allItemCount / 15))

  if (isLoading) {
    return (
      <WidthWrapper width="medium">
        <div className="h-screen mt-16 flex justify-center">
          <Spinner variant="primary" />
        </div>
      </WidthWrapper>
    )
  }

  const rentals = rentalUnits?.items

  return (
    <WidthWrapper width="medium">
      <div className="flex gap-7">
        {/* Listings section */}
        <div className="flex w-full mt-14">
          <div>
            {isRefetching ? <Spinner variant="primary" /> : null}
            {!isLoading && !isRefetching && rentals && rentals?.length > 0 ? (
              <>
                <Typography className="mb-4">
                  {" "}
                  {allItemCount} rental{allItemCount > 1 ? "s" : ""} found
                </Typography>
                <div className="grid grid-cols-3 gap-6">
                  {rentals?.map((item) => (
                    <div key={item._id}>
                      <RentalCard {...item} />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {!isLoading && !isRefetching && rentals && rentals?.length === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                No rentals found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative mt-5">
          <div className="sticky top-[17.3rem]">
            {rentals ? (
              <Map rentals={rentals} location={location as E_Location} />
            ) : null}
          </div>
        </div>
      </div>
      <Pagination
        pageIndex={page - 1}
        pageCount={totalPages}
        canPreviousPage={page > 1}
        canNextPage={page < totalPages}
        gotoPage={(newPage) => handlePageChange(newPage + 1)}
        previousPage={() => handlePageChange(page - 1)}
        nextPage={() => handlePageChange(page + 1)}
      />
    </WidthWrapper>
  )
}

export default RentalsFilter

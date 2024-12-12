"use client"
import React, { useEffect, useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams, useRouter } from "next/navigation"
import Map from "./map"
import useGetListings from "./hooks/use-get-listings"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Spinner } from "@/common/components/ui/Spinner"
import PropertyCard from "./card"
import { E_Location } from "@repo/contract-2/search-filters"
import getNumberOrAny from "@/common/helpers/getNumberOrAny"
import Pagination from "../components/pagination"

const PropertiesFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [page, setPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  )

  const location = searchParams.get("location") || "any"
  const propertyTypes = searchParams.get("propertyTypes") || "any"
  const priceFrom = getNumberOrAny(searchParams.get("priceFrom"))
  const priceTo = getNumberOrAny(searchParams.get("priceTo"))
  const bedroomCount = getNumberOrAny(searchParams.get("bedroomCount"))
  const bedCount = getNumberOrAny(searchParams.get("bedCount"))
  const bathroomCount = getNumberOrAny(searchParams.get("bathroomCount"))
  const facilities = searchParams.get("facilities") || "any"
  const amenities = searchParams.get("amenities") || "any"
  const starRating = getNumberOrAny(searchParams.get("starRating"))
  const checkIn = searchParams.get("checkIn") || "any"
  const checkOut = searchParams.get("checkOut") || "any"
  const numberOfGuest = getNumberOrAny(searchParams.get("numberOfGuest"))

  const {
    data: propertyUnits,
    isLoading,
    isRefetching,
    refetch: refetchPropertyUnits,
  } = useGetListings({
    page,
    location: location as E_Location,
    propertyTypes,
    priceFrom,
    priceTo,
    bedroomCount,
    bedCount,
    bathroomCount,
    facilities,
    amenities,
    starRating,
    checkIn,
    checkOut,
    numberOfGuest,
  })

  useEffect(() => {
    refetchPropertyUnits()
  }, [
    page,
    location,
    propertyTypes,
    facilities,
    amenities,
    priceFrom,
    priceTo,
    bedCount,
    bathroomCount,
    bedroomCount,
    starRating,
    checkIn,
    checkOut,
    numberOfGuest,
  ])

  const allItemCount = propertyUnits?.allItemCount || 0

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

  const properties = propertyUnits?.items

  return (
    <WidthWrapper width="medium">
      <div className="flex gap-7">
        {/* Listings section */}
        <div className="flex w-full mt-14">
          <div>
            {isRefetching ? <Spinner variant="primary" /> : null}

            {!isLoading &&
            !isRefetching &&
            propertyUnits &&
            (propertyUnits?.pageItemCount || 0) > 0 ? (
              <>
                <Typography className="mb-4">
                  {" "}
                  {allItemCount} place{allItemCount > 1 ? "s" : ""} found
                </Typography>
                <div className="grid grid-cols-3 gap-6">
                  {properties?.map((item) => (
                    <div key={item.listingId}>
                      <PropertyCard {...item} />
                    </div>
                  ))}
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
              </>
            ) : null}

            {!isLoading &&
            !isRefetching &&
            propertyUnits &&
            propertyUnits?.pageItemCount === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                No properties found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative mt-5">
          <div className="sticky top-[17.3rem]">
            {properties ? (
              <Map units={properties} location={location as E_Location} />
            ) : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default PropertiesFilter

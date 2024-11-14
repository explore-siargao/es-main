"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import Map from "./map"
import useGetListings from "./hooks/use-get-listings"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Spinner } from "@/common/components/ui/Spinner"
import PropertyCard from "./card"
import { E_Location } from "@repo/contract-2/search-filters"
import getNumberOrAny from "@/common/helpers/getNumberOrAny"

type T_Photo = {
  key: string
}

type T_Bookable_Unit_Type = {
  _id: string
  photos: T_Photo[]
  unitPrice: { baseRate: number }
  average: number
  reviewsCount: number
}

const PropertiesFilter = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0
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

  const units = (propertyUnits?.items as any)?.flatMap(
    (
      item: any // TODO: fix types
    ) =>
      item.bookableUnits.map((unit: T_Bookable_Unit_Type) => ({
        listingId: unit._id,
        photos: unit.photos.map((photo) => ({
          key: photo.key,
        })),
        title: item.title,
        subtitle: item.subtitle,
        type: item.type,
        wholePlaceType: item.wholePlaceType,
        price: unit.unitPrice.baseRate,
        average: unit.average,
        reviewsCount: unit.reviewsCount,
        location: item.location,
      }))
  )

  if (isLoading) {
    return (
      <WidthWrapper width="medium">
        <div className="h-screen mt-16 flex justify-center">
          <Spinner variant="primary" />
        </div>
      </WidthWrapper>
    )
  }

  return (
    <WidthWrapper width="medium">
      <div className="flex gap-7 mt-16">
        {/* Listings section */}
        <div className="flex w-full">
          <div>
            {isRefetching ? <Spinner variant="primary" /> : null}

            {!isLoading && !isRefetching && units && units?.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {units?.map(
                  (
                    item: any // TODO: fix types
                  ) => (
                    <div key={item._id}>
                      <PropertyCard {...item} />
                    </div>
                  )
                )}
              </div>
            ) : null}

            {!isLoading && !isRefetching && units && units?.length === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                No properties found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative">
          <div className="sticky top-[20rem]">
            {units ? (
              <Map units={units} location={location as E_Location} />
            ) : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default PropertiesFilter

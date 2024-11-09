"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import Map, { E_Location } from "./map"
import useGetListings from "./hooks/use-get-listings"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Spinner } from "@/common/components/ui/Spinner"
import PropertyCard from "./card"
import { E_Property_Type } from "@repo/contract-2/property"

type T_Photo = {
  key: string;
};

type T_Bookable_Unit_Type = {
  _id: string;
  photos: T_Photo[];
  unitPrice: { baseRate: number };
  average: number;
  reviewsCount: number;
};

const PropertiesFilter = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const type = searchParams.get("propertyType")
  const priceFrom = searchParams.get("priceFrom")
  const priceTo = searchParams.get("priceTo")
  const bedrooms = searchParams.get("bedroomCount")
  const beds = searchParams.get("bedCount")
  const bathrooms = searchParams.get("bathroomCount")
  const facilities = searchParams.get("facilities")
  const amenities = searchParams.get("amenities")
  const starRating = searchParams.get("starRating")

  const { data: propertyUnits, isLoading, isRefetching, refetch: refetchPropertyUnits } = useGetListings(
    location,
    type,
    facilities,
    amenities,
    priceFrom,
    priceTo,
    beds,
    bathrooms,
    bedrooms,
    starRating)

  useEffect(() => {
    refetchPropertyUnits();
  }, [location, type, facilities, amenities, priceFrom, priceTo, beds, bathrooms, bedrooms, starRating]);

  const units = propertyUnits?.items
    ?.flatMap(item =>
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
        location: item.location
      }))
    );

  if(isLoading) {
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
            {isRefetching ? (
              <Spinner variant="primary" />
            ): null}

            {!isLoading && !isRefetching && units && units?.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {units?.map((item) => (
                  <div key={item._id}>
                    <PropertyCard {...item} />
                  </div>
                ))}
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
            {units ? <Map units={units} location={location as E_Location} /> : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default PropertiesFilter

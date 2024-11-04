"use client"
import React, { useEffect } from "react"
import ListingItems from "./components/ListingItems"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import ListingsMap from "./components/map/index"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetActivityListings from "./components/map/hooks/use-get-activity-listings"
import { E_Listing_Category } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"

const ActivitiesFilter = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const type = searchParams.get("experienceType")
  const activityType = searchParams.get("activityType")
  const duration = searchParams.get("duration")
  const priceFrom = searchParams.get("priceFrom")
  const priceTo = searchParams.get("priceTo")
  const stars = searchParams.get("starRating")

  const { data: activityUnits, isLoading, isRefetching, refetch: refetchActivityUnits } = useGetActivityListings(
    location,
    activityType,
    type,
    priceFrom,
    priceTo,
    duration,
    stars)

  useEffect(() => {
    refetchActivityUnits();
  }, [location, type, activityType, priceFrom, priceTo, duration, stars]);


  const bookableUnits = activityUnits?.items?.map(item => ({
    ...item,
    title: item.title,
    location: item.meetingPoint,
    listingId: item._id,
    currency: "PHP",
    price: item.pricePerPerson ?? item.pricePerSlot,
    photos: item.photos.map((photo: { key: string }) => ({
      fileKey: photo.key,
    })),
    ratings: item.average
  }));

  const markers = bookableUnits?.map((rental) => {
    const marker = {
      ...rental.location,
      name: rental.title,
      _id: rental.listingId,
      currency: rental.currency,
      price: rental.price,
      photos: rental.photos[0] as { fileKey: string; alt: string },
    }
    return marker
  })

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

            {!isLoading && !isRefetching && bookableUnits && bookableUnits?.length > 0 ? (

              <div className="grid grid-cols-3 gap-6">
                {bookableUnits?.map((item: any) => (
                  <div key={item._id}>
                    <ListingItems {...item} category={E_Listing_Category.Activity} />
                  </div>
                ))}
              </div>

            ) : null}

            {!isLoading && !isRefetching && bookableUnits && bookableUnits?.length === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                 No activities found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative">
          <div className="sticky top-[20rem]">
            {bookableUnits && markers ? <ListingsMap markers={markers} iconMarker="island" /> : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default ActivitiesFilter

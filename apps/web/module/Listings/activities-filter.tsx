"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import ListingsMap from "./components/map/index"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetActivityListings from "./components/map/hooks/use-get-activity-listings"
import { Spinner } from "@/common/components/ui/Spinner"
import ActivityCard from "./components/activity-card"

const ActivitiesFilter = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const type = searchParams.get("experienceType")
  const activityType = searchParams.get("activityType")
  const duration = searchParams.get("duration")
  const priceFrom = searchParams.get("priceFrom")
  const priceTo = searchParams.get("priceTo")
  const stars = searchParams.get("starRating")

  const {
    data: activityUnits,
    isLoading,
    isRefetching,
    refetch: refetchActivityUnits,
  } = useGetActivityListings(
    location,
    activityType,
    type,
    priceFrom,
    priceTo,
    duration,
    stars
  )

  useEffect(() => {
    refetchActivityUnits()
  }, [location, type, activityType, priceFrom, priceTo, duration, stars])

  const activities = activityUnits?.items?.map((item) => ({
    title: item.title,
    location: item.meetingPoint,
    listingId: item._id,
    price: item.pricePerPerson ?? item.pricePerSlot,
    photos: item.photos.map((photo: { key: string }) => ({
      key: photo.key,
    })),
    average: item.average,
    type: item.activityType[1] ?? "Unknown type",
    reviewsCount: item.reviewsCount,
    city: item.meetingPoint.city,
  }))

  const markers = activities?.map((activity) => {
    const marker = {
      ...activity.location,
      name: activity.title,
      _id: activity.listingId,
      price: activity.price,
      photos: activity.photos[0] as { fileKey: string; alt: string },
    }
    return marker
  })

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

            {!isLoading &&
            !isRefetching &&
            activities &&
            activities?.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {activities?.map((item) => (
                  <div key={item.listingId}>
                    <ActivityCard
                      listingId={item.listingId}
                      title={item.title}
                      type={item.type}
                      photos={item.photos}
                      city={item.city}
                      price={item.price}
                      average={item.average}
                      reviewsCount={item.reviewsCount}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            {!isLoading &&
            !isRefetching &&
            activities &&
            activities?.length === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                No activities found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative">
          <div className="sticky top-[20rem]">
            {activities && markers ? (
              <ListingsMap markers={markers} iconMarker="island" />
            ) : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default ActivitiesFilter

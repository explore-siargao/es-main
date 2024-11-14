"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import Map from "./map"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetActivityListings from "./hooks/use-get-listings"
import { Spinner } from "@/common/components/ui/Spinner"
import Card from "./card"
import getNumberOrAny from "@/common/helpers/getNumberOrAny"
import { E_Location } from "@repo/contract-2/search-filters"

const ActivitiesFilter = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
  const location = searchParams.get("location") || "any";
  const experienceTypes = searchParams.get("experienceTypes") || "any";
  const activityTypes = searchParams.get("activityTypes") || "any";
  const durations = getNumberOrAny(searchParams.get("durations"));
  const priceFrom = getNumberOrAny(searchParams.get("priceFrom"));
  const priceTo = getNumberOrAny(searchParams.get("priceTo"));
  const starRating = getNumberOrAny(searchParams.get("starRating"));
  const activityDate = searchParams.get("activityDate") || "any";
  const numberOfGuest = getNumberOrAny(searchParams.get("numberOfGuest"));

  const {
    data: activityUnits,
    isLoading,
    isRefetching,
    refetch: refetchActivityUnits,
  } = useGetActivityListings({
    page,
    location: location as E_Location,
    activityTypes,
    experienceTypes,
    priceTo,
    priceFrom,
    durations,
    starRating,
    activityDate,
    numberOfGuest
  })

  useEffect(() => {
    refetchActivityUnits()
  }, [page, location, experienceTypes, activityTypes, priceFrom, priceTo, durations, starRating, activityDate, numberOfGuest])

  const activities = (activityUnits?.items as any)?.map((item: any) => ({ // TODO: fix types
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
  }))

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
                {activities?.map((item: any) => ( // TODO: fix types
                  <div key={item.listingId}>
                    <Card {...item} />
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
            {activities ? (
              <Map activities={activities} location={location as E_Location} />
            ) : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default ActivitiesFilter

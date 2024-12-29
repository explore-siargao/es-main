import { Typography } from "@/common/components/ui/Typography"
import {
  E_Location,
  T_Activity_Filtered,
  T_Rental_Filtered,
} from "@repo/contract-2/search-filters"
import React from "react"
import ActivityCard from "./card"
import useGetActivityListings from "@/module/search/activities/hooks/use-get-listings"

function SimilarActivities() {
  const location = "any"
  const experienceTypes = "any"
  const activityTypes = "any"
  const durations = "any"
  const priceFrom = "any"
  const priceTo = "any"
  const starRating = "any"
  const activityDate = "any"
  const numberOfGuest = "any"
  const { data: activityUnits } = useGetActivityListings({
    page: 1,
    location: location as E_Location,
    activityTypes,
    experienceTypes,
    priceTo,
    priceFrom,
    durations,
    starRating,
    activityDate,
    numberOfGuest,
  })
  const activitiesData = activityUnits?.items || []
  const getRandomItems = (array: T_Activity_Filtered[], count: number) => {
    if (count > array.length) {
      return []
    }
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
  const randomItems = getRandomItems(activitiesData, 4)
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold" className="mb-2">
        Similar activities
      </Typography>
      <div className="grid grid-cols-4 space-x-8 mt-5">
        {randomItems.map((card) => (
          <ActivityCard {...card} />
        ))}
      </div>
    </div>
  )
}

export default SimilarActivities

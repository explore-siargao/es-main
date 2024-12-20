"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { ratingSummary, userReviews } from "@/module/Listing/property/dummy"
import RatingSummary from "@/module/Listing/reviews/rating-summary"
import UserReviews from "./UserReviews"

const ListingReviews = () => {
  return (
    <div className="mt-20 mb-14">
      <Typography variant="h1" fontWeight="semibold">
        Reviews
      </Typography>
      <div className="divide-y">
        <div className="py-8">
          <RatingSummary
            ratings={ratingSummary.ratings}
            reviews={ratingSummary.reviews}
            categories={ratingSummary.categories}
          />
        </div>
        <div className="py-8">
          <UserReviews reviews={userReviews} />
        </div>
      </div>
    </div>
  )
}

export default ListingReviews

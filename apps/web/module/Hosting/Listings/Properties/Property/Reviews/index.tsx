"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { ratingSummary, userReviews } from "@/module/Accommodation"
import RatingSummary from "@/module/Accommodation/components/Reviews/RatingSummary"
import UserReviews from "./UserReviews"

type T_ListingReviewsProps = {
  letterCase?: string
  fontWeight?: "extralight" | "light" | "normal" | "thin" | "semibold" | "bold"
}

const ListingReviews = ({ letterCase, fontWeight }: T_ListingReviewsProps) => {
  return (
    <div className="mt-20 mb-14">
      <Typography
        variant="h1"
        fontWeight={fontWeight ? fontWeight : "semibold"}
        className={letterCase}
      >
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

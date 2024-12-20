import Review from "@/module/Listing/reviews/review"
import { T_UserReviewsProps } from "@/module/Listing/property/types/UserReviews"
import React, { useState } from "react"

const UserReviews = ({ reviews }: T_UserReviewsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16">
        {reviews.map((review) => (
          <Review
            key={review.date}
            avatarKey={review.imageSrc}
            name={review.name}
            origin={review.origin}
            rate={review.rate}
            date={review.date}
            review={review.review}
            showMore={review.showMore}
          />
        ))}
      </div>
    </>
  )
}

export default UserReviews

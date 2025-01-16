import React, { useState } from "react"
import UserReview from "./review"
import { Button } from "@/common/components/ui/Button"
import UserReviewModal from "../modals/user-review-modal"
import { T_Reviews, T_Review } from "@repo/contract-2/review"

type T_Props = {
  reviews: T_Reviews
}
const UserReviews = ({ reviews }: T_Props) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)

  console.log(reviews, "reviews")
  const openShowMoreModal = () => {
    setShowMoreModalOpen(true)
  }
  const closeShowMoreModal = () => {
    setShowMoreModalOpen(false)
  }
  const countWords = (str: string) => {
    return str.trim().split(/\s+/).length
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16">
        {reviews.map((review: T_Review) => (
          <UserReview
            key={review?._id}
            avatarKey={""}
            name={`${review.reviewer.guest.firstName} ${review.reviewer.guest.middleName || ""} ${review.reviewer.guest.lastName}`}
            origin={
              +" " +
              review?.reviewer?.guest?.address?.stateProvince +
              ", " +
              review?.reviewer?.guest?.address?.country
            }
            rate={review.totalRates}
            date={review?.createdAt as string}
            review={review?.comment}
            showMore={countWords(review.comment) > 300}
          />
        ))}
      </div>
      <Button variant="outline" className="mt-8" onClick={openShowMoreModal}>
        Show All Reviews
      </Button>
      <UserReviewModal
        isOpen={showMoreModalOpen}
        onClose={() => closeShowMoreModal()}
      />
    </>
  )
}

export default UserReviews

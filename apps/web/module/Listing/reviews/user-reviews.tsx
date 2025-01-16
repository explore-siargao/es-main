import React, { useState } from "react"
import UserReview from "./review"
import { Button } from "@/common/components/ui/Button"
import UserReviewModal from "../modals/user-review-modal"
import { T_Reviews } from "@repo/contract-2/review"

const UserReviews = (reviews: T_Reviews) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)

  console.log(reviews, "reviews")
  const openShowMoreModal = () => {
    setShowMoreModalOpen(true)
  }
  const closeShowMoreModal = () => {
    setShowMoreModalOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16">
        {reviews.map((review) => (
          <UserReview
            key={review?.id}
            avatarKey={review?.imageSrc}
            name={
              review?.reviewer?.guest?.firstName +
              " " +
              review?.reviewer?.guest?.middleName +
              " " +
              review?.reviewer?.guest?.lastName
            }
            origin={
              review?.reviewer?.guest?.address?.city +
              " " +
              review?.reviewer?.guest?.address?.stateProvince +
              ", " +
              review?.reviewer?.guest?.address?.country
            }
            rate={review?.valueRates}
            date={review?.createdAt}
            review={review?.comment}
            showMore={review.showMore}
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

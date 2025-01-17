import React, { useState } from "react"
import UserReview from "./review"
import { Button } from "@/common/components/ui/Button"
import UserReviewModal from "../modals/user-review-modal"
import { T_Reviews, T_Review } from "@repo/contract-2/review"
import { userReviews } from "../dummy"
import { T_Categories } from "../Property/types/RatingSummary"

type T_Props = {
  reviews: T_Reviews
  categories?: T_Categories[]
}
const UserReviews = ({ reviews, categories }: T_Props) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)

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
        {reviews?.map((review: T_Review, index) => (
          <UserReview
            key={review?._id}
            avatarKey={userReviews[index]?.imageSrc || ""}
            name={`${review.reviewer.guest.firstName} ${review.reviewer.guest.middleName || ""} ${review.reviewer.guest.lastName}`}
            origin={`${review?.reviewer?.guest?.address?.city} ${review?.reviewer?.guest?.address?.stateProvince}, 
              ${review?.reviewer?.guest?.address?.country}`}
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
        reviews={reviews}
        categories={categories}
      />
    </>
  )
}

export default UserReviews

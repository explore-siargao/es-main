import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import UserReviewModal from "../modals/user-review-modal"
import AvatarTitleDescription from "../avatar-title-description"
import StarRating from "./star-rating"

interface UserReviewProps {
  avatarKey: string
  name: string
  origin: any
  rate: number
  date: string
  review: string
  showMore: boolean
}

const Review = ({
  avatarKey,
  name,
  origin,
  rate,
  date,
  review,
  showMore,
}: UserReviewProps) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)

  const openShowMoreModal = () => {
    setShowMoreModalOpen(true)
  }

  const closeShowMoreModal = () => {
    setShowMoreModalOpen(false)
  }

  return (
    <div>
      <div className="flex items-center">
        <AvatarTitleDescription
          avatarKey={avatarKey}
          title={name}
          subTitle={origin}
        />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="flex">
          <StarRating value={rate} />
        </div>
        <span>&middot;</span>
        <Typography variant="h5" fontWeight="semibold">
          {date}
        </Typography>
      </div>
      <Typography className="mt-2 w-full">{review}</Typography>
      {showMore ? (
        <Button
          className="underline mt-2"
          variant="link"
          size="link"
          onClick={openShowMoreModal}
        >
          Show more &gt;
        </Button>
      ) : (
        ""
      )}
      <UserReviewModal
        isOpen={showMoreModalOpen}
        onClose={() => closeShowMoreModal()}
      />
    </div>
  )
}

export default Review

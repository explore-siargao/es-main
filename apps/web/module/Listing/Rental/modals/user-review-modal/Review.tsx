import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import UserReviewModal from "../user-review-modal"
import AvatarTitleDescription from "../../host-information/avatar-title-description"
import { LucideStar } from "lucide-react"

interface UserReviewProps {
  avatarKey: string
  name: string
  origin: string
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
  const displayStars = () => {
    const stars = []
    for (let i = 0; i < rate; i++) {
      stars.push(<LucideStar key={i} className="h-3 w-3" />)
    }

    return stars
  }

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
        <div className="flex">{displayStars()}</div>
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

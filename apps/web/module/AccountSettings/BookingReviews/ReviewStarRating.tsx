import { LucideStar } from "lucide-react"
import React from "react"

export interface ReviewStartRatingProps {
  totalStars: number
  rating: number
  size?: "sm" | "md" | "lg"
}

const ReviewStarRating = ({
  totalStars,
  rating,
  size = "md",
}: ReviewStartRatingProps) => {
  const getStarWidth = () => {
    switch (size) {
      case "sm":
        return 24
      case "md":
        return 34
      case "lg":
        return 44
      default:
        return 34 // Medium as default
    }
  }

  const renderStar = (index: number) => {
    console.log(rating % 1)
    if (index < Math.floor(rating)) {
      return <LucideStar width={getStarWidth()} className="text-secondary-500" />
    } else if (index < rating && rating % 1 !== 0) {
      return (
        <div
          className="relative"
          style={{
            width: `${getStarWidth()}px`,
            height: `${getStarWidth()}px`,
          }}
        >
          <div className="relative">
            <LucideStar
              width={getStarWidth()}
              className="absolute top-0 left-0 text-gray-400"
            />
            <LucideStar
              width={getStarWidth()}
              className="absolute top-0 left-0 text-secondary-500"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        </div>
      )
    } else {
      return <LucideStar width={getStarWidth()} className="text-gray-400" />
    }
  }

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <span key={`star-${_}`} className="cursor-pointer">
          {renderStar(index)}
        </span>
      ))}
    </div>
  )
}

export default ReviewStarRating

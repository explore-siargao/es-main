"use client"
import { LucideStar } from "lucide-react"
import React, { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"

export interface StarRatingProps {
  totalStars: number
  className?: string
  size?: "sm" | "md" | "lg"
  name?: string
  onChange?: () => void
}

const StarRating = forwardRef<HTMLDivElement, StarRatingProps>(
  ({ totalStars, className, name, onChange, size = "md" }, ref) => {
    const { setValue, watch } = useFormContext()
    const [hoverRating, setHoverRating] = useState(0)
    const rating = watch(name ?? "")

    const handleStarClick = (index: number) => {
      const newRating = index + 1
      setValue(name ?? "", newRating)
      if (onChange) {
        onChange()
      }
    }

    const handleStarHover = (index: number) => {
      setHoverRating(index + 1)
    }

    const handleMouseLeave = () => {
      setHoverRating(0)
    }

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

    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => (
          <button
            type="button"
            key={`star-${_}`}
            className={`cursor-pointer ${
              index < hoverRating || index < rating
                ? "text-secondary-500"
                : "text-gray-400"
            }`}
            onClick={() => handleStarClick(index)}
            onKeyUp={() => {}}
            onFocus={() => {}}
            onMouseOver={() => {}}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleMouseLeave}
          >
            <LucideStar width={getStarWidth()} />
          </button>
        ))}
      </div>
    )
  }
)

StarRating.displayName = "StarRating"

export default StarRating

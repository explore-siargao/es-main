import { Typography } from "@/common/components/ui/Typography"
import { T_Reviews } from "@repo/contract-2/review"
import React from "react"

type RatingCount = 1 | 2 | 3 | 4 | 5
const OverallRating = ({ reviews }: { reviews: T_Reviews }) => {
  function customRound(value: number): RatingCount {
    const numValue = Number(value)
    const floor = Math.floor(numValue)
    const decimal = numValue - floor

    if (decimal >= 0.5) {
      return Math.min(Math.ceil(numValue), 5) as RatingCount
    }
    return Math.max(Math.min(floor, 5), 1) as RatingCount
  }

  const ratingCounts: Record<RatingCount, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  reviews.forEach((review) => {
    const rating = customRound(review.totalRates)
    console.log("Original rate:", review.totalRates, "Rounded to:", rating)
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating]++
    }
  })

  const maxCount = Math.max(...Object.values(ratingCounts))

  return (
    <div className="w-full">
      <Typography variant="h5" fontWeight="semibold" className="mb-2">
        Overall rating
      </Typography>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <span className="w-3 text-sm">{rating}</span>
            <div className="relative h-2 flex-1 bg-gray-300 rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-gray-900 rounded-full"
                style={{
                  width: `${maxCount ? (ratingCounts[rating as keyof typeof ratingCounts] / maxCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverallRating

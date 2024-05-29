import React from "react"

interface RatingCategoryCardProps {
  description?: string
}

const RatingCategoryCard = ({ description }: RatingCategoryCardProps) => {
  return (
    <div className="flex text-center w-full h-24 justify-center items-center p-4 rounded-lg bg-transparent">
      <div className="">{description}</div>
    </div>
  )
}

export default RatingCategoryCard

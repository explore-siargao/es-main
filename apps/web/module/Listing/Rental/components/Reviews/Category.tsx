import { Typography } from "@/common/components/ui/Typography"
import React from "react"

interface CategoryProps {
  title: string
  rating: string
  isHorizontal: boolean
  icon: React.ReactNode
}

const Category = ({
  title,
  rating,
  isHorizontal,
  icon: Icon,
}: CategoryProps) => {
  if (isHorizontal) {
    return (
      <div>
        <div className="flex justify-between items-center w-full py-4">
          <div className="flex space-x-3 items-center">
            {Icon}
            <Typography variant="h5" fontWeight="semibold">
              {title}
            </Typography>
          </div>
          <Typography variant="h5" fontWeight="semibold">
            {rating}
          </Typography>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col lg:px-4 py-4">
        <Typography variant="h5" fontWeight="semibold">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="semibold" className="mb-5">
          {rating}
        </Typography>
        {Icon}
      </div>
    )
  }
}

export default Category

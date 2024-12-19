import { Typography } from "@/common/components/ui/Typography"
import React from "react"

const OverallRating = () => {
  return (
    <div className="w-100">
      <Typography variant="h5" fontWeight="semibold" className="mb-2">
        Overall rating
      </Typography>
      <div className="grid grid-cols-11 items-center">
        <div className="col-span-1 text-sm font-semibold">5</div>
        <div className="col-span-10 relative flex items-center">
          <div className="h-1.5 w-full bg-gray-200 rounded-full absolute"></div>
          <div className="h-1.5 w-7/12 bg-gray-900 rounded-l-full absolute"></div>
        </div>
        <div className="col-span-1 text-sm font-semibold">4</div>
        <div className="col-span-10 relative flex items-center">
          <div className="h-1.5 w-full bg-gray-200 rounded-full absolute"></div>
          <div className="h-1.5 w-5/12 bg-gray-900 rounded-l-full absolute"></div>
        </div>
        <div className="col-span-1 text-sm font-semibold">3</div>
        <div className="col-span-10 relative flex items-center">
          <div className="h-1.5 w-full bg-gray-200 rounded-full absolute"></div>
          <div className="h-1.5 w-0 bg-gray-900 rounded-l-full absolute"></div>
        </div>
        <div className="col-span-1 text-sm font-semibold">2</div>
        <div className="col-span-10 relative flex items-center">
          <div className="h-1.5 w-full bg-gray-200 rounded-full absolute"></div>
          <div className="h-1.5 w-0 bg-gray-900 rounded-l-full absolute"></div>
        </div>
        <div className="col-span-1 text-sm font-semibold">1</div>
        <div className="col-span-10 relative flex items-center">
          <div className="h-1.5 w-full bg-gray-200 rounded-full absolute"></div>
          <div className="h-1.5 w-0 bg-gray-900 rounded-l-full absolute"></div>
        </div>
      </div>
    </div>
  )
}

export default OverallRating

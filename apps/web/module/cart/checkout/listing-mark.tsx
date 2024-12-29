import React from "react"
import { Typography } from "@/common/components/ui/Typography"

interface ListingMarkProps {
  icon: React.ReactNode
  title: string
  desc?: string
}

const ListingMark: React.FC<ListingMarkProps> = ({
  icon: iconSymbol,
  title,
  desc,
}) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 mb-2 flex gap-4">
      <div className="mt-1">{iconSymbol}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <Typography variant="h5" className="text-justify">
          {desc}
        </Typography>
      </div>
    </div>
  )
}

export default ListingMark

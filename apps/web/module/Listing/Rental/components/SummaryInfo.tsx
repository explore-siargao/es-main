import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Star } from "lucide-react"
import { T_SummaryInfoProps } from "../types/SummaryInfo"

const SummaryInfo = ({
  address,
  guest,
  bedroom,
  beds,
  baths,
  reviews,
  stars,
}: T_SummaryInfoProps) => {
  return (
    <>
      <Typography variant="h3" fontWeight="semibold">
        {address}
      </Typography>
      <div className="flex gap-1 md:flex-1 mt-1">
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <Typography className="text-sm md:flex">{guest} Guests</Typography>
        </button>{" "}
        <Typography className="text-sm md:flex">&middot;</Typography>
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <Typography className="text-sm md:flex">
            {bedroom} Bedrooms
          </Typography>
        </button>{" "}
        <Typography className="text-sm md:flex">&middot;</Typography>
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <Typography className="text-sm md:flex">{beds} Beds</Typography>
        </button>{" "}
        <Typography className="text-sm md:flex">&middot;</Typography>
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <Typography className="text-sm md:flex">{baths} Bathrooms</Typography>
        </button>{" "}
      </div>
      <div className="flex gap-1 mt-1">
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <div className="flex gap-2 md:flex items-center">
            <Star className="h-4 w-4 fill-black" />
            <Typography>{stars}</Typography>
          </div>
        </button>{" "}
        <Typography>&middot;</Typography>
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <Typography>{reviews} Reviews</Typography>
        </button>{" "}
      </div>
    </>
  )
}

export default SummaryInfo

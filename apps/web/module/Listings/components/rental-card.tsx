import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import CustomSquareSlider from "@/common/components/custom-square-slider"
import { LucideHeart, LucideStar } from "lucide-react"
import formatCurrency from "@/common/helpers/formatCurrency"
import { E_Property_Type } from "@repo/contract-2/property"
import propertyTypeMap from "@/common/helpers/propertyTypeMap"

type Props = {
  listingId: string,
  title: string,
  photos: {
    key: string
    alt: string
  }[],
  city: string
  price: number,
  average: number,
  reviewsCount: number,
  category: string,
  transmission: string,
  fuel: string
}

const RentalCard = ({
  listingId,
  title,
  photos,
  city,
  price,
  average,
  reviewsCount,
  category,
  transmission,
  fuel
}: Props) => {
  return (
    <>
      <li className="relative rounded-xl overflow-hidden h-full list-none">
        <Link href={`/listing/activities/${listingId}`} target="_blank">
          <div className="h-auto w-full relative">
            <button
              onClick={(e) => console.log('clicked heart')}
              className="absolute top-3 right-3 z-40"
            >
              <LucideHeart
                className={`h-7 w-7 text-text-50 active:scale-90 ${
                  false ? "fill-error-500" : "fill-text-500/50"
                }`}
              />
            </button>
            <CustomSquareSlider images={photos} />
          </div>
          <div className="pt-4">
            <div className="flex justify-between">
              <Typography
                variant="h3"
                fontWeight="semibold"
                className="text-text-500 truncate"
              >
                {title ?? "Unknown title"}
              </Typography>
              <div className="flex text-text-500 items-center gap-1">
                {average > 1 ? (
                  <>
                    <LucideStar className="h-4 w-auto text-text-500 fill-text-500" />
                    {average} ({reviewsCount ? reviewsCount : 0})
                  </>
                ) : (
                  <span className="px-2 text-sm text-primary-500 bg-primary-50 rounded-xl min-w-24">Newly added</span>
                )}
              </div>
            </div>
            <div className="text-text-300 text-sm">
              <Typography className="truncate">{category || "Unknown category"} in {city ?? "Unknown location"}</Typography>
              <Typography className="truncate">{fuel || "Unknown fuel"} - {transmission ?? "Unknown transmission"}</Typography>
            </div>
            <Typography
              fontWeight="semibold"
              className="text-text-700 underline truncate"
            >
              {formatCurrency(price)} <span className="font-normal">/ 24 hours</span>
            </Typography>
          </div>
        </Link>
      </li>
    </>
  )
}

export default RentalCard

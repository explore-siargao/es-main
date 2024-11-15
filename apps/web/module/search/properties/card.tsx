import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import CustomSquareSlider from "@/common/components/custom-square-slider"
import { LucideHeart, LucideStar } from "lucide-react"
import formatCurrency from "@/common/helpers/formatCurrency"
import { E_Property_Type } from "@repo/contract-2/property"
import propertyTypeMap from "@/common/helpers/propertyTypeMap"
import NewlyAddedTag from "../components/newly-added-tag"

export type T_Property_Card = {
  listingId: string
  title: string | null
  subtitle: string | null
  type: E_Property_Type
  wholePlaceType: E_Property_Type
  photos: {
    key: string
    alt: string
  }[]
  location: {
    city: string
    latitude: number
    longitude: number
  }
  price: number
  average: number
  reviewsCount: number
}

const PropertyCard = ({
  listingId,
  title,
  subtitle,
  type,
  wholePlaceType,
  photos,
  location,
  price,
  average,
  reviewsCount,
}: T_Property_Card) => {
  return (
    <>
      <li className="relative overflow-hidden h-full list-none">
        <Link href={`/listing/properties/${listingId}`} target="_blank">
          <div className="h-auto w-full relative">
            {reviewsCount < 1 ? <NewlyAddedTag /> : null}
            <button
              onClick={(e) => console.log("clicked heart")}
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
                variant="h4"
                fontWeight="semibold"
                className="text-text-500 truncate"
              >
                {title ? title : subtitle || "Unknown title"}
              </Typography>
              <Typography
                variant="h5"
                className="flex text-text-500 items-center gap-1"
              >
                {reviewsCount > 1 ? (
                  <>
                    <LucideStar className="h-4 w-auto text-text-500 fill-text-500" />
                    {average} ({reviewsCount ? reviewsCount : 0})
                  </>
                ) : null}
              </Typography>
            </div>
            <div className="text-text-300 text-sm">
              <Typography className="truncate" variant="h5">
                {propertyTypeMap[wholePlaceType || type || "Unknown type"] ||
                  "Unknown"}{" "}
                in {location.city || "Unknown location"}
              </Typography>
            </div>
            <Typography
              fontWeight="semibold"
              variant="h5"
              className="text-text-700 underline truncate"
            >
              From {formatCurrency(price)}{" "}
              <span className="font-normal">/ night</span>
            </Typography>
          </div>
        </Link>
      </li>
    </>
  )
}

export default PropertyCard

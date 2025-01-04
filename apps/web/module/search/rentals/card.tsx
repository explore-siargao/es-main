import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import CustomSquareSlider from "@/common/components/custom-square-slider"
import { LucideHeart, LucideStar } from "lucide-react"
import formatCurrency from "@/common/helpers/format-currency"
import NewlyAddedTag from "../components/newly-added-tag"
import { E_Rental_Category } from "@repo/contract"
import { T_Rental_Filtered } from "@repo/contract-2/search-filters"

const RentalCard = (props: T_Rental_Filtered) => {
  const category: E_Rental_Category = props.category
  const titleMap = {
    [E_Rental_Category.Motorbike]: `${props.make} ${props.modelBadge}`,
    [E_Rental_Category.Car]: `${props.year} ${props.make} ${props.modelBadge}`,
    [E_Rental_Category.Bicycle]: props.make,
  }

  const title = titleMap[category]
  const location = props.location
  const listingId = props._id
  const price = props.pricing?.dayRate ?? 0
  const photos = props.photos?.map((photo) => ({
    key: photo.key,
    alt: photo.tags,
  }))
  const average = props.average
  const reviewsCount = props.reviewsCount ?? 0
  const transmission = props.transmission
  const fuel = props.fuel
  return (
    <>
      <li className="relative rounded-xl overflow-hidden h-full list-none">
        <Link href={`/listings/rentals/${listingId}`} target="_blank">
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
                {title ?? "Unknown title"}
              </Typography>
              {reviewsCount > 1 ? (
                <Typography
                  variant="h5"
                  className="flex text-text-500 items-center gap-1 min-w-20 justify-end"
                >
                  <LucideStar className="h-4 w-auto text-text-500 fill-text-500" />
                  {average} ({reviewsCount ? reviewsCount : 0})
                </Typography>
              ) : null}
            </div>
            <div className="text-text-300 text-sm">
              <Typography className="truncate" variant="h5">
                {category || "Unknown category"} in{" "}
                {location?.city ?? "Unknown location"}
              </Typography>
              <Typography className="truncate" variant="h5">
                {fuel || "Unknown fuel"} -{" "}
                {transmission ?? "Unknown transmission"}
              </Typography>
            </div>
            <Typography
              fontWeight="semibold"
              variant="h5"
              className="text-text-700 underline truncate"
            >
              {formatCurrency(price, { noDecimals: true })}{" "}
              <span className="font-normal">/ 24 hours</span>
            </Typography>
          </div>
        </Link>
      </li>
    </>
  )
}

export default RentalCard

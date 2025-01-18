import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import CustomSquareSlider from "@/common/components/custom-square-slider"
import { LucideHeart, LucideStar } from "lucide-react"
import formatCurrency from "@/common/helpers/format-currency"
import NewlyAddedTag from "../components/newly-added-tag"
import { T_Activity_Filtered } from "@repo/contract-2/search-filters"
import { E_Experience_Types } from "@repo/contract-2/activity"
import ExperienceTypeTag from "../components/experience-type-tag"

const ActivityCard = (props: T_Activity_Filtered) => {
  const title = props.title
  const location = props.meetingPoint
  const listingId = props._id
  const price = props.pricePerSlot || props.pricePerPerson || 0
  const priceNoun = props.pricePerSlot ? `slot` : `person`
  const photos = props.photos?.map((photo) => ({
    key: photo.key,
    alt: photo.tags,
  }))
  const average = props.average
  const type =
    (props.activityType ?? [])[0] ??
    (props.activityType ?? [])[1] ??
    "Unknown type"
  const reviewsCount = props.reviewsCount
  const generateCardTag = () => {
    // This is a hierarchical tag, it needs to have 1 at a time
    // If you will add another here, make sure you decided the hierarchy
    if (reviewsCount < 1) {
      return <NewlyAddedTag />
    } else {
      return (
        <ExperienceTypeTag
          isPrivate={props.experienceType === E_Experience_Types.Private}
        />
      )
    }
  }
  return (
    <>
      <li className="relative rounded-xl overflow-hidden h-full list-none">
        <Link href={`/listings/activities/${listingId}`} target="_blank">
          <div className="h-auto w-full relative">
            {generateCardTag()}
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
                {type || "Unknown category"} in{" "}
                {location?.city ?? "Unknown location"}
              </Typography>
            </div>
            <Typography
              fontWeight="semibold"
              variant="h5"
              className="text-text-700 underline truncate"
            >
              From {formatCurrency(price, { noDecimals: true })}{" "}
              <span className="font-normal">/ {priceNoun}</span>
            </Typography>
          </div>
        </Link>
      </li>
    </>
  )
}

export default ActivityCard

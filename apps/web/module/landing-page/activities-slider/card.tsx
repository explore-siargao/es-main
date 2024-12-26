import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import { LucideStar } from "lucide-react"
import formatCurrency from "@/common/helpers/format-currency"
import { T_Activity_Filtered } from "@repo/contract-2/search-filters"
import Image from "@/common/components/ui/image"

const ActivityCard = (props: T_Activity_Filtered) => {
  const title = props.title
  const location = props.meetingPoint
  const listingId = props._id
  const price = props.pricePerSlot || props.pricePerPerson || 0
  const priceNoun = props.pricePerSlot ? `slot` : `person`;
  const photos = props.photos.map((photo) => ({
    key: photo.key,
    alt: photo.tags,
  }))
  const average = props.average
  const type = (props.activityType ?? [])[1] ?? "Unknown type"
  const reviewsCount = props.reviewsCount
  return (
    <>
      <div className="relative overflow-hidden h-full list-none">
        <Link href={`/listings/activities/${listingId}`} target="_blank">
          <div className="h-auto w-full relative">
            <div className="h-80">
              <Image
                src={`/assets/${photos[0]?.key}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                alt={photos[0]?.alt ?? "Image"}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
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
              From {formatCurrency(price)}{" "}
              <span className="font-normal">/ {priceNoun}</span>
            </Typography>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ActivityCard

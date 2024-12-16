import Image from "@/common/components/ui/image"
import formatCurrency from "@/common/helpers/format-currency"
import { LucideStar } from "lucide-react"
import { Popup as LeafletPopup } from "react-leaflet"
import Link from "next/link"
import React, { useRef } from "react"
import { LatLngTuple } from "leaflet"
import NewlyAddedTag from "../../components/newly-added-tag"
import { T_Rental_Filtered } from "@repo/contract-2/search-filters"
import { E_Rental_Category } from "@repo/contract"

const Popup = ({
  index,
  rental,
}: {
  index: number
  rental: T_Rental_Filtered
}) => {
  const popupRefs = useRef<Map<number, L.Popup>>(new Map())
  const category: E_Rental_Category = rental.category
  const titleMap = {
    [E_Rental_Category.Motorbike]: `${rental.make} ${rental.modelBadge}`,
    [E_Rental_Category.Car]: `${rental.year} ${rental.make} ${rental.modelBadge}`,
    [E_Rental_Category.Bicycle]: rental.make,
  }

  const title = titleMap[category]
  const location = rental.location
  const listingId = rental._id
  const price = rental.pricing?.dayRate ?? 0
  const photos = rental.photos?.map((photo) => ({
    key: photo.key,
    alt: photo.tags,
  }))
  const average = rental.average
  const reviewsCount = rental.reviewsCount ?? 0
  const transmission = rental.transmission
  const fuel = rental.fuel
  return (
    <LeafletPopup
      ref={(el) => {
        if (el) {
          popupRefs.current.set(index, el)
        }
      }}
      position={[location?.latitude, location?.longitude] as LatLngTuple}
      offset={[0, -2]}
    >
      {reviewsCount < 1 ? <NewlyAddedTag /> : null}
      <Link href={`/listings/rentals/${listingId}`} target="_blank">
        {photos && photos.length > 0 ? (
          <Image
            src={`/assets/${photos[0]?.key}`}
            alt={photos[0]?.alt ?? title}
            width={150}
            height={100}
            className="w-full bg-gray-200 rounded-t-xl"
          />
        ) : null}
        <div className="px-4 pb-4 pt-3 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-semibold text-text-500 text-sm truncate">
              {title ?? "Unknown title"}
            </span>
            <span className="flex text-text-500 items-center gap-1 text-sm">
              {reviewsCount > 1 ? (
                <>
                  <LucideStar className="h-4 w-auto text-text-500 fill-text-500" />
                  {average} ({reviewsCount ? reviewsCount : 0})
                </>
              ) : null}
            </span>
          </div>
          <span className="truncate text-text-300 text-xs">
            {category || "Unknown category"} in{" "}
            {location?.city ?? "Unknown location"}
          </span>
          <span className="truncate text-text-300 text-xs">
            {fuel || "Unknown fuel"} - {transmission ?? "Unknown transmission"}
          </span>
          <span className="text-text-700 underline truncate semibold text-xs">
            {formatCurrency(price)}{" "}
            <span className="font-normal">/ 24 hours</span>
          </span>
        </div>
      </Link>
    </LeafletPopup>
  )
}

export default Popup

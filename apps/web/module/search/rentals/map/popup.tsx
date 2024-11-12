import Image from "@/common/components/ui/image"
import formatCurrency from "@/common/helpers/formatCurrency"
import { LucideStar } from "lucide-react"
import { Popup as LeafletPopup } from "react-leaflet"
import Link from "next/link"
import React, { useRef } from "react"
import { LatLngTuple } from "leaflet"
import { T_Rental_Card } from "../card"

const Popup = ({
  index,
  listingId,
  title,
  photos,
  location,
  price,
  average,
  reviewsCount,
  category,
  transmission,
  fuel,
}: T_Rental_Card & { index: number }) => {
  const popupRefs = useRef<Map<number, L.Popup>>(new Map())
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
      <Link href={`/listing/rental/${listingId}`} target="_blank">
        {photos && photos.length > 0 ? (
          <Image
            src={`/assets/${photos[0]?.key}`}
            alt={photos[0]?.alt ?? title}
            width={150}
            height={100}
            className="w-full bg-gray-200 rounded-t-xl"
          />
        ) : null}
        <div className="p-4 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-semibold text-text-500 text-sm truncate">
              {title ?? "Unknown title"}
            </span>
            <div className="flex text-text-500 items-center gap-1">
              {average > 1 ? (
                <>
                  <LucideStar className="h-4 w-auto text-text-500 fill-text-500" />
                  {average} ({reviewsCount ? reviewsCount : 0})
                </>
              ) : (
                <span className="px-2 text-sm text-primary-500 bg-primary-50 rounded-xl min-w-24">
                  Newly added
                </span>
              )}
            </div>
          </div>
          <span className="truncate text-text-300 text-sm">
            {category || "Unknown category"} in{" "}
            {location.city ?? "Unknown location"}
          </span>
          <span className="truncate text-text-300 text-sm">
            {fuel || "Unknown fuel"} - {transmission ?? "Unknown transmission"}
          </span>
          <span className="text-text-700 underline truncate semibold text-sm">
            {formatCurrency(price)}{" "}
            <span className="font-normal">/ 24 hours</span>
          </span>
        </div>
      </Link>
    </LeafletPopup>
  )
}

export default Popup

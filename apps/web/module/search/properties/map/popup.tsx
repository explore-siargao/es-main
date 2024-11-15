import Image from "@/common/components/ui/image"
import formatCurrency from "@/common/helpers/formatCurrency"
import { LucideStar } from "lucide-react"
import { Popup as LeafletPopup } from "react-leaflet"
import Link from "next/link"
import React, { useRef } from "react"
import { LatLngTuple } from "leaflet"
import { T_Property_Card } from "../card"
import propertyTypeMap from "@/common/helpers/propertyTypeMap"
import NewlyAddedTag from "../../components/newly-added-tag"

const Popup = ({
  index,
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
}: T_Property_Card & { index: number }) => {
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
      {reviewsCount < 1 ? <NewlyAddedTag /> : null}
      <Link href={`/listing/activities/${listingId}`} target="_blank">
        {photos && photos.length > 0 ? (
          <Image
            src={`/assets/${photos[0]?.key}`}
            alt={photos[0]?.alt ? photos[0]?.alt : title || wholePlaceType}
            width={150}
            height={100}
            className="w-full bg-gray-200 rounded-t-xl"
          />
        ) : null}
        <div className="px-4 pb-4 pt-3 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-semibold text-text-500 text-sm truncate">
              {title ? title : subtitle || "Unknown title"}
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
            {propertyTypeMap[wholePlaceType || type] || "Unknown type"} in{" "}
            {location.city ?? "Unknow location"}
          </span>
          <span className="text-text-700 underline truncate semibold text-xs">
            From {formatCurrency(price)}{" "}
            <span className="font-normal">/ night</span>
          </span>
        </div>
      </Link>
    </LeafletPopup>
  )
}

export default Popup

"use client"
import { Typography } from "@/common/components/ui/Typography"
import { MapProps } from "@/module/Listing/Property/types/Map"
import dynamic from "next/dynamic"

const DynamicMapWithPin = dynamic(
  () => import("../../../common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

const MeetingPoint = ({ location, coordinates, desc }: MapProps) => {
  const maxLength = 600
  const slicedDescription =
    desc?.length > maxLength ? desc.slice(0, maxLength) + "...." : desc

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold" className="mb-5">
          Meet-up Point
        </Typography>
        <div className="mb-5">
          <DynamicMapWithPin
            center={coordinates as [number, number]}
            disablePinMovement={true}
          />
        </div>

        {location && (
          <div className="text-md font-semibold mb-5">{location}</div>
        )}
        {desc && (
          <div className="flex text-sm mb-4">
            <p>{slicedDescription}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingPoint

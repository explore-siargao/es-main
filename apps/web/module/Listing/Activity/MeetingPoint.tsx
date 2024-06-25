"use client"
import SpecificMap from "@/common/components/SpecificMap"
import { Typography } from "@/common/components/ui/Typography"
import { MapProps } from "@/module/Accommodation/types/Map"

const MeetingPoint = ({ location, coordinates, desc }: MapProps) => {
  const maxLength = 600
  const slicedDescription =
    desc.length > maxLength ? desc.slice(0, maxLength) + "...." : desc

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold" className="mb-5">
          Meet-up Point
        </Typography>
        <div className="w-12/12 h-[450px] bg-primary-200 mb-5">
          <SpecificMap
            center={coordinates as [number, number]}
            mapHeight="h-[450px]"
            mapWidth="w-full"
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

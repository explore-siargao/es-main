"use client"
import { Typography } from "@/common/components/ui/Typography"
import { MapProps } from "@/module/Listing/property/types/Map"
import { T_Location } from "@repo/contract-2/address-location"
import dynamic from "next/dynamic"
import { location } from '../../../../cms/src/fields/restaurants/location';

const DynamicMapWithPin = dynamic(
  () => import("../../../common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

const MeetingPoint = ({ meetingPoint }: { meetingPoint: T_Location | null }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold">
          Where you'll meet
        </Typography>
        <div className="mt-3">
          <DynamicMapWithPin
            center={[meetingPoint?.latitude, meetingPoint?.longitude] as [number, number]}
            disablePinMovement={true}
          />
        </div>
        <div className="text-md font-semibold mt-3">{meetingPoint?.streetAddress}, {meetingPoint?.barangay}, {meetingPoint?.city}, Surigao del Norte</div>
        <Typography className="flex text-sm mt-2 text-text-400">
          {meetingPoint?.howToGetThere}
        </Typography>
      </div>
    </div>
  )
}

export default MeetingPoint

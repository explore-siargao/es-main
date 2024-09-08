import { MapProps } from "../types/Map"
import { Typography } from "@/common/components/ui/Typography"

import dynamic from "next/dynamic"

const DynamicMapWithPin = dynamic(
  () => import("../../../../common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

const PickUpLocation = ({ mapData }: MapProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold" className="mb-5">
          Pick-up location
        </Typography>
        <div className="mb-3">
          <DynamicMapWithPin
            center={[mapData?.latitude || 0.00, mapData?.longitude || 0.00] as [number, number]}
            disablePinMovement={true}
          />
        </div>

        {mapData?.city && (
          <div className="text-md font-semibold mb-5">
            {mapData.city}, Philippines
          </div>
        )}
        {mapData?.howToGetThere && (
          <div className="flex text-sm mb-4">
            <p>{mapData.howToGetThere}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PickUpLocation

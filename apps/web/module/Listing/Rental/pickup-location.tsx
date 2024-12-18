import { Typography } from "@/common/components/ui/Typography"
import { T_Location } from "@repo/contract-2/address-location"

import dynamic from "next/dynamic"

const DynamicMapWithPin = dynamic(
  () => import("../../../common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

const PickUpLocation = ({ location }: { location: T_Location | null }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold" className="mb-5">
          Pick-up location
        </Typography>
        <div className="mb-3">
          <DynamicMapWithPin
            center={
              [location?.latitude || 0.0, location?.longitude || 0.0] as [
                number,
                number,
              ]
            }
            disablePinMovement={true}
          />
        </div>

        {location?.city && (
          <div className="text-md font-semibold mb-5">
            {location.city}, Philippines
          </div>
        )}
        {location?.howToGetThere && (
          <div className="flex text-sm mb-4">
            <p>{location.howToGetThere}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PickUpLocation

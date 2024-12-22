import { Typography } from "@/common/components/ui/Typography"
import { T_Location } from "@repo/contract-2/address-location"

import dynamic from "next/dynamic"

const DynamicMapWithPin = dynamic(
  () => import("@/common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

const PickUpLocation = ({ location }: { location: T_Location | null }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h3" fontWeight="semibold" className="mb-5">
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
            zoom={11}
          />
        </div>

        {location?.city && location.streetAddress && location.barangay ? (
          <Typography className="font-semibold">
            {location.streetAddress}, {location.barangay}, {location.city}, Surigao del Norte
          </Typography>
        ) : null}
        {location?.howToGetThere && (
          <Typography variant="h5" className="flex mt-2 text-text-400">
            {location.howToGetThere}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default PickUpLocation

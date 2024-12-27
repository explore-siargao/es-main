"use client"

import { Button } from "@/common/components/ui/Button"
import WhereYouWillBeModal from "./modal"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import dynamic from "next/dynamic"

const DynamicMapWithPin = dynamic(
  () => import("../../../../common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

interface ILocation {
  city: string
  streetAddress: string
  barangay: string
  longitude: number
  latitude: number
}

interface MapProps {
  coordinates: [number, number]
  desc: string
  locationDescription: string
}

interface WhereYoullBeDescriptionProps extends MapProps {
  location: ILocation
}

const Map: React.FC<WhereYoullBeDescriptionProps> = ({
  location,
  coordinates,
  desc,
  locationDescription,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const maxLength = 600
  const slicedDescription =
    desc?.length > maxLength ? desc.slice(0, maxLength) + "...." : desc

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h3" fontWeight="semibold" className="mb-5">
          Where you'll be
        </Typography>
        <div>
          <DynamicMapWithPin
            center={coordinates}
            disablePinMovement={true}
            zoom={11}
          />
        </div>

        {location && (
          <Typography className="font-semibold mt-4">
            {location.streetAddress}, {location.barangay}, {location.city},
            Surigao del Norte
          </Typography>
        )}
        {desc && (
          <div className="flex mt-2">
            <Typography
              variant="h5"
              className="w-full break-words text-text-400"
            >
              {slicedDescription}
            </Typography>
          </div>
        )}
      </div>
      {/* <div className="flex w-full">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-semibold underline mx-0 px-0"
          variant="ghost"
        >
          Show more &gt;
        </Button>
      </div> */}
      <WhereYouWillBeModal
        center={coordinates}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locationDescription={locationDescription}
      />
    </div>
  )
}

export default Map

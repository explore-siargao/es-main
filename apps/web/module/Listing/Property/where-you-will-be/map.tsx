"use client"
import WhereYouWillBeModal from "./modal"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import dynamic from "next/dynamic"
import { T_Location } from "@repo/contract-2/address-location"

const DynamicMapWithPin = dynamic(
  () => import("../../../../common/components/Map/MapWithPin"),
  {
    ssr: false,
  }
)

const Map = ({ location }: { location: T_Location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const coordinates = [location.latitude, location.longitude] as [
    number,
    number,
  ]
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
        <div className="flex mt-2">
          <Typography variant="h5" className="w-full break-words text-text-400">
            {location.howToGetThere}
          </Typography>
        </div>
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
        locationDescription={location.howToGetThere}
      />
    </div>
  )
}

export default Map

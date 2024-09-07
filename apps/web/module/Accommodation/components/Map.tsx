"use client"

import { Button } from "@/common/components/ui/Button"
import WhereYouWillBeModal from "./WhereYouWillBeModal"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import dynamic from 'next/dynamic'
 
const DynamicSpecificMap = dynamic(() => import('@/common/components/SpecificMap'), {
  ssr: false,
})

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

const WhereYoullBeDescription: React.FC<WhereYoullBeDescriptionProps> = ({
  location,
  coordinates,
  desc,
  locationDescription,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const maxLength = 600
  const slicedDescription =
    desc.length > maxLength ? desc.slice(0, maxLength) + "...." : desc

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold" className="mb-5">
          Where you'll be
        </Typography>
        <div className="w-full h-[450px] bg-primary-200 mb-5">
          <DynamicSpecificMap
            center={coordinates}
            mapHeight="h-[450px]"
            mapWidth="w-full"
          />
        </div>

        {location && (
          <div className="text-md font-semibold mb-5">
            <div>
              {location.streetAddress}, {location.barangay}, {location.city}
            </div>
          </div>
        )}
        {desc && (
          <div className="flex text-sm mb-4">
            <p>{slicedDescription}</p>
          </div>
        )}
      </div>
      <div className="flex w-full">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-semibold underline mx-0 px-0"
          variant="ghost"
        >
          Show more &gt;
        </Button>
      </div>
      <WhereYouWillBeModal
        center={coordinates}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locationDescription={locationDescription}
      />
    </div>
  )
}

export default WhereYoullBeDescription

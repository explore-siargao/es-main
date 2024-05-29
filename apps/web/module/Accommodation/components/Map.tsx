"use client"
import SpecificMap from "@/common/components/SpecificMap"
import { Button } from "@/common/components/ui/Button"
import WhereYouWillBeModal from "./WhereYouWillBeModal"
import { useState } from "react"
import { MapProps } from "../types/Map"
import { Typography } from "@/common/components/ui/Typography"

const WhereYoullBeDescription = ({ location, coordinates, desc }: MapProps) => {
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
        center={coordinates as [number, number]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default WhereYoullBeDescription

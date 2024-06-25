"use client"
import SpecificMap from "@/common/components/SpecificMap"
import { Button } from "@/common/components/ui/Button"
import WhereYouWillBeModal from "./WhereYouWillBeModal"
import { useState } from "react"
import { MapProps } from "../types/Map"
import { Typography } from "@/common/components/ui/Typography"

const WhereYoullBeDescription = ({ mapData }: MapProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const maxLength = 600

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 w-full">
        <Typography variant="h2" fontWeight="semibold" className="mb-5">
          Pick-up location
        </Typography>
        <div className="w-12/12 h-[450px] bg-primary-200 mb-5">
          <SpecificMap
            center={[mapData.longitude, mapData.latitude]}
            mapHeight="h-[450px]"
            mapWidth="w-full"
          />
        </div>

        {mapData.city && (
          <div className="text-md font-semibold mb-5">
            {mapData.city}, Philippines
          </div>
        )}
        {mapData.howToGetThere && (
          <div className="flex text-sm mb-4">
            <p>{mapData.howToGetThere}</p>
          </div>
        )}
      </div>
      <WhereYouWillBeModal
        center={[mapData.longitude, mapData.latitude]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default WhereYoullBeDescription

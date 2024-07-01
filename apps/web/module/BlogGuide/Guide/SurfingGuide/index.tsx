"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { Separator } from "@/common/components/ui/Separator"
import SurfGuide from "./SurfGuide"
import Directions from "./Directions"
import IdealConditions from "./IdealConditions"
import Forecast from "./Forecast"
import WindMap from "./WindMap"

function SurfingGuide() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const updateCoordinates = (latitude: number, longitude: number) => {
    setCoordinates({ latitude, longitude })
  }
  const params = useParams()
  const guideName = params.guideName
  return (
    <WidthWrapper width={"small"}>
      <div className="mt-10">
        <SurfGuide />
        <Separator
          orientation="horizontal"
          className="mt-10 mb-6 bg-gray-300"
        />
        <Directions />
        <Separator
          orientation="horizontal"
          className="mt-10 mb-6 bg-gray-300"
        />
        <IdealConditions />
        <Separator
          orientation="horizontal"
          className="mt-10 mb-6 bg-gray-300"
        />
        <Forecast />
      </div>
    </WidthWrapper>
  )
}

export default SurfingGuide

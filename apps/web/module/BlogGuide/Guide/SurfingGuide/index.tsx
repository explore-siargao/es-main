"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import SurfGuide from "./SurfGuide"
import Directions from "./Directions"
import IdealConditions from "./IdealConditions"
import Forecast from "./Forecast"

function SurfingGuide() {
  const params = useParams()
  const guideName = params.guideName
  return (
    <WidthWrapper width={"small"}>
      <div className="py-8">
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

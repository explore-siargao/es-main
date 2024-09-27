"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import SurfGuide from "./SurfGuide"
import Directions from "./Directions"
import IdealConditions from "./IdealConditions"
import Forecast from "./Forecast"

type T_Props = {
  data: any
}

const SurfingGuide = ({ data }: T_Props) => {
  return (
    <WidthWrapper width="medium">
      <SurfGuide
        title={data.title}
        guideText={data.hero.guide}
        images={data.hero.images}
      />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <Directions
        longitude={data.content.location[0]}
        latitude={data.content.location[1]}
        locationGuide={data.content.locationGuide}
      />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <IdealConditions />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <Forecast />
    </WidthWrapper>
  )
}

export default SurfingGuide

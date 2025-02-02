import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import SurfGuide from "./hero"
import Directions from "./direction"
import IdealConditions from "./ideal-condition"
import Forecast from "./forecast"

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
      <Separator orientation="horizontal" className="mt-2 mb-8 bg-gray-300" />
      <Directions
        longitude={data.content.location[0]}
        latitude={data.content.location[1]}
        locationGuide={data.content.locationGuide}
      />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <IdealConditions item={data.content.idealCondtions} />
      <Separator orientation="horizontal" className="mt-3 mb-6 bg-gray-300" />
      {/* BUG: Forecast windy map controls is missing when Directions' map is rendered */}
      <Forecast />
    </WidthWrapper>
  )
}

export default SurfingGuide

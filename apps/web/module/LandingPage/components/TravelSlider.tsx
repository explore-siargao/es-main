"use client"
import { Typography } from "@/common/components/ui/Typography"
import Slider from "./Slider"
import { StaticImageData } from "next/image"

type TravelSliderProps = {
  title: string
  description?: string
  groupCards: {
    imageKey: StaticImageData
    mainPlace: string
    subPlace: string
  }[]
}

const TravelSlider = ({
  title,
  description,
  groupCards,
}: TravelSliderProps) => {
  return (
    <div className="mb-5">
      <div className="pl-5 mb-8">
        {title && (
          <Typography variant="h2" fontWeight="semibold" className="text-left">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="h4" className="text-left">
            {description}
          </Typography>
        )}
      </div>
      <div>
        <Slider cards={groupCards} />
      </div>
    </div>
  )
}

export default TravelSlider

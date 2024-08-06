"use client"
import { Typography } from "@/common/components/ui/Typography"
import Slider from "./Slider"
import { StaticImageData } from "next/image"

type TravelSliderProps = {
  title: string
  description?: string
  groupCards: {
    imageKey: StaticImageData | string
    title: string
    subTitle?: string
    url?: string
  }[]
  url?: string
  isGuide: boolean
}

const TravelSlider = ({
  title,
  description,
  groupCards,
  isGuide,
}: TravelSliderProps) => {
  const formattedGroupCards = groupCards.map((card) => ({
    ...card,
    subTitle: card.subTitle || "",
  }))

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
        <Slider cards={formattedGroupCards} isGuide={isGuide} />
      </div>
    </div>
  )
}

export default TravelSlider

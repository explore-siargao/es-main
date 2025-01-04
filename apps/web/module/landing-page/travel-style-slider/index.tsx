"use client"
import { Typography } from "@/common/components/ui/Typography"
import Slider from "./slider"
import { StaticImageData } from "next/image"

type TravelSliderProps = {
  groupCards: {
    imageKey: StaticImageData | string
    title: string
    subTitle?: string
    url?: string
  }[]
  url?: string
  itemsNumber: number
}

const TravelStyleSlider = ({
  groupCards,
  itemsNumber,
}: TravelSliderProps) => {
  const formattedGroupCards = groupCards.map((card) => ({
    ...card,
    subTitle: card.subTitle || "",
  }))

  return (
    <div className="mb-5">
      <div className="mb-8">
        <Typography variant="h2" fontWeight="semibold" className="text-left">
          What's your travel style?
        </Typography>
        <Typography variant="h4" className="text-left">
          Browse by property type to find the perfect space
        </Typography>
      </div>
      <div>
        <Slider
          cards={formattedGroupCards}
          itemsNumber={itemsNumber}
        />
      </div>
    </div>
  )
}

export default TravelStyleSlider
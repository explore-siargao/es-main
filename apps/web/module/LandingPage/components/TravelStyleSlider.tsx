"use client"
import { Typography } from "@/common/components/ui/Typography"
import PropertySlider from "./PropertySlider"

type TravelStyleProps = {
  title: string
  description?: string
  groupCards: {
    imageKey: string
    cardTitle?: string
    url: string
  }[]
}

const TravelStyleSlider = ({
  title,
  description,
  groupCards,
}: TravelStyleProps) => {
  return (
    <div className="mb-5">
      <div className="pl-5 mb-2">
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
        <PropertySlider cards={groupCards} />
      </div>
    </div>
  )
}

export default TravelStyleSlider

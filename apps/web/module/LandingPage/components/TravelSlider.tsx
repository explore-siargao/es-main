import { useRouter } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import Slider from "./Slider"
import { StaticImageData } from "next/image"

type TravelSliderProps = {
  title: string
  description?: string
  groupCards: {
    imageKey: StaticImageData | string
    title: string
    url: string
  }[]
}

const TravelSlider = ({
  title,
  description,
  groupCards,
}: TravelSliderProps) => {
  const router = useRouter()

  const handleCardClick = (url: string) => {
    router.push(url)
  }

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
        <Slider
          cards={groupCards.map((card) => ({
            ...card,
            onClick: () => handleCardClick(card.url),
          }))}
        />
      </div>
    </div>
  )
}

export default TravelSlider

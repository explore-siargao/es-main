import { Typography } from "@/common/components/ui/Typography"
import Image, { StaticImageData } from "next/image"

interface CardProps {
  cards: {
    imageKey: StaticImageData
    title: string
    description: string
  }[]
}

const Card = ({ cards }: CardProps) => {
  return (
    <div className="flex space-x-8">
      {cards.map((card, index) => (
        <div key={index} className="flex-none w-64">
          <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
            <Image
              className="cursor-pointer"
              src={card.imageKey}
              alt={card.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mt-2 text-left">
            <Typography variant="h4" fontWeight="semibold">
              {card.title}
            </Typography>
            <Typography variant="h5">{card.description}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card

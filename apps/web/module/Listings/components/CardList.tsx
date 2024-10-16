import { Typography } from "@/common/components/ui/Typography"
import { StaticImageData } from "next/image"
import Image from "@/common/components/ui/image"

interface CardProps {
  imageKey: string | StaticImageData
  title: string
  description: string
  category: string
  type: string
}

interface CardListProps {
  cards: CardProps[]
  filters: Filters[]
}

export interface Filters {
  type?: string
  category?: string
}

const Card = ({ imageKey, title, description }: CardProps) => {
  return (
    <div className="flex-none items-center justify-center w-full max-w-xs">
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
        {typeof imageKey === "string" ? (
          <img
            src={imageKey}
            alt={title}
            className="cursor-pointer w-full h-full object-cover"
          />
        ) : (
          <Image
            className="cursor-pointer"
            src={imageKey}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="mt-2 text-left">
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
        <Typography variant="h5">{description}</Typography>
      </div>
    </div>
  )
}

const CardList = ({ cards, filters }: CardListProps) => {
  const applyFilters = (cards: CardProps[], filters: Filters[]) => {
    return cards.filter((card) =>
      filters.every(
        (f) =>
          (f.category ? card.category === f.category : true) &&
          (f.type ? card.type === f.type : true)
      )
    )
  }

  const filteredCards = applyFilters(cards, filters)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {filteredCards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  )
}

export default CardList

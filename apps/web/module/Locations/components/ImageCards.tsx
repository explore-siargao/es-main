import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import Card from "./Card"
import { StaticImageData } from "next/image"
import { Button } from "@/common/components/ui/Button"

type ImageCardsProps = {
  cardTitle: string
  cards: {
    imageKey: StaticImageData
    title: string
    description: string
  }[]
}

const ImageCards = ({ cardTitle, cards }: ImageCardsProps) => {
  const [visibleCount, setVisibleCount] = useState(5)

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5)
  }

  const handleShowLess = () => {
    setVisibleCount((prevCount) => (prevCount - 5 < 5 ? 5 : prevCount - 5))
  }

  return (
    <div>
      <div className="mb-4">
        {cardTitle && (
          <Typography variant="h2" fontWeight="semibold" className="text-left">
            {cardTitle}
          </Typography>
        )}
      </div>
      <div className="space-y-8">
        {Array.from({ length: Math.ceil(visibleCount / 5) }, (_, rowIndex) => (
          <div key={rowIndex} className="flex overflow-x-auto">
            <Card cards={cards.slice(rowIndex * 5, (rowIndex + 1) * 5)} />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-2 space-x-2">
        {visibleCount < cards.length && (
          <Button variant="outline" onClick={handleShowMore}>
            Show more
          </Button>
        )}
        {visibleCount > 5 && (
          <Button variant="outline" onClick={handleShowLess}>
            Show less
          </Button>
        )}
      </div>
    </div>
  )
}

export default ImageCards

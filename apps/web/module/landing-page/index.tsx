"use client"
import React, { useEffect } from "react"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useOptMessageStore from "@/common/store/useOptMessageStore"
import TravelSlider from "./slider/travel-slider"
import ImageTextCard from "@/common/components/image-text-card"
import { Typography } from "@/common/components/ui/Typography"
import { exploreSiargaoIsland, travelStyle } from "./constants"
import SliderItemProperty from "./properties-slider"
import ActivitiesSlider from "./activities-slider"
import RentalsSlider from "./rentals-slider"

const LandingPage = () => {
  const setIsOpen = useOptMessageStore((state) => state.setIsOpen)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const welcome = localStorage.getItem("welcome")
      if (welcome) {
        setIsOpen()
        localStorage.removeItem("welcome")
      }
    }
  }, [])

  return (
    <>
      <WidthWrapper width="medium" className="mb-24 lg:mt-6">
        <div className="sm:mt-24">
          <TravelSlider
            title="Explore Siargao Island"
            description="Essential travel information for your island vacation"
            groupCards={exploreSiargaoIsland}
            isGuide={true}
            itemsNumber={6}
          />
        </div>
        <div className="sm:mt-14">
          <TravelSlider
            title="What's your travel style?"
            description="Browse by property type to find the perfect space"
            groupCards={travelStyle}
            isGuide={true}
            itemsNumber={4}
            isLastItemFull
          />
        </div>
        <div className="sm:mt-14">
          <SliderItemProperty
            itemsNumber={4}
            isLastItemFull
          />
        </div>
        <div className="sm:mt-14">
          <ActivitiesSlider
            itemsNumber={4}
            isLastItemFull
          />
        </div>
        <div className="sm:mt-14">
          <RentalsSlider itemsNumber={4} isLastItemFull />
        </div>
        <div className="sm:mt-14 mb-8">
          <Typography variant="h2" fontWeight="semibold" className="text-left">
            Inspiration for your trip
          </Typography>
          <Typography variant="h4" className="text-left">
            Let us help you make the most out of your time in Siargao island
          </Typography>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 md:gap-4 pr-0">
          <ImageTextCard
            imageKey={`restaurants.jpg`}
            title={"Restaurants, cafes & bars"}
            description={
              "Whether you're here to drink or dine, are a foodie or a newbie, Siargao's multicultural restaurants, cafes and bars will indulge your senses."
            }
            linkTitle={"View foodie guide"}
            url="/siargao/restaurants/guides"
          />
          <ImageTextCard
            imageKey={`surfing.jpg`}
            title={"Surfing in Siargao"}
            description={
              "Make the most out of your surfing vacation. Browse our comprehensive surf guide, check live surf forecasts and connect with local instructors."
            }
            linkTitle={"Check the best surf spots"}
            url="/siargao/surfing/guides"
          />
          <ImageTextCard
            imageKey={`getting-to-the-island.jpg`}
            title={"Getting to the island"}
            description={
              "Borders are finally open and we've done our research so you don't have to. Discover the fastest route to Siargao, travel requirements and much more."
            }
            linkTitle={"Essential travel info"}
            url="/siargao/islands/guides"
          />
        </div>
      </WidthWrapper>
    </>
  )
}

export default LandingPage

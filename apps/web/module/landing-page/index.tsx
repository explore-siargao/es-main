"use client"
import React, { useEffect } from "react"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useOptMessageStore from "@/common/store/useOptMessageStore"
import ImageTextCard from "@/common/components/image-text-card"
import { Typography } from "@/common/components/ui/Typography"
import { exploreSiargaoIsland, travelStyle } from "./constants"
import SliderItemProperty from "./properties-slider"
import ActivitiesSlider from "./activities-slider"
import RentalsSlider from "./rentals-slider"
import TravelStyleSlider from "./travel-style-slider"
import EsIslandSlider from "./es-island-slider"
import { HMACService } from "@repo/services"

const LandingPage = () => {
  const setIsOpen = useOptMessageStore((state) => state.setIsOpen)
  const hmac = new HMACService()
  console.log(hmac.KEY)
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
      <WidthWrapper width="home" className="mb-24 lg:mt-6">
        <div className="sm:mt-24 pl-4">
          <EsIslandSlider groupCards={exploreSiargaoIsland} itemsNumber={6} />
        </div>
        <div className="sm:mt-14 pl-4">
          <TravelStyleSlider groupCards={travelStyle} itemsNumber={4} />
        </div>
        <div className="sm:mt-14 pl-4">
          <SliderItemProperty itemsNumber={4} isLastItemFull />
        </div>
        <div className="sm:mt-14 pl-4">
          <ActivitiesSlider itemsNumber={4} isLastItemFull />
        </div>
        <div className="sm:mt-14 pl-4">
          <RentalsSlider itemsNumber={4} isLastItemFull />
        </div>
        <div className="sm:mt-14 pl-4 mb-8">
          <Typography variant="h2" fontWeight="semibold" className="text-left">
            Inspiration for your trip
          </Typography>
          <Typography variant="h4" className="text-left">
            Let us help you make the most out of your time in Siargao island
          </Typography>
        </div>
        {/* padding right 5 is important here because it give the illusion of next buttons for swiper  */}
        <div className="flex items-center justify-center gap-10 pl-4 pr-5">
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

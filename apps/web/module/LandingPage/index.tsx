"use client"
import React, { useEffect, useState } from "react"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useSessionStore from "@/common/store/useSessionStore"
import useOptMessageStore from "@/common/store/useOptMessageStore"
import { useSearchStore } from "@/common/store/useSearchStore"
import { usePathname } from "next/navigation"
import il1 from "../../common/assets/sample/island-1.jpg"
import il2 from "../../common/assets/sample/island-2.jpg"
import il3 from "../../common/assets/sample/island-3.jpg"
import il4 from "../../common/assets/sample/island-4.jpg"
import il5 from "../../common/assets/sample/island-5.jpg"
import il6 from "../../common/assets/sample/island-6.jpg"
import il7 from "../../common/assets/sample/island-7.jpg"
import il8 from "../../common/assets/sample/island-8.jpg"
import il9 from "../../common/assets/sample/island-9.jpg"
import il10 from "../../common/assets/sample/island-10.jpg"
import il11 from "../../common/assets/sample/island-11.jpg"
import il12 from "../../common/assets/sample/island-12.jpg"
import foodImage from "../../common/assets/sample/image1.jpg"
import surfImage from "../../common/assets/sample/surf.jpg"
import airport from "../../common/assets/sample/airport.jpg"
import TravelSlider from "./components/TravelSlider"
import ImageTextCard from "./components/ImageTextCard"
import { Typography } from "@/common/components/ui/Typography"

const LandingPage = () => {
  const userId = useSessionStore((state) => state).id
  const path = usePathname()
  const setIsOpen = useOptMessageStore((state) => state.setIsOpen)
  const { search, checkIn, checkOut, numberOfGuest, activityDate } =
    useSearchStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [search, checkIn, checkOut, numberOfGuest, activityDate])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const welcome = localStorage.getItem("welcome")
      if (welcome) {
        setIsOpen()
        localStorage.removeItem("welcome")
      }
    }
  }, [])

  const items = [
    {
      id: "Test1",
    },
    {
      id: "Test2",
    },
  ]
  const formData = new FormData()
  items.forEach((element) => {
    formData.append("item[]", element.id)
  })

  const groupCardsDummyTravelStyle = [
    {
      imageKey: "/assets/cf7c14dc-d3f5-46e8-b813-01cf04200519",
      title: "Hostels",
      url: "/search/properties?type=Hostels",
    },
    {
      imageKey: "/assets/f57a9104-b3bc-4c6c-8e7b-ff15ac529b06",
      title: "Apartments",
      url: "/search/properties?type=Apartments",
    },
    {
      imageKey: "/assets/4.jpg",
      title: "Homestay",
      url: "/search/properties?type=Homestay",
    },
    {
      imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
      title: "Hotels",
      url: "/search/properties?type=Hotels",
    },
    {
      imageKey: "/assets/3.jpg",
      title: "Resorts",
      url: "/search/properties?type=Resorts",
    },
    {
      imageKey: "/assets/1.jpg",
      title: "Villas",
      url: "/search/properties?type=Villas",
    },
  ]

  const groupCardsDummy = [
    {
      imageKey: il1,
      title: "Anajawan",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il2,
      title: "Cabitoonan",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il3,
      title: "Catangnan",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il4,
      title: "Consuelo",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il5,
      title: "Corazon",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il6,
      title: "Daku",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il7,
      title: "Catangnans",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il8,
      title: "Malinao",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il9,
      title: "Libertad",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il10,
      title: "Magsaysay",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il11,
      title: "Santa Fe",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
    {
      imageKey: il12,
      title: "Suyangan",
      subTitle: "General Luna",
      url: "/guides/travel/kermit",
    },
  ]

  const groupCardsDummyRecommendedPlaceToStay = [
    {
      imageKey: "/assets/5.jpg",
      title: "Siargao Seasky Resort",
    },
    {
      imageKey: "/assets/2.jpg",
      title: "Mad Monkey Siargao",
    },
    {
      imageKey: "/assets/3.jpg",
      title: "Patrick's on the Beach",
    },
    {
      imageKey: "/assets/4.jpg",
      title: "Strangers Inn & Bar",
    },
    {
      imageKey: "/assets/4.jpg",
      title: "Kaha Island Stay",
    },
    {
      imageKey: "/assets/2.jpg",
      title: "Beachfront Kubo",
    },
    {
      imageKey: "/assets/1.jpg",
      title: "G Villas Siargao",
    },
    {
      imageKey: "/assets/3.jpg",
      title: "Suyog Life Siargao",
    },
    {
      imageKey: "/assets/2.jpg",
      title: "Bohemian Beach House",
    },
    {
      imageKey: "/assets/3.jpg",
      title: "Siargao Residency",
    },
  ]

  const groupCardsDummySomethingToDo = [
    {
      imageKey: il8,
      title: "Sightseeing",
      url: "/search/activities?type=Sightseeing",
    },
    {
      imageKey: il9,
      title: "Walking",
      url: "/search/activities?type=Walking",
    },
    {
      imageKey: il5,
      title: "Sunset view",
      url: "/search/activities?type=Sunset%20view",
    },
    {
      imageKey: il4,
      title: "Sceneries",
      url: "/search/activities?type=Sceneries",
    },
    {
      imageKey: il6,
      title: "Visit",
      url: "/search/activities?type=Visit",
    },
  ]

  const groupCardsDummyReliableCars = [
    {
      imageKey: "/assets/10714cec-083b-48b8-9702-45cbb1debd76",
      title: "2021 Suzuki R150 Fi MT",
      url: "/search/rentals?type=Motorbikes",
    },
    {
      imageKey: "/assets/fe65c50d-2cde-46e6-8c9b-58a73c59e768",
      title: "2018 Honda Civic AT",
      url: "/search/rentals?type=Cars",
    },
    {
      imageKey: "/assets/b57d645a-a3bb-4d23-9e9b-d5caa3f0ae69",
      title: "2023 Toyota Wigo G CVT",
      url: "/search/rentals?type=Bicycle",
    },
    {
      imageKey: "/assets/2a820a6a-9baf-4b7c-884a-217f86e7e657",
      title: "2020 CBR500RXZ Honda MT",
      url: "/search/rentals?type=Cars",
    },
    {
      imageKey: "/assets/099843f0-d626-42fb-899e-62c6687614a2",
      title: "2000 CBR500R Honda SAT",
      url: "/search/rentals?type=Cars",
    },
    {
      imageKey: "/assets/10714cec-083b-48b8-9702-45cbb1debd76",
      title: "2020 Suzuki R150 Fi MT",
      url: "/search/rentals?type=Motorbikes",
    },
  ]

  const groupCardsDummyInspiration = [
    {
      imageKey: il9,
      title: "Boat Trip",
    },
    {
      imageKey: il7,
      title: "Beto Spring",
    },
    {
      imageKey: il3,
      title: "Coconut Tree Lookout",
    },
    {
      imageKey: il2,
      title: "Cloud 9",
    },
    {
      imageKey: il6,
      title: "Alegria Beach",
    },
    {
      imageKey: il5,
      title: "Pacifico Beach",
    },
  ]

  const ASSET_ROOT = "/assets"
  const dummyCards = [
    {
      imageKey: `${ASSET_ROOT}/1.jpg`,
      title: "Villa Juarez",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Popular Filter",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Balcony",
    },
    {
      imageKey: `${ASSET_ROOT}/1.jpg`,
      title: "Villa Juarez",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Popular Filter",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Balcony",
    },
    {
      imageKey: `${ASSET_ROOT}/1.jpg`,
      title: "Villa Juarez",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Popular Filter",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Beach Front",
    },
    {
      imageKey: `${ASSET_ROOT}/1.jpg`,
      title: "Villa Juarez",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Popular Filter",
      type: "Free WiFi",
    },
    {
      imageKey: `${ASSET_ROOT}/2.jpg`,
      title: "Villa Maria",
      description: "General Luna, Philippines",
      category: "Facilities",
      type: "Beach Front",
    },
  ]

  return (
    <>

      <WidthWrapper width="medium" className="mb-24 lg:mt-6">
        <div className="sm:mt-20">
          <TravelSlider
            title="Explore Siargao Island"
            description="Essential travel information for your island vacation"
            groupCards={groupCardsDummy}
            isGuide={true}
            itemsNumber={6}
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="What's your travel style?"
            description="Browse by property type to find the perfect space"
            groupCards={groupCardsDummyTravelStyle}
            isGuide={false}
            itemsNumber={4}
            isLastItemFull={true}
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="Recommended places to stay"
            description="Hand-picked properties just for you"
            groupCards={groupCardsDummyRecommendedPlaceToStay}
            isGuide={false}
            itemsNumber={4}
            isLastItemFull={true}
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="Looking for something to do in Siargao?"
            description="We've partnered the islands for tour and activity providers."
            groupCards={groupCardsDummySomethingToDo}
            isGuide={false}
            itemsNumber={4}
            isLastItemFull={true}
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="Reliable cars, motorbikes and more"
            description="Take the road, let's travel with one of our trusted rental partners."
            groupCards={groupCardsDummyReliableCars}
            isGuide={false}
            itemsNumber={4}
            isLastItemFull={true}
          />
        </div>
        <div className="sm:mt-10 mb-8">
          <Typography variant="h2" fontWeight="semibold" className="text-left">
            Inspiration for your trip
          </Typography>
          <Typography variant="h4" className="text-left">
            Let us help you make the most out of your time in Siargao island
          </Typography>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 md:gap-4 pr-0">
          <ImageTextCard
            imageKey={foodImage}
            title={"Restaurants, cafes & bars"}
            description={
              "Whether you're here to drink or dine, are a foodie or a newbie, Siargao's multicultural restaurants, cafes and bars will indulge your senses."
            }
            linkTitle={"View foodie guide"}
            url="/siargao/restaurants/guides"
          />
          <ImageTextCard
            imageKey={surfImage}
            title={"Surfing in Siargao"}
            description={
              "Make the most out of your surfing vacation. Browse our comprehensive surf guide, check live surf forecasts and connect with local instructors."
            }
            linkTitle={"Check the best surf spots"}
            url="/siargao/surfing/guides"
          />
          <ImageTextCard
            imageKey={airport}
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

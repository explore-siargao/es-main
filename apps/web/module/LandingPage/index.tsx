"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import foodImage from "../../common/assets/sample/image1.jpg"
import surfImage from "../../common/assets/sample/surf.jpg"
import airport from "../../common/assets/sample/airport.jpg"
import TravelSlider from "./components/TravelSlider"
import ImageTextCard from "./components/ImageTextCard"
import { Typography } from "@/common/components/ui/Typography"
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
import TravelStyleSlider from "./components/TravelStyleSlider"

const LandingPage = () => {
  const groupCardsDummyTravelStyle = [
    {
      imageKey: "/assets/cf7c14dc-d3f5-46e8-b813-01cf04200519",
      title: "Hostels",
      url: "/listings?category=property&type=hostel",
    },
    {
      imageKey: "/assets/f57a9104-b3bc-4c6c-8e7b-ff15ac529b06",
      title: "Apartments",
      url: "/listings?category=property&type=apartment",
    },
    {
      imageKey: "/assets/4.jpg",
      title: "Homestay",
      url: "/listings?category=property&type=homestay",
    },
    {
      imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
      title: "Hotels",
      url: "/listings?category=property&type=hotel",
    },
    {
      imageKey: "/assets/3.jpg",
      title: "Resorts",
      url: "/listings?category=property&type=resort",
    },
    {
      imageKey: "/assets/1.jpg",
      title: "Villas",
      url: "/listings?category=property&type=villa",
    },
  ]

  const groupCardsDummy = [
    {
      imageKey: il1,
      title: "General Luna",
      url: "Town Centre",
    },
    {
      imageKey: il2,
      title: "Catangnan",
      url: "General Luna",
    },
    {
      imageKey: il3,
      title: "Malinao",
      url: "General Luna",
    },
    {
      imageKey: il4,
      title: "Pacifico",
      url: "North Siargao",
    },
    {
      imageKey: il5,
      title: "Islands",
      url: "Popular Trips",
    },
    {
      imageKey: il6,
      title: "General Luna",
      url: "Town Centre",
    },
    {
      imageKey: il7,
      title: "Catangnan",
      url: "General Luna",
    },
    {
      imageKey: il8,
      title: "Malinao",
      url: "General Luna",
    },
    {
      imageKey: il9,
      title: "Pacifico",
      url: "North Siargao",
    },
    {
      imageKey: il10,
      title: "Islands",
      url: "Popular Trips",
    },
    {
      imageKey: il11,
      title: "General Luna",
      url: "Popular Trips",
    },
    {
      imageKey: il12,
      title: "Islands",
      url: "Popular Trips",
    },
  ]

  const groupCardsDummyRecommendedPlaceToStay = [
    {
      imageKey: "/assets/1.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/2.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/3.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/4.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/4.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/2.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/1.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/3.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/2.jpg",
      url: "/",
    },
    {
      imageKey: "/assets/3.jpg",
      url: "/",
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
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="What's your travel style?"
            description="Browse by property type to find the perfect space"
            groupCards={groupCardsDummyTravelStyle}
          />
        </div>
        <div className="sm:mt-10">
          <TravelStyleSlider
            title={"Recommended places to stay"}
            description="Hand-picked properties just for you"
            groupCards={groupCardsDummyRecommendedPlaceToStay}
          />
        </div>
        <div className="sm:mt-10 mb-8 pl-5">
          <Typography variant="h2" fontWeight="semibold" className="text-left">
            Inspiration for your trip
          </Typography>
          <Typography variant="h4" className="text-left">
            Let us help you make the most out of your time in Siargao island
          </Typography>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 md:gap-4 px-5">
          <ImageTextCard
            imageKey={foodImage}
            title={"Restaurants, cafes & bars"}
            description={
              "Whether you're here to drink or dine, are a foodie or a newbie, Siargao's multicultural restaurants, cafes and bars will indulge your senses."
            }
            linkTitle={"View foodie guide"}
            url={"/guides/restaurants/restaurant-name"}
          />
          <ImageTextCard
            imageKey={surfImage}
            title={"Surfing in Siargao"}
            description={
              "Make the most out of your surfing vacation. Browse our comprehensive surf guide, check live surf forecasts and connect with local instructors."
            }
            linkTitle={"Check the best surf spots"}
            url={"/guides/surfing/surf-name"}
          />
          <ImageTextCard
            imageKey={airport}
            title={"Getting to the island"}
            description={
              "Borders are finally open and we've done our research so you don't have to. Discover the fastest route to Siargao, travel requirements and much more."
            }
            linkTitle={"Essential travel info"}
            url={"/guides/locations/location-name"}
          />
        </div>
      </WidthWrapper>
    </>
  )
}

export default LandingPage

"use client"
import React, { useEffect, useState } from "react"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import useGetAllBookings from "../LandingPage/hooks/useGetAllBookings"
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
import BudgetSlider from "@/common/components/Filters/BudgetFilter/BudgetSlider"
import { Typography } from "@/common/components/ui/Typography"

const LandingPage = () => {
  const userId = useSessionStore((state) => state).id
  const path = usePathname()
  const setIsOpen = useOptMessageStore((state) => state.setIsOpen)
  const { data, isPending } = useGetAllBookings()
  const { search, checkIn, checkOut, numberOfGuest, date } = useSearchStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [search, checkIn, checkOut, numberOfGuest, date])

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
  formData.forEach((value, key) => {
    console.log("key", key)
    console.log("value", value)
  })

  const groupCardsDummyTravelStyle = [
    {
      imageKey: "/assets/cf7c14dc-d3f5-46e8-b813-01cf04200519",
      title: "Hostels",
      url: "/properties/hostel",
    },
    {
      imageKey: "/assets/f57a9104-b3bc-4c6c-8e7b-ff15ac529b06",
      title: "Apartments",
      url: "/properties/apartment",
    },
    {
      imageKey: "/assets/4.jpg",
      title: "Homestay",
      url: "/properties/homestay",
    },
    {
      imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
      title: "Hotels",
      url: "/properties/hotel",
    },
    {
      imageKey: "/assets/3.jpg",
      title: "Resorts",
      url: "/properties/resort",
    },
    {
      imageKey: "/assets/1.jpg",
      title: "Villas",
      url: "/properties/villa",
    },
  ]

  const groupCardsDummy = [
    {
      imageKey: il1,
      title: "Anajawan",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il2,
      title: "Cabitoonan",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il3,
      title: "Catangnan",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il4,
      title: "Consuelo",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il5,
      title: "Corazon",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il6,
      title: "Daku",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il7,
      title: "Catangnan",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il8,
      title: "Malinao",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il9,
      title: "Libertad",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il10,
      title: "Magsaysay",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il11,
      title: "Santa Fe",
      subTitle: "General Luna",
      url: "/locations/general-luna",
    },
    {
      imageKey: il12,
      title: "Suyangan",
      subTitle: "General Luna",
      url: "/locations/general-luna",
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
      title: "Surfing",
    },
    {
      imageKey: il9,
      title: "Kayaking",
    },
    {
      imageKey: il5,
      title: "Diving",
    },
    {
      imageKey: il4,
      title: "Wing Foiling",
    },
    {
      imageKey: il6,
      title: "Paddle Boarding",
    },
  ]

  const groupCardsDummyReliableCars = [
    {
      imageKey: "/assets/fe65c50d-2cde-46e6-8c9b-58a73c59e768",
      title: "2018 Honda Civic AT",
    },
    {
      imageKey: "/assets/b57d645a-a3bb-4d23-9e9b-d5caa3f0ae69",
      title: "2023 Toyota Wigo G CVT",
    },
    {
      imageKey: "/assets/2a820a6a-9baf-4b7c-884a-217f86e7e657",
      title: "2020 CBR500RXZ Honda MT",
    },
    {
      imageKey: "/assets/099843f0-d626-42fb-899e-62c6687614a2",
      title: "2000 CBR500R Honda SAT",
    },
    {
      imageKey: "/assets/10714cec-083b-48b8-9702-45cbb1debd76",
      title: "2020 Suzuki R150 Fi MT",
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

  return (
    <>
      {/* {isPending || isLoading ? (
        <Spinner variant="primary" middle />
      ) : ( */}

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
          <TravelSlider
            title="Recommended places to stay"
            description="Hand-picked properties just for you"
            groupCards={groupCardsDummyRecommendedPlaceToStay}
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="Looking for something to do in Siargao?"
            description="We've partnered the islands for tour and activity providers."
            groupCards={groupCardsDummySomethingToDo}
          />
        </div>
        <div className="sm:mt-10">
          <TravelSlider
            title="Reliable cars, motorbikes and more"
            description="Take the road, let's travel with one of our trusted rental partners."
            groupCards={groupCardsDummyReliableCars}
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

        {/* {search || checkIn || checkOut || numberOfGuest ? (
            <div className="flex flex-col gap-4">
              {path === "/" && (
                <Typography variant={"h5"} className="text-gray-500">
                  {data?.items?.length} results for "{search}"
                </Typography>
              )}
              {path === "/activities" && (
                <Typography variant={"h5"} className="text-gray-500">
                  Activities available for {numberOfGuest} guest/s on {date}
                </Typography>
              )}
              {path === "/rentals" && (
                <Typography variant={"h5"} className="text-gray-500">
                  Rentals available for {numberOfGuest} guest/s on {date}
                </Typography>
              )}
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 mx-auto w-full justify-center">
                {data?.items?.map((item: any) => (
                  <Listing
                    key={item.id}
                    listingId={item.id}
                    location={item.address}
                    date={item.description}
                    distance={"100 kilometers away"}
                    price={"₱" + item.price}
                    imageKey={item.images}
                    dayTime={item.price.isNight ? "Night" : ""}
                    ratings={item.ratings}
                    isHearted={
                      item.wishes.filter(
                        (value: any) => value.userId === userId
                      ).length !== 0
                    }
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Typography variant={"h1"} fontWeight={"semibold"}>
                  Surf
                </Typography>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 mx-auto w-full justify-center">
                  {data?.items?.map((item: any) => (
                    <Listing
                      key={item.id}
                      listingId={item.id}
                      location={item.address}
                      date={item.description}
                      distance={"100 kilometers away"}
                      price={"₱" + item.price}
                      imageKey={item.images}
                      dayTime={item.price.isNight ? "Night" : ""}
                      ratings={item.ratings}
                      isHearted={
                        item.wishes.filter(
                          (value: any) => value.userId === userId
                        ).length !== 0
                      }
                    />
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant={"h1"} fontWeight={"semibold"}>
                  Travel
                </Typography>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 mx-auto w-full justify-center">
                  {data?.items?.map((item: any) => (
                    <Listing
                      key={item.id}
                      listingId={item.id}
                      location={item.address}
                      date={item.description}
                      distance={"100 kilometers away"}
                      price={"₱" + item.price}
                      imageKey={item.images}
                      dayTime={item.price.isNight ? "Night" : ""}
                      ratings={item.ratings}
                      isHearted={
                        item.wishes.filter(
                          (value: any) => value.userId === userId
                        ).length !== 0
                      }
                    />
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant={"h1"} fontWeight={"semibold"}>
                  Restaurant
                </Typography>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 mx-auto w-full justify-center">
                  {data?.items?.map((item: any) => (
                    <Listing
                      key={item.id}
                      listingId={item.id}
                      location={item.address}
                      date={item.description}
                      distance={"100 kilometers away"}
                      price={"₱" + item.price}
                      imageKey={item.images}
                      dayTime={item.price.isNight ? "Night" : ""}
                      ratings={item.ratings}
                      isHearted={
                        item.wishes.filter(
                          (value: any) => value.userId === userId
                        ).length !== 0
                      }
                    />
                  ))}
                </ul>
              </div>
              <div className="mt-20">
                <TravelStyleSlider
                  title="What's your travel style?"
                  description="Browse by property type to find the perfect space"
                  groupCards={groupCardsDummy}
                />
              </div>
            </div>
          )} */}
      </WidthWrapper>
    </>
  )
}

export default LandingPage

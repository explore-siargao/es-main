"use client"
import React, { useEffect, useState } from "react"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import useGetAllBookings from "../LandingPage/hooks/useGetAllBookings"
import useSessionStore from "@/common/store/useSessionStore"
import useOptMessageStore from "@/common/store/useOptMessageStore"
import { useSearchStore } from "@/common/store/useSearchStore"
import { Typography } from "@/common/components/ui/Typography"
import { usePathname } from "next/navigation"
import TravelStyleSlider from "./components/TravelStyleSlider"
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
      imageKey: "/assets/1.jpg",
      cardTitle: "Hostels",
      url: "/",
    },
    {
      imageKey: "/assets/2.jpg",
      cardTitle: "Resorts",
      url: "/",
    },
    {
      imageKey: "/assets/3.jpg",
      cardTitle: "Villas",
      url: "/",
    },
    {
      imageKey: "/assets/4.jpg",
      cardTitle: "Hotels",
      url: "/",
    },
    {
      imageKey: "/assets/4.jpg",
      cardTitle: "Hostels",
      url: "/",
    },
    {
      imageKey: "/assets/2.jpg",
      cardTitle: "Resorts",
      url: "/",
    },
    {
      imageKey: "/assets/1.jpg",
      cardTitle: "Villas",
      url: "/",
    },
    {
      imageKey: "/assets/3.jpg",
      cardTitle: "Islands",
      url: "/",
    },
    {
      imageKey: "/assets/2.jpg",
      cardTitle: "Islands",
      url: "/",
    },
    {
      imageKey: "/assets/3.jpg",
      cardTitle: "Islands",
      url: "/",
    },
  ]
  const groupCardsDummy = [
    {
      imageKey: il1,
      mainPlace: "Anajawan",
      subPlace: "General Luna",
    },
    {
      imageKey: il2,
      mainPlace: "Cabitoonan",
      subPlace: "General Luna",
    },
    {
      imageKey: il3,
      mainPlace: "Catangnan",
      subPlace: "General Luna",
    },
    {
      imageKey: il4,
      mainPlace: "Consuelo",
      subPlace: "General Luna",
    },
    {
      imageKey: il5,
      mainPlace: "Corazon",
      subPlace: "General Luna",
    },
    {
      imageKey: il6,
      mainPlace: "Daku",
      subPlace: "General Luna",
    },
    {
      imageKey: il7,
      mainPlace: "La Januza",
      subPlace: "General Luna",
    },
    {
      imageKey: il8,
      mainPlace: "Libertad",
      subPlace: "General Luna",
    },
    {
      imageKey: il9,
      mainPlace: "Magsaysay",
      subPlace: "General Luna",
    },
    {
      imageKey: il10,
      mainPlace: "Malinao",
      subPlace: "General Luna",
    },
    {
      imageKey: il11,
      mainPlace: "Santa Fe",
      subPlace: "General Luna",
    },
    {
      imageKey: il12,
      mainPlace: "Suyangan",
      subPlace: "General Luna",
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
          <TravelStyleSlider
            title={"What's your travel style?"}
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
        <div className="sm:mt-10 space-y-12 pl-5">
          <div>
            <Typography variant="h2" fontWeight="semibold">
              Looking for something to do in Siargao?
            </Typography>
            <Typography variant="h4">
              We've partnered the islands for tour and activity providers.
            </Typography>
          </div>
          <div>
            <Typography variant="h2" fontWeight="semibold">
              Reliable cars, motorbikes and more
            </Typography>
            <Typography variant="h4">
              Take the road, let's travel with one of our trusted rental
              partners.
            </Typography>
          </div>
          <div>
            <Typography variant="h2" fontWeight="semibold">
              Inspiration for your trip
            </Typography>
            <Typography variant="h4">
              Let us help you make the most out of your time in Siargao island
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10 md:gap-4 p-4 sm:mt-10">
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
      {/* )} */}
    </>
  )
}

export default LandingPage

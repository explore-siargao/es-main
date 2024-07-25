"use client"
import React, { useEffect, useState } from "react"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import useGetAllBookings from "../LandingPage/hooks/useGetAllBookings"
import { Spinner } from "@/common/components/ui/Spinner"
import useSessionStore from "@/common/store/useSessionStore"
import Listing from "../Listing"
import useOptMessageStore from "@/common/store/useOptMessageStore"
import { useSearchStore } from "@/common/store/useSearchStore"
import { Typography } from "@/common/components/ui/Typography"
import { usePathname } from "next/navigation"
import ImageTextCard from "./components/ImageTextCard"
import airport from "../../public/airport.jpg"
import image1 from "../../public/image1.jpg"
import surf from "../../public/surf.jpg"

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

  return (
    <>
      {isPending || isLoading ? (
        <Spinner variant="primary" middle />
      ) : (
        <WidthWrapper className="mb-24 lg:mt-6">
          {search || checkIn || checkOut || numberOfGuest ? (
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

              <div className="sm:flex w-full items-center sm:mt-8">
                <div className="sm:flex w-full gap-8 justify-center space-y-8 sm:space-y-0">
                  <div className="flex-shrink-0">
                    <ImageTextCard
                      imageKey={image1}
                      title={"Restaurants, cafes & bars"}
                      description={
                        "Whether you're here to drink or dine, are a foodie or a newbie, Siargao's multicultural restaurants, cafes and bars will indulge your senses."
                      }
                      linkTitle={"View foodie guide"}
                      url={"/"}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <ImageTextCard
                      imageKey={surf}
                      title={"Surfing in Siargao"}
                      description={
                        "Make the most out of your surfing vacation. Browse our comprehensive surf guide, check live surf forecasts and connect with local instructors."
                      }
                      linkTitle={"Check the best surf spots"}
                      url={"/"}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <ImageTextCard
                      imageKey={airport}
                      title={"Getting to the island"}
                      description={
                        "Borders are finally open and we've done our research so you don't have to. Discover the fastest route to Siargao, travel requirements and much more."
                      }
                      linkTitle={"Essential travel info"}
                      url={"/"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </WidthWrapper>
      )}
    </>
  )
}

export default LandingPage

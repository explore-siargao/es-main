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
import TravelSlider from "./components/TravelSlider"

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

  const groupCardsDummy = [
    {
      imageKey: il1,
      mainPlace: "General Luna",
      subPlace: "Town Centre",
    },
    {
      imageKey: il2,
      mainPlace: "Catangnan",
      subPlace: "General Luna",
    },
    {
      imageKey: il3,
      mainPlace: "Malinao",
      subPlace: "General Luna",
    },
    {
      imageKey: il4,
      mainPlace: "Pacifico",
      subPlace: "North Siargao",
    },
    {
      imageKey: il5,
      mainPlace: "Islands",
      subPlace: "Popular Trips",
    },
    {
      imageKey: il6,
      mainPlace: "General Luna",
      subPlace: "Town Centre",
    },
    {
      imageKey: il7,
      mainPlace: "Catangnan",
      subPlace: "General Luna",
    },
    {
      imageKey: il8,
      mainPlace: "Malinao",
      subPlace: "General Luna",
    },
    {
      imageKey: il9,
      mainPlace: "Pacifico",
      subPlace: "North Siargao",
    },
    {
      imageKey: il10,
      mainPlace: "Islands",
      subPlace: "Popular Trips",
    },
    {
      imageKey: il11,
      mainPlace: "General Luna",
      subPlace: "Popular Trips",
    },
    {
      imageKey: il12,
      mainPlace: "Islands",
      subPlace: "Popular Trips",
    },
  ]

  return (
    <>
      {/* {isPending || isLoading ? (
        <Spinner variant="primary" middle />
      ) : ( */}
      <WidthWrapper className="mb-24 lg:mt-6">
        <div className="w-full mb-20">
          <TravelSlider
            title="Explore Siargao Island"
            description="Essential travel information for your island vacation"
            groupCards={groupCardsDummy}
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
            </div>
          )} */}
      </WidthWrapper>
      {/* )} */}
    </>
  )
}

export default LandingPage

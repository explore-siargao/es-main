"use client"
import React, { useEffect } from "react"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import useGetAllBookings from "../LandingPage/hooks/useGetAllBookings"
import { Spinner } from "@/common/components/ui/Spinner"
import useSessionStore from "@/common/store/useSessionStore"
import Listing from "../Listing"
import useOptMessageStore from "@/common/store/useOptMessageStore"

const LandingPage = () => {
  const userId = useSessionStore((state) => state).id
  const setIsOpen = useOptMessageStore((state) => state.setIsOpen)
  const { data, isPending } = useGetAllBookings()
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
      id: "Test1"
    },
    {
      id: "Test2"
    }
  ];
  const formData = new FormData();
  items.forEach(element => {
    formData.append("item[]", element.id)
  });
  formData.forEach((value,key) => {
    console.log('key', key)
    console.log('value', value)
  });

  return (
    <>
      {isPending ? (
        <Spinner variant="primary" middle />
      ) : (
        <WidthWrapper className="my-24 lg:my-36">
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
                  item.wishes.filter((value: any) => value.userId === userId)
                    .length !== 0
                }
              />
            ))}
          </ul>
        </WidthWrapper>
      )}
    </>
  )
}

export default LandingPage

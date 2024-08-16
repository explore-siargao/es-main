"use client"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LINK_LOGIN } from "@/common/constants/links"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import ApplyToHostModal from "../../module/LandingPage/components/ApplyToHostModal"
import useSessionStore from "@/common/store/useSessionStore"
import { Button } from "./ui/Button"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchStore } from "../store/useSearchStore"
import PropertySearchBar from "./SearchBar/PropertySearchBar"
import ActivitiesSearchBar from "./SearchBar/ActivitiesSearchBar"
import RentalsSearchBar from "./SearchBar/RentalsSearchBar"
import { Typography } from "./ui/Typography"

type T_Search_Form = {
  search: string
  checkIn: string
  checkOut: string
  date: string
  numberOfGuest: number
}

function SearchBar({
  contentWidth = "wide",
  isFixed = true,
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
  isFixed?: boolean
}) {
  const session = useSessionStore((state) => state)
  const path = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""

  const form = useForm<T_Search_Form>()
  const { setSearchValues, clearSearchValues } = useSearchStore()

  useEffect(() => {
    form.reset()
    clearSearchValues()
  }, [path])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)
  const applyToHost = () => {
    if (!session.id) {
      router.push(LINK_LOGIN)
    } else {
      setIsModalOpen(true)
    }
  }

  const onSubmit = (data: T_Search_Form) => {
    setSearchValues(
      data.search,
      data.checkIn,
      data.checkOut,
      data.date,
      Number(data.numberOfGuest)
    )
  }

  const [pageProperty, setPageProperty] = useState(1)

  useEffect(() => {
    if (category === "property") {
      setPageProperty(1)
    } else if (category === "activities") {
      setPageProperty(2)
    } else if (category === "rentals") {
      setPageProperty(3)
    }
  }, [category])

  return (
    <div
      className={`w-full mt-28 h-96 z-20 flex flex-col items-center bg-[url('/search-bar-image-4.png')] bg-cover bg-no-repeat bg-center 
            before:content-[''] 
            before:absolute before:inset-0 
            before:block before:bg-gradient-to-b 
            before:from-gray-700 before:to-gray-900 
            before:opacity-30 before:z-[-5] relative`}
    >
      <WidthWrapper width="medium">
        <Typography
          className="text-white text-6xl mt-36 mb-[74px] ml-40"
          fontWeight="bold"
        >
          Find your island vibe
        </Typography>
      </WidthWrapper>
      <WidthWrapper
        width={path === "/" && category === "" ? "small" : "medium"}
      >
        <nav
          className="flex items-center justify-center py-2 my-2 w-full"
          aria-label="Global"
        >
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-8 rounded-full">
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  router.push("/listings?category=property")
                }}
                className={`${category === "property" ? "font-bold underline" : ""} text-white hover:text-gray-300 px-0`}
              >
                Places to stay
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  router.push("/listings?category=activities")
                }}
                className={`${category === "activities" ? "font-bold underline" : ""} text-white hover:text-gray-300 px-0`}
              >
                Activities
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  router.push("/listings?category=rentals")
                }}
                className={`${category === "rentals" ? "font-bold underline" : ""} text-white hover:text-gray-300 px-0`}
              >
                Rentals
              </Button>
            </div>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {pageProperty === 1 && <PropertySearchBar />}
                {pageProperty === 2 && <ActivitiesSearchBar />}
                {pageProperty === 3 && <RentalsSearchBar />}
              </form>
            </FormProvider>
          </div>
        </nav>
      </WidthWrapper>
      <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default SearchBar

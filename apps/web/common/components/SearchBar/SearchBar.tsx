"use client"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import useSessionStore from "@/common/store/useSessionStore"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchStore } from "@/common/store/useSearchStore"
import { Typography } from "../ui/Typography"
import { Button } from "../ui/Button"
import PropertySearchBar from "./PropertySearchBar"
import ActivitiesSearchBar from "./ActivitiesSearchBar"
import RentalsSearchBar from "./RentalsSearchBar"

type T_Search_Form = {
  search: string
  checkIn: string
  checkOut: string
  date: string
  numberOfGuest: number
}

function SearchBarNoHero({
  contentWidth,
  isFixed = true,
  customClass,
}: {
  contentWidth: "medium" | "small" | "wide" | "full"
  isFixed?: boolean
  customClass?: string
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
    <WidthWrapper width={contentWidth} className={customClass}>
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
              className={`${category === "property" ? "font-bold underline" : ""} hover:text-gray-300 px-0`}
            >
              Places to stay
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                router.push("/listings?category=activities")
              }}
              className={`${category === "activities" ? "font-bold underline" : ""} hover:text-gray-300 px-0`}
            >
              Activities
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                router.push("/listings?category=rentals")
              }}
              className={`${category === "rentals" ? "font-bold underline" : ""} hover:text-gray-300 px-0`}
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
  )
}

export default SearchBarNoHero

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

function SearchBar({
  contentWidth,
  isFixed = true,
  customClass,
  searchBarWidth,
}: {
  contentWidth: "medium" | "small" | "wide" | "full"
  isFixed?: boolean
  customClass?: string
  searchBarWidth?: string
}) {
  const session = useSessionStore((state) => state)
  const path = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""

  const routeNames = path.split("/")
  const [firstRoute, secondRoute] = routeNames.slice(1, 3)

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
    <WidthWrapper
      width={contentWidth}
      className={`${customClass} ${firstRoute === "guide" && secondRoute !== "surf" && "hidden"}`}
    >
      <nav
        className={`flex items-center justify-center py-2 my-2 ${searchBarWidth ? searchBarWidth : "w-full"}`}
        aria-label="Global"
      >
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-8 rounded-full ml-0.5">
            <Button
              variant="link"
              size="sm"
              onClick={() => setPageProperty(1)}
              className={`${pageProperty === 1 ? "font-bold underline" : ""} hover:text-gray-300 px-0`}
            >
              Places to stay
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => setPageProperty(2)}
              className={`${pageProperty === 2 ? "font-bold underline" : ""} hover:text-gray-300 px-0`}
            >
              Activities
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => setPageProperty(3)}
              className={`${pageProperty === 3 ? "font-bold underline" : ""} hover:text-gray-300 px-0`}
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

export default SearchBar

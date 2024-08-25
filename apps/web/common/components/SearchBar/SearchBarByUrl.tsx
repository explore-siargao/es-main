"use client"
import React, { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchStore } from "@/common/store/useSearchStore"
import PropertySearchBar from "./PropertySearchBar"
import ActivitiesSearchBar from "./ActivitiesSearchBar"
import RentalsSearchBar from "./RentalsSearchBar"
import Link from "next/link"
import { E_Listing_Category } from "@repo/contract"

type T_Search_Form = {
  search: string
  checkIn: string
  checkOut: string
  date: string
  numberOfGuest: number
}

function SearchBarByUrl({
  contentWidth,
  customClass,
  searchBarWidth,
}: {
  contentWidth: "medium" | "small" | "wide" | "full"
  customClass?: string
  searchBarWidth?: string
}) {
  const propertyEnum = E_Listing_Category.Property;
  const activityEnum = E_Listing_Category.Activity;
  const rentalEnum = E_Listing_Category.Rental;
  const pathname = usePathname();
  const path = usePathname()
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

  return (
    <WidthWrapper
      width={contentWidth}
      className={`${customClass} ${firstRoute === "guide" && secondRoute !== "surf" && "hidden"}`}
    >
      <nav
        className={`flex items-center justify-center pt-4 pb-2 mb-2 mt-4 ${searchBarWidth ? searchBarWidth : "w-full"}`}
        aria-label="Global"
      >
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-8 rounded-full">
            <Link
              href={`/search?category=${propertyEnum}`}
              className={`${pathname === "/search" && category === propertyEnum ? "font-bold underline underline-offset-4" : ""} hover:text-secondary-500 transition px-0 text-md`}
            >
              Places to stay
            </Link>
            <Link
              href={`/search?category=${activityEnum}`}
              className={`${pathname === "/search" && category === activityEnum ? "font-bold underline underline-offset-4" : ""} hover:text-secondary-500 transition px-0 text-md`}
            >
              Activities
            </Link>
            <Link
              href={`/search?category=${rentalEnum}`}
              className={`${pathname === "/search" && category === rentalEnum ? "font-bold underline underline-offset-4" : ""} hover:text-secondary-500 transition px-0 text-md`}
            >
              Rentals
            </Link>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {category !== activityEnum && category !== rentalEnum ? <PropertySearchBar /> : null}
              {category === activityEnum && <ActivitiesSearchBar />}
              {category === rentalEnum && <RentalsSearchBar />}
            </form>
          </FormProvider>
        </div>
      </nav>
    </WidthWrapper>
  )
}

export default SearchBarByUrl

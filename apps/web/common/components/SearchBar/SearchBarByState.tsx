"use client"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchStore } from "../../store/useSearchStore"
import PropertySearchBar from "./PropertySearchBar"
import ActivitiesSearchBar from "./ActivitiesSearchBar"
import RentalsSearchBar from "./RentalsSearchBar"
import { E_Listing_Category, E_Rental_Category } from "@repo/contract"
import NavigationByState from "./NavigationByState"
import { cn } from "@/common/helpers/cn"

type T_Search_Form = {
  location: string
  checkIn: string
  checkOut: string
  date: string
  numberOfGuest: number
  rentalCategory: E_Rental_Category
  pickUpDate: string
  dropOffDate: string
}

const propertyEnum = E_Listing_Category.Property
const activityEnum = E_Listing_Category.Activity
const rentalEnum = E_Listing_Category.Rental

const SearchBarByState = ({
  isNavCenter = false,
  isDark = false,
}: {
  isNavCenter?: boolean
  isDark?: boolean
}) => {
  const router = useRouter()
  const path = usePathname()
  const [category, setCategory] = useState<E_Listing_Category>(propertyEnum)

  const form = useForm<T_Search_Form>()
  const { setSearchValues, clearSearchValues } = useSearchStore()

  useEffect(() => {
    form.reset()
    clearSearchValues()
  }, [path])

  const onSubmit = (data: T_Search_Form) => {
    setSearchValues(
      data.location,
      data.checkIn,
      data.checkOut,
      data.date,
      Number(data.numberOfGuest)
    )
    if (
      category === E_Listing_Category.Property &&
      data.location &&
      data.checkIn &&
      data.checkOut &&
      data.numberOfGuest
    ) {
      router.push(
        `/search/properties?category=${category}&location=${data.location}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&numberOfGuest=${Number(data.numberOfGuest)}`
      )
    } else if (
      category === E_Listing_Category.Activity &&
      data.date &&
      data.numberOfGuest
    ) {
      router.push(
        `/search/activities?category=${category}&date=${data.date}&numberOfGuest=${Number(data.numberOfGuest)}`
      )
    } else if (
      category === E_Listing_Category.Rental &&
      data.rentalCategory &&
      data.pickUpDate &&
      data.dropOffDate
    ) {
      router.push(
        `/search/rentals?category=${category}&rentalCategory=${data.rentalCategory}&pickUpDate=${data.pickUpDate}&dropOffDate=${data.dropOffDate}`
      )
    }
  }

  return (
    <div>
      <div
        className={cn(
          `space-x-8 flex mb-3`,
          isNavCenter ? "justify-center" : "ml-2"
        )}
      >
        <NavigationByState
          category={category}
          setCategory={setCategory}
          isDark={isDark}
        />
      </div>
      <div className="drop-shadow-lg w-[65rem]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {category !== activityEnum && category !== rentalEnum ? (
              <PropertySearchBar />
            ) : null}
            {category === activityEnum && <ActivitiesSearchBar />}
            {category === rentalEnum && <RentalsSearchBar />}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default SearchBarByState

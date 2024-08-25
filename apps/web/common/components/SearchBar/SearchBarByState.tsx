"use client"
import React, { useEffect, useState } from "react"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchStore } from "@/common/store/useSearchStore"
import PropertySearchBar from "./PropertySearchBar"
import ActivitiesSearchBar from "./ActivitiesSearchBar"
import RentalsSearchBar from "./RentalsSearchBar"
import { E_Listing_Category } from "@repo/contract"
import CategoryButtonsByState from "./CategoryButtonsByState"

type T_Search_Form = {
  search: string
  checkIn: string
  checkOut: string
  date: string
  numberOfGuest: number
}

const propertyEnum = E_Listing_Category.Property;
const activityEnum = E_Listing_Category.Activity;
const rentalEnum = E_Listing_Category.Rental;

function SearchBarByUrl({
  contentWidth,
  customClass,
  searchBarWidth,
}: {
  contentWidth: "medium" | "small" | "wide" | "full"
  customClass?: string
  searchBarWidth?: string
}) {
  const [category, setCategory] = useState<E_Listing_Category>(propertyEnum);

  const form = useForm<T_Search_Form>()
  const { setSearchValues, clearSearchValues } = useSearchStore()

  useEffect(() => {
    form.reset()
    clearSearchValues()
  }, [category])

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
      className={`${customClass}`}
    >
      <nav
        className={`flex items-center justify-center py-2 mb-2 mt-4 ${searchBarWidth ? searchBarWidth : "w-full"}`}
        aria-label="Global"
      >
        <div className="flex flex-col w-full gap-3">
          <div className="flex gap-8 rounded-full">
            <CategoryButtonsByState
              category={category}
              setCategory={setCategory}
            />
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

"use client"
import React, { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { T_Search, useSearchStore } from "../../store/useSearchStore"
import PropertySearchBar from "./PropertySearchBar"
import ActivitiesSearchBar from "./ActivitiesSearchBar"
import RentalsSearchBar from "./RentalsSearchBar"
import NavigationByState from "./NavigationByState"
import { cn } from "@/common/helpers/cn"
import { LINK_SEARCH_ACTIVITIES, LINK_SEARCH_PROPERTY, LINK_SEARCH_RENTAL } from "@/common/constants"

const SearchBarByState = ({
  isNavCenter = false,
  isDark = false,
}: {
  isNavCenter?: boolean
  isDark?: boolean
}) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const location = searchParams.get('location')
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const date = searchParams.get('date')
  const numberOfGuest = searchParams.get('numberOfGuest')
  const vehicleType = (searchParams.get('vehicleType') ?? "")?.split(',')
  const pickUpDate = searchParams.get('pickUpDate')
  const dropOffDate = searchParams.get('dropOffDate')
  const { pathCategory, setPathCategory } = useSearchStore(state => state);

  useEffect(() => {
    setPathCategory(path === `/` ? LINK_SEARCH_PROPERTY : path)
  }, [])

  const form = useForm<T_Search>({
    values: {
      location: location ? location : "any",
      checkIn,
      checkOut,
      date,
      numberOfGuest: Number(numberOfGuest ?? 1),
      vehicleType: vehicleType[0],
      pickUpDate,
      dropOffDate
    }
  })

  const onSubmit = ({
    location,
    checkIn,
    checkOut,
    date,
    numberOfGuest,
    vehicleType,
    pickUpDate,
    dropOffDate
  }: T_Search) => {
    if (
      pathCategory === LINK_SEARCH_PROPERTY &&
      location &&
      checkIn &&
      checkOut &&
      numberOfGuest
    ) {
      router.push(
        `/search/properties?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&numberOfGuest=${Number(numberOfGuest)}`
      )
    } else if (
      pathCategory === LINK_SEARCH_ACTIVITIES &&
      date &&
      numberOfGuest
    ) {
      router.push(
        `/search/activities?location=${location}&date=${date}&numberOfGuest=${Number(numberOfGuest)}`
      )
    } else if (
      pathCategory === LINK_SEARCH_RENTAL &&
      vehicleType &&
      pickUpDate &&
      dropOffDate
    ) {
      router.push(
        `/search/rentals?location=${location}&vehicleType=${vehicleType}&pickUpDate=${pickUpDate}&dropOffDate=${dropOffDate}`
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
          pathCategory={pathCategory as string}
          setPathCategory={setPathCategory}
          isDark={isDark}
        />
      </div>
      <div className="drop-shadow-lg w-[65rem]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {pathCategory !== LINK_SEARCH_ACTIVITIES && pathCategory !== LINK_SEARCH_RENTAL ? (
              <PropertySearchBar />
            ) : null}
            {pathCategory === LINK_SEARCH_ACTIVITIES && <ActivitiesSearchBar />}
            {pathCategory === LINK_SEARCH_RENTAL && <RentalsSearchBar />}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default SearchBarByState

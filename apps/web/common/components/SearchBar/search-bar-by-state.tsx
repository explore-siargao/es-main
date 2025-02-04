"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { T_Search, useSearchStore } from "../../store/useSearchStore"
import PropertySearchBar from "./PropertySearchBar"
import ActivitiesSearchBar from "./ActivitiesSearchBar"
import RentalsSearchBar from "./RentalsSearchBar"
import NavigationByState from "./NavigationByState"
import { cn } from "@/common/helpers/cn"
import {
  LINK_SEARCH_ACTIVITIES,
  LINK_SEARCH_PROPERTY,
  LINK_SEARCH_RENTAL,
} from "@/common/constants"
import {
  buildActivitySearchURL,
  buildPropertySearchURL,
  buildRentalSearchURL,
} from "./helpers"

const SearchBarByState = ({
  isNavCenter = false,
  isDark = false,
}: {
  isNavCenter?: boolean
  isDark?: boolean
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get("page")
  const location = searchParams.get("location")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const activityDate = searchParams.get("activityDate")
  const numberOfGuest = searchParams.get("numberOfGuest")
  const vehicleType = (searchParams.get("vehicleTypes") ?? "")?.split(",")
  const pickUpDate = searchParams.get("pickUpDate")
  const dropOffDate = searchParams.get("dropOffDate")
  const { pathCategory, setPathCategory } = useSearchStore((state) => state)

  const form = useForm<T_Search>({
    values: {
      location: location ? location : "any",
      checkIn: checkIn === "any" ? "" : checkIn,
      checkOut: checkOut === "any" ? "" : checkOut,
      activityDate: activityDate === "any" ? "" : activityDate,
      numberOfGuest: numberOfGuest === "any" ? "" : numberOfGuest,
      vehicleType: vehicleType[0],
      pickUpDate: pickUpDate === "any" ? "" : pickUpDate,
      dropOffDate: dropOffDate === "any" ? "" : dropOffDate,
    },
  })

  const onSubmit = ({
    location,
    checkIn,
    checkOut,
    activityDate,
    numberOfGuest,
    vehicleType,
    pickUpDate,
    dropOffDate,
  }: T_Search) => {
    if (pathCategory?.includes(LINK_SEARCH_PROPERTY) && location) {
      router.push(
        buildPropertySearchURL({
          page: page ? page : "1",
          location,
          checkIn: checkIn ?? "any",
          checkOut: checkOut ?? "any",
          numberOfGuest: numberOfGuest ?? "any",
        })
      )
    } else if (pathCategory?.includes(LINK_SEARCH_ACTIVITIES) && location) {
      router.push(
        buildActivitySearchURL({
          page: page ? page : "1",
          location,
          activityDate: activityDate ?? "any",
          numberOfGuest: numberOfGuest ?? "any",
        })
      )
    } else if (pathCategory?.includes(LINK_SEARCH_RENTAL) && location) {
      router.push(
        buildRentalSearchURL({
          page: page ? page : "1",
          location,
          vehicleType: vehicleType ?? "any",
          pickUpDate: pickUpDate ?? "any",
          dropOffDate: dropOffDate ?? "any",
        })
      )
    }
  }

  return (
    <div className="flex-1 -mt-11 pb-3">
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
      <div className="flex justify-center drop-shadow-lg">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {pathCategory !== LINK_SEARCH_ACTIVITIES &&
            pathCategory !== LINK_SEARCH_RENTAL ? (
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

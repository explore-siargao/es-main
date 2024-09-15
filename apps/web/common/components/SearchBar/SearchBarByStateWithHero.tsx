"use client"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import ApplyToHostModal from "../../../module/LandingPage/components/ApplyToHostModal"
import { useForm } from "react-hook-form"
import { useSearchStore } from "../../store/useSearchStore"
import { Typography } from "../ui/Typography"
import { E_Listing_Category } from "@repo/contract"
import SearchBarByState from "./SearchBarByState"

type T_Search_Form = {
  search: string
  checkIn: string
  checkOut: string
  date: string
  numberOfGuest: number
}

const propertyEnum = E_Listing_Category.Property
const activityEnum = E_Listing_Category.Activity
const rentalEnum = E_Listing_Category.Rental

function SearchBarByStateWithHero() {
  const path = usePathname()
  const [category, setCategory] = useState<E_Listing_Category>(propertyEnum)

  const form = useForm<T_Search_Form>()
  const { setSearchValues, clearSearchValues } = useSearchStore()

  useEffect(() => {
    form.reset()
    clearSearchValues()
  }, [path])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)

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
    if (category === propertyEnum) {
      setPageProperty(1)
    } else if (category === activityEnum) {
      setPageProperty(2)
    } else if (category === rentalEnum) {
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
      <WidthWrapper width="small" className="mt-6">
        <SearchBarByState isDark />
      </WidthWrapper>
      <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default SearchBarByStateWithHero

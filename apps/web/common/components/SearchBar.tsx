"use client"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LINK_LOGIN } from "@/common/constants/links"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { cn } from "@/common/helpers/cn"
import ApplyToHostModal from "../../module/LandingPage/components/ApplyToHostModal"
import useSessionStore from "@/common/store/useSessionStore"
import { Button } from "./ui/Button"
import { FormProvider, useForm } from "react-hook-form"

import { useSearchStore } from "../store/useSearchStore"
import PropertySearchBar from "./SearchBar/PropertySearchBar"
import ActivitiesSearchBar from "./SearchBar/ActivitiesSearchBar"
import RentalsSearchBar from "./SearchBar/RentalsSearchBar"

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

  return (
    <header
      className={cn(
        `w-full inset-x-0 top-[118px] z-50 bg-gray-100 flex flex-col items-center`,
        isFixed && "fixed"
      )}
    >
      <WidthWrapper width={contentWidth}>
        <nav
          className="flex items-center justify-between py-2 my-2 w-full"
          aria-label="Global"
        >
          <div className="flex flex-col gap-4 mx-auto">
            <div className="flex gap-2 rounded-full items-center px-2 py-1 mx-auto">
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push("/")}
                className={path === "/" ? "font-bold" : ""}
              >
                Property
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push("/activities")}
                className={path === "/activities" ? "font-bold" : ""}
              >
                Activities
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push("/rentals")}
                className={path === "/rentals" ? "font-bold" : ""}
              >
                Rentals
              </Button>
            </div>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {path === "/" && <PropertySearchBar />}
                {path === "/activities" && <ActivitiesSearchBar />}
                {path === "/rentals" && <RentalsSearchBar />}
              </form>
            </FormProvider>
          </div>
        </nav>
        <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
      </WidthWrapper>
    </header>
  )
}

export default SearchBar

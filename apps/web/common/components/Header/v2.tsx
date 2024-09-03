"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Logo from "@/common/assets/logo.png"
import { Button } from "@/common/components/ui/Button"
import LoggedInUserDropdown from "./LoggedInUserDropdown"
import { APP_NAME } from "@repo/constants"
import { usePathname, useRouter } from "next/navigation"
import { LINK_HOME, LINK_LOGIN } from "@/common/constants"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import useSessionStore from "@/common/store/useSessionStore"
import { E_Listing_Category, E_UserRole } from "@repo/contract"
import GuidesMenu from "./GuidesMenu"
import ApplyToHostModal from "@/module/LandingPage/components/ApplyToHostModal"
import NavigationByState from "../SearchBar/NavigationByState"
import PropertySearchBar from "../SearchBar/PropertySearchBar"
import { FormProvider, useForm } from "react-hook-form"
import ActivitiesSearchBar from "../SearchBar/ActivitiesSearchBar"
import RentalsSearchBar from "../SearchBar/RentalsSearchBar"
import { useSearchStore } from "@/common/store/useSearchStore"

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

function Header({
  contentWidth = "medium",
  isFixed = true,
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
  isFixed?: boolean
}) {
  const session = useSessionStore((state) => state)
  const path = usePathname()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)
  const applyToHost = () => {
    if (!session.id) {
      router.push(LINK_LOGIN)
    } else {
      setIsModalOpen(true)
    }
  }

  const [category, setCategory] = useState<E_Listing_Category>(propertyEnum)

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
    <header
      className={cn(
        `w-full inset-x-0 top-0 z-50 bg-white border-y-gray-200/50 border flex flex-col items-center`,
        isFixed && "fixed"
      )}
    >
      <div className="min-w-full py-3 text-center bg-primary-50 sr-only md:not-sr-only">
        <Typography fontWeight={"light"} className="py-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. asds
        </Typography>
      </div>
      <WidthWrapper width={contentWidth}>
        <nav
          className="flex items-center justify-between py-2 my-2 w-full"
          aria-label="Global"
        >
          <Link
            href={LINK_HOME}
            className="-m-1.5 gap-2 flex lg:flex-1 items-center"
          >
            <Image
              className="h-12 w-auto"
              src={Logo}
              width={500}
              height={700}
              alt={APP_NAME}
            />
          </Link>
          <div className="space-x-8">
            <NavigationByState category={category} setCategory={setCategory} />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3 items-center relative">
            <div className="flex gap-2 rounded-full items-center px-2 py-1">
              <GuidesMenu />
              <div>
                {session.role !== E_UserRole.Admin &&
                !session.isHost &&
                !path.includes("/hosting") ? (
                  <Button variant="link" size="sm" onClick={applyToHost}>
                    Become a host
                  </Button>
                ) : null}
              </div>
              {!session.id && (
                <div className="flex gap-1 rounded-full items-center px-2 py-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(LINK_LOGIN)}
                  >
                    Login | Sign up
                  </Button>
                </div>
              )}
            </div>
            {session.id && <LoggedInUserDropdown />}
          </div>
        </nav>
        <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
      </WidthWrapper>
      <div className="drop-shadow mb-2 min-w-[912px]">
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
    </header>
  )
}

export default Header

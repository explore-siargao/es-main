"use client"
import React, { Fragment, useState } from "react"
import Image from "next/image"
import Logo from "@/common/assets/es-logo.png"
import { APP_NAME } from "@repo/constants"
import {
  LINK_ACCOUNT,
  LINK_CREATE_ACCOUNT,
  LINK_HOME,
  LINK_HOSTING_LISTINGS,
  LINK_LISTINGS_ACTIVITY,
  LINK_LISTINGS_PROPERTY,
  LINK_LISTINGS_RENTAL,
  LINK_LOGIN,
  LINK_LOGOUT,
} from "@/common/constants"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { cn } from "@/common/helpers/cn"
import { Popover, Transition } from "@headlessui/react"
import { LucideArrowLeft, LucideEye, LucidePlus } from "lucide-react"
import useSessionStore from "@/common/store/useSessionStore"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useParams } from "next/navigation"
import SelectListingTypeModal from "@/module/Hosting/Listings/components/modals/SelectListingTypeModal"
import useGetPropertyById from "@/module/Hosting/Listings/Properties/hooks/useGetPropertyById"
import { E_Listing_Category } from "@repo/contract"
import { E_Listing_Status } from "@/common/types/global"
import listingCategoryPluralMap from "@/common/helpers/listingCategoryPluralMap"
import transmissionAcronym from "@/module/Hosting/Listings/helpers/transmissionAcronym"
import useGetRentalById from "@/module/Hosting/Listings/hooks/useGetRentalById"
import useGetActivityById from "@/module/Hosting/Listings/Activities/hooks/useGetActivityById"

const unAuthMenus = [
  {
    name: "Log in",
    href: LINK_LOGIN,
  },
  {
    name: "Sign up",
    href: LINK_CREATE_ACCOUNT,
  },
]

const authMenus = [
  {
    name: "Settings",
    href: LINK_ACCOUNT,
  },
  {
    name: "Logout",
    href: LINK_LOGOUT,
  },
]

function ListingHeader({
  category,
  listingStatus = E_Listing_Status.edit,
  contentWidth = "wide",
  isFixed = true,
}: {
  readonly category: E_Listing_Category
  readonly listingStatus: E_Listing_Status
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
  readonly isFixed?: boolean
}) {
  const [isSelectListingTypeModalOpen, setIsSelectListingTypeModalOpen] =
    useState(false)
  const params = useParams<{ listingId: string }>()
  const session = useSessionStore()
  const ASSET_ROOT = "/assets"
  const listingId = String(params.listingId)
  const getListingHookMap = {
    [E_Listing_Category.Property]: useGetPropertyById,
    [E_Listing_Category.Activity]: useGetActivityById,
    [E_Listing_Category.Rental]: useGetRentalById,
  }
  const { data } = getListingHookMap[category](listingId)

  const renderTransition = (children: React.ReactNode) => (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      {children}
    </Transition>
  )

  const getHeaderListingName = () => {
    let listingName = ""
    if (
      category === E_Listing_Category.Property ||
      category === E_Listing_Category.Activity
    ) {
      listingName = data?.item?.title
    } else if (category === E_Listing_Category.Rental) {
      listingName = `${data?.item?.year} ${data?.item?.make} ${data?.item?.modelBadge} ${transmissionAcronym(data?.item?.transmission)}`
    }
    return listingName
  }

  return (
    <header
      className={cn(
        `w-full inset-x-0 top-0 z-50 bg-white border-y-gray-200/50 border flex flex-col`,
        isFixed && "fixed"
      )}
    >
      <WidthWrapper width={contentWidth}>
        <nav className="flex items-center py-2 w-full">
          <div className="flex gap-2 items-center">
            <Link href={LINK_HOME} className="">
              <Image
                className="h-10 w-auto"
                src={Logo}
                width={500}
                height={300}
                alt={APP_NAME}
              />
            </Link>
            <div className="col-span-2 flex gap-2 items-center">
              <Link
                href={`${LINK_HOSTING_LISTINGS}/${listingCategoryPluralMap[category].toLocaleLowerCase()}`}
                className="flex gap-2 px-2 items-center hover:bg-primary-100"
              >
                <LucideArrowLeft className="h-4 w-4" />
                <Typography>Hosting Account</Typography>
              </Link>
              <span className="text-gray-400">/</span>
              <Typography className="px-2">
                {listingStatus === E_Listing_Status.edit
                  ? getHeaderListingName()
                  : `Setup new listing (${category})`}
              </Typography>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3 gap-3 items-center relative">
            {data?.item?.status === "Pending" && (
              <Link
                href={`${category === "Activity" ? LINK_LISTINGS_ACTIVITY : category === "Rental" ? LINK_LISTINGS_RENTAL : LINK_LISTINGS_PROPERTY}/${listingId}`}
                target="_blank"
              >
                <Button variant="secondary" size="sm" className="flex gap-2">
                  <LucideEye className="h-4 w-4" /> Preview listing
                </Button>
              </Link>
            )}

            {listingStatus === E_Listing_Status.edit && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsSelectListingTypeModalOpen(true)}
                className="flex gap-2"
              >
                <LucidePlus className="h-4 w-4" /> New listing
              </Button>
            )}
            {session.id && (
              <Popover className="relative">
                <Popover.Button className="flex items-center px-2 py-1 focus:outline-none">
                  <div className="w-4 h-6 overflow-hidden">
                    <Image
                      src={`${ASSET_ROOT}/1.jpg`}
                      fill
                      alt="Profile"
                      className="rounded-full object-cover"
                    />
                  </div>
                </Popover.Button>
                {renderTransition(
                  <Popover.Panel className="absolute right-0 top-5 z-10 mt-5 flex w-screen max-w-max">
                    <div className="w-screen max-w-[200px] flex-auto bg-white text-sm leading-6 border border-gray-200 shadow-sm ring-transparent rounded-md">
                      {[...(session.id ? authMenus : unAuthMenus)].map(
                        (item) => (
                          <div
                            key={item.name}
                            className="relative rounded hover:bg-gray-50 px-5 py-2"
                          >
                            <Popover.Button as="a" href={item.href}>
                              <div className="font-semibold text-gray-800">
                                {item.name}
                                <span className="absolute inset-0" />
                              </div>
                            </Popover.Button>
                          </div>
                        )
                      )}
                    </div>
                  </Popover.Panel>
                )}
              </Popover>
            )}
          </div>
        </nav>
        <SelectListingTypeModal
          isOpen={isSelectListingTypeModalOpen}
          onClose={() =>
            setIsSelectListingTypeModalOpen(!isSelectListingTypeModalOpen)
          }
        />
      </WidthWrapper>
    </header>
  )
}

export default ListingHeader

"use client"
import React, { Fragment, useState } from "react"
import Image from "next/image"
import Logo from "@/common/assets/es-logo.png"
import { APP_NAME } from "@repo/constants"
import {
  LINK_ACCOUNT,
  LINK_CREATE_ACCOUNT,
  LINK_HOME,
  LINK_LOGIN,
  LINK_LOGOUT,
} from "@/common/constants"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { cn } from "@/common/helpers/cn"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon, LucideCheck, LucidePlus } from "lucide-react"
import { WorkSpaceEnum, setWorkspace } from "@/common/helpers/workspace"
import useSessionStore from "@/common/store/useSessionStore"
import { Button } from "@/common/components/ui/Button"
import SelectListingTypeModal from "@/module/Hosting/Listings/components/modals/SelectListingTypeModal"
import { Typography } from "../ui/Typography"

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

const items = [
  {
    name: "Admin Account",
    href: "/admin/listings/properties",
    selected: false,
  },
  {
    name: "Guest Account",
    href: LINK_HOME,
    selected: false,
  },
]

function Header({
  contentWidth = "wide",
  isFixed = true,
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
  readonly isFixed?: boolean
}) {
  const session = useSessionStore()
  const ASSET_ROOT = "/assets"
  const current = "Admin Account"

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
  const [isSelectListingTypeModalOpen, setIsSelectListingTypeModalOpen] =
    useState(false)

  return (
    <header
      className={cn(
        `w-full inset-x-0 top-0 z-50 bg-white border-y-gray-200/50 border flex flex-col`,
        isFixed && "fixed"
      )}
    >
      <WidthWrapper width={contentWidth}>
        <nav className="flex items-center py-2 w-full">
          <div className="flex gap-3 items-center">
            <Link href="/hosting/today" className="">
              <Image
                className="h-10 w-auto"
                src={Logo}
                width={500}
                height={300}
                alt={APP_NAME}
              />
            </Link>
            <div>
              {session.id && (
                <Popover className="relative items-center justify-start">
                  <Popover.Button className="flex hover:bg-primary-200">
                    <div className="flex items-center px-2 gap-2">
                      <Typography>{current}</Typography>
                      <span className="ml-auto">
                        <ChevronDownIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </Popover.Button>
                  {renderTransition(
                    <Popover.Panel className="absolute left-0 top-4 z-10 mt-4 flex w-screen max-w-max">
                      <div className="max-w-sm bg-white flex flex-col text-sm leading-6 border border-gray-200 shadow-sm ring-transparent rounded-md">
                        {items.map((item) => (
                          <button
                            key={item.name}
                            className="relative rounded hover:bg-gray-50 px-5 py-2"
                            onClick={() => {
                              if (item.name === current) {
                                setWorkspace(WorkSpaceEnum.HOST)
                              } else if (item.name === "Guest Account") {
                                setWorkspace(WorkSpaceEnum.GUEST)
                              }
                            }}
                          >
                            <Popover.Button as="a" href={item.href}>
                              <div className="font-semibold text-gray-800">
                                <div className="flex gap-2 items-center">
                                  {item.name}
                                  {item.name === current && (
                                    <span className="ml-auto">
                                      <LucideCheck size={20} />
                                    </span>
                                  )}
                                </div>
                                <span className="absolute inset-0" />
                              </div>
                            </Popover.Button>
                          </button>
                        ))}
                      </div>
                    </Popover.Panel>
                  )}
                </Popover>
              )}
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3 gap-3 items-center relative">
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

export default Header

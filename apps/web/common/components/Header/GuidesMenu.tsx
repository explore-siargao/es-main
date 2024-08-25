"use client"
import React, { Fragment } from "react"
import { Popover, PopoverButton, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "lucide-react"

const GuidesMenu = () => {
  const authMenus = [
    {
      name: `Surfing`,
      href: `/guides/surfing`,
    },
    {
      name: "Restaurants",
      href: "/guides/restaurants",
    },
    {
      name: "Getting to know the Island",
      href: "/guides/islands",
    },
  ]
  return (
    <Popover className="relative px-1 hover:underline underline-offset-4">
      <PopoverButton className="flex gap-1 text-sm transition text-text-500">
        Guides
        <ChevronDownIcon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -right-10 top-6 z-10 mt-5 flex w-screen max-w-max">
          <div className="w-screen max-w-[220px] flex-auto bg-white text-sm leading-6 border border-gray-200 shadow-sm ring-transparent rounded-xl">
            {authMenus.map(
              (item) =>
                <div
                  key={item.name}
                  className="relative rounded-xl hover:bg-gray-50 px-5 py-2"
                >
                  <PopoverButton as="a" href={item.href}>
                    <div className="font-semibold text-gray-800">
                      {item.name}
                      <span className="absolute inset-0" />
                    </div>
                  </PopoverButton>
                </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default GuidesMenu

"use client"
import { LINK_ACCOUNT, LINK_ACCOUNT_WISHLIST, LINK_LOGOUT } from "@/common/constants/links"
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/20/solid"
import React, { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ACCOUNT, WISHLISTS } from "@/common/constants"
import useSessionStore from "@/common/store/useSessionStore"
import { usePathname } from "next/navigation"
import { E_UserRole } from "@repo/contract"

const LoggedInUserDropdown = () => {
  const path = usePathname()
  const session = useSessionStore((state) => state)
  const authMenus = [
    {
      name: "My bookings",
      href: "/bookings",
    },
    {
      name: WISHLISTS,
      href: LINK_ACCOUNT_WISHLIST,
    },
    {
      name: ACCOUNT,
      href: LINK_ACCOUNT,
    },
    {
      name: "Host account",
      href: "/hosting/today",
      isExcluded: !session.isHost || path.includes("/hosting"),
    },
    {
      name: "Administration",
      href: "/admin/dashboard",
      isExcluded: session.role !== E_UserRole.Admin || path.includes("/admin"),
    },
    {
      name: "Log out",
      href: LINK_LOGOUT,
    },
  ]
  return (
    <Popover className="relative">
      <Popover.Button className="flex gap-1 rounded-full border-text-50 border items-center focus:ring-gray-400 focus:border-gray-400 px-2 py-1">
        <Bars3Icon className="h-5 text-text-200" />
        <UserCircleIcon className="h-8 text-gray-400" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 top-9 z-10 mt-5 flex w-screen max-w-max">
          <div className="w-screen max-w-[200px] flex-auto bg-white text-sm leading-6 border border-gray-200 shadow-sm ring-transparent rounded-xl">
            {authMenus.map(
              (item) =>
                !item.isExcluded && (
                  <div
                    key={item.name}
                    className="relative rounded-xl hover:bg-gray-50 px-5 py-2"
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
      </Transition>
    </Popover>
  )
}

export default LoggedInUserDropdown

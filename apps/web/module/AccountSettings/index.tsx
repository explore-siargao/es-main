"use client"
import React from "react"
import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import { AccountMenuContainer } from "@/common/components/AccountMenuContainer"
import {
  LINK_ACCOUNT_BOOKING_REVIEWS,
  LINK_ACCOUNT_PAYMENT_PAYOUT,
  LINK_ACCOUNT_PERSONAL_INFO,
  LINK_ACCOUNT_WISHLIST,
  LINK_ACCOUNT_LOGIN_SECURITY,
  LINK_ACCOUNT_TAXES,
  LINK_ACCOUNT_GLOBAL_PREFERENCES,
  LINK_ACCOUNT_NOTIFICATIONS,
} from "@/common/constants"
import { Typography } from "@/common/components/ui/Typography"
import { capitalizeFirstLetter } from "@/common/helpers/capitalizeFirstLetter"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import useSessionStore from "@/common/store/useSessionStore"
import {
  Star,
  ShieldHalf,
  CreditCard,
  Heart,
  SquareUser,
  Settings2,
  File,
  Megaphone,
} from "lucide-react"
import { E_UserRole } from "@repo/contract"
import {
  PAYMENTS_PAYOUTS,
  PERSONAL_INFO,
  WISHLISTS,
  BOOKING_REVIEWS,
  LOGIN_SECURITY,
  NOTIFICATIONS,
  TAXES,
  GLOBAL_PREFERENCES,
} from "@/common/constants"

const AccountSettings = () => {
  const session = useSessionStore((state) => state)
  const firstName = session?.personalInfo?.firstName
  const lastName = session?.personalInfo?.lastName
  const email = session?.email

  const firstCharOnly =
    typeof firstName === "string" && firstName.length > 0
      ? String(firstName.charAt(0)).toUpperCase()
      : ""
  const uppercaseFirstChar = capitalizeFirstLetter(firstName as string)

  const pages = [
    {
      id: 1,
      icon: SquareUser,
      title: PERSONAL_INFO,
      content: "Labore est amet eiusmod proident.",
      link: LINK_ACCOUNT_PERSONAL_INFO,
      show: true,
    },
    {
      id: 2,
      icon: Heart,
      title: WISHLISTS,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_WISHLIST,
      show: session.role !== E_UserRole.Admin,
    },
    {
      id: 3,
      icon: CreditCard,
      title: PAYMENTS_PAYOUTS,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_PAYMENT_PAYOUT,
      show: session.role !== E_UserRole.Admin,
    },
    {
      id: 4,
      icon: Star,
      title: BOOKING_REVIEWS,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_BOOKING_REVIEWS,
      show: session.role !== E_UserRole.Admin,
    },
    {
      id: 5,
      icon: ShieldHalf,
      title: LOGIN_SECURITY,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_LOGIN_SECURITY,
      show: session.role !== E_UserRole.Admin,
    },
    {
      id: 6,
      icon: Megaphone,
      title: NOTIFICATIONS,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_NOTIFICATIONS,
      show: session.role !== E_UserRole.Admin,
    },
    {
      id: 7,
      icon: File,
      title: TAXES,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_TAXES,
      show: session.role === E_UserRole.Host,
    },
    {
      id: 8,
      icon: Settings2,
      title: GLOBAL_PREFERENCES,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: LINK_ACCOUNT_GLOBAL_PREFERENCES,
      show: session.role !== E_UserRole.Admin,
    },
  ]

  return (
    <AccountSettingWrapper>
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="text-4xl my-3.5 pb-5 md:pb-0"
      >
        Account
      </Typography>
      <div className="space-y-5">
        <div className="pb-5 border-b md:border-none">
          <div className="hidden md:block">
            <span className="font-semibold">{firstName + " " + lastName}</span>,
            {" " + email + " "}
            {session.role !== E_UserRole.Admin && (
              <>
                <span>•</span>{" "}
                <Link
                  href={`/profile/${session.id}`}
                  className="font-semibold underline underline-offset-2"
                >
                  Go to profile
                </Link>
              </>
            )}
          </div>
          <Link
            href={"#"}
            className="flex md:hidden justify-between items-center"
          >
            <div className="flex space-x-4">
              <div className="flex h-12 w-12 bg-primary-500 rounded-full items-center text-center">
                <Typography
                  className="w-full h-auto text-white"
                  fontWeight="semibold"
                >
                  {firstCharOnly}
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="h4">{uppercaseFirstChar} </Typography>
                <Typography fontWeight="light" className="mt-0 text-sm">
                  Show profile
                </Typography>
              </div>
            </div>
            <ChevronRightIcon className="h-5 w-auto" />
          </Link>
        </div>
        <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pages
            .filter((page) => page.show)
            .map((page) => (
              <AccountMenuContainer
                key={page.id}
                icon={<page.icon className="h-8 w-auto text-primary-700" />}
                title={page.title}
                content={page.content}
                link={String(page.link)}
              />
            ))}
        </div>
      </div>
    </AccountSettingWrapper>
  )
}

export default AccountSettings

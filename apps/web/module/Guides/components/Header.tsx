"use client"
import React, { useState } from "react"
import Image from "next/image"
import Logo from "@/common/assets/logo.png"
import { Button } from "@/common/components/ui/Button"
import LandingPageMenu from "@/common/components/ui/LandingPageMenu"
import { APP_NAME } from "@repo/constants"
import { usePathname, useRouter } from "next/navigation"
import { LINK_LOGIN } from "@/common/constants/links"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import useSessionStore from "@/common/store/useSessionStore"
import { E_UserRole } from "@repo/contract"
import ApplyToHostModal from "@/module/LandingPage/components/ApplyToHostModal"
import { Option, Select } from "@/common/components/ui/Select"
import GuideSelect from "./GuideSelect"
import { Input } from "@/common/components/ui/Input"
import GuideSearchBar from "./GuideSearchBar"

const GuideHeader = ({
  contentWidth = "wide",
  isFixed = true,
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
  isFixed?: boolean
}) => {
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
  return (
    <header
      className={cn(
        `w-full inset-x-0 top-0 z-50 bg-white border-y-gray-200/50 border flex flex-col items-center`,
        isFixed && "fixed"
      )}
    >
      <div className="min-w-full py-3 text-center bg-primary-50 sr-only md:not-sr-only">
        <Typography fontWeight={"light"} className="py-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </div>
      <WidthWrapper width={contentWidth}>
        <nav
          className="flex items-center justify-between py-2 my-2 w-full"
          aria-label="Global"
        >
          <Link href="/">
            <div className="-m-1.5 gap-2 flex lg:flex-1 items-center ">
              <Image
                className="h-12 w-auto"
                src={Logo}
                width={500}
                height={700}
                alt={APP_NAME}
              />
            </div>
          </Link>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3 items-center relative">
            <div className="flex gap-1 rounded-full items-center px-2 py-1">
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push(LINK_LOGIN)}
              >
                Become A Host
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push(LINK_LOGIN)}
              >
                Trips
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => router.push(LINK_LOGIN)}
              >
                Messages
              </Button>
              <GuideSelect />
            </div>
            <div>
              {session.role !== E_UserRole.Admin &&
              !session.isHost &&
              !path.includes("/hosting") ? (
                <Button variant="primary" size="sm" onClick={applyToHost}>
                  Login | Sign up
                </Button>
              ) : null}
            </div>
            {session.id && <LandingPageMenu />}
          </div>
        </nav>
        <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
      </WidthWrapper>
    </header>
  )
}

export default GuideHeader

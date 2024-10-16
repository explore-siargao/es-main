"use client"
import React, { useState } from "react"
import Image from "@/common/components/ui/image"
import Logo from "@/common/assets/logo.png"
import { Button } from "@/common/components/ui/Button"
import LoggedInUserDropdown from "./LoggedInUserDropdown"
import { APP_NAME } from "@repo/constants"
import { usePathname, useRouter } from "next/navigation"
import { LINK_HOME, LINK_LOGIN } from "@/common/constants"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import useSessionStore from "@/common/store/useSessionStore"
import { E_UserRole } from "@repo/contract"
import GuidesMenu from "./GuidesMenu"
import ApplyToHostModal from "@/module/LandingPage/components/ApplyToHostModal"
import SearchBarByState from "../SearchBar/SearchBarByState"

function WithSearch({
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
          className="flex items-start justify-between py-2 my-2 w-full"
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
          <SearchBarByState isNavCenter={true} />
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
    </header>
  )
}

export default WithSearch

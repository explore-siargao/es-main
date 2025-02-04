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
import ApplyToHostModal from "@/common/components/modals/apply-to-host-modal"
import SearchBarByState from "../SearchBar/search-bar-by-state"
import FilterHeader from "./filter"

function WithSearch({
  contentWidth = "medium",
  isFixed = true,
  withFilters = false,
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
  isFixed?: boolean
  withFilters?: boolean
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
          Travel with purpose 🏖️ Support local communities 🫶
        </Typography>
      </div>
      <WidthWrapper width={contentWidth}>
        <nav
          className="flex items-start justify-between pt-4 w-full"
          aria-label="Global"
        >
          <Link href={LINK_HOME} className="gap-2 items-center min-w-64 z-0">
            <Image
              className="h-12 w-fit"
              src={Logo}
              width={500}
              height={700}
              alt={APP_NAME}
            />
          </Link>

          <div className="hidden lg:flex lg:justify-end space-x-3 items-center relative min-w-64">
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
        <SearchBarByState isNavCenter={true} />
        <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
      </WidthWrapper>
      {withFilters ? <FilterHeader /> : null}
    </header>
  )
}

export default WithSearch

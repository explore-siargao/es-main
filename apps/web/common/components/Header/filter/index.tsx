"use client"
import React, { useState } from "react"
import Image from "@/common/components/ui/image"
import Logo from "@/common/assets/logo.png"
import { Button } from "@/common/components/ui/Button"
import { APP_NAME } from "@repo/constants"
import { LINK_HOME } from "@/common/constants"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { House, SlidersHorizontal } from "lucide-react"
import FilterPropertyModal from "./modals/filter-property"
import FilterRentalModal from "./modals/filter-rental"
import FilterActivityModal from "./modals/filter-activity"

function FilterHeader({
  contentWidth = "medium",
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <header className="w-full bg-white border-b border-t border-gray-200">
      <WidthWrapper width={contentWidth}>
        <nav
          className="flex items-center py-2 my-2 w-full gap-8"
          aria-label="Global"
        >
          <Link href={LINK_HOME}>
            <House strokeWidth={1} />
          </Link>
          <Button
            variant={"outline"}
            size="sm"
            className="gap-2  items-center text-center"
            onClick={() => setIsModalOpen(true)}
          >
            <SlidersHorizontal size={12} /> <div>Filters</div>
            {/* <FilterPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/> */}
            {/* <FilterRentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/> */}
            <FilterActivityModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </Button>
        </nav>
      </WidthWrapper>
    </header>
  )
}

export default FilterHeader

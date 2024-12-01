"use client"
import React, { useState } from "react"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import ApplyToHostModal from "@/common/components/modals/apply-to-host-modal"
import { Typography } from "../ui/Typography"
import SearchBarByState from "./search-bar-by-state"

function SearchBarByStateWithHero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div
      className={`w-full mt-28 h-96 z-20 flex flex-col items-center bg-[url('/search-bar-image-4.png')] bg-cover bg-no-repeat bg-center 
            before:content-[''] 
            before:absolute before:inset-0 
            before:block before:bg-gradient-to-b 
            before:from-gray-700 before:to-gray-900 
            before:opacity-30 before:z-[-5] relative`}
    >
      <WidthWrapper width="medium">
        <Typography
          className="text-white text-6xl mt-36 mb-[74px] ml-40"
          fontWeight="bold"
        >
          Find your island vibe
        </Typography>
      </WidthWrapper>
      <div className="mt-6">
        <SearchBarByState isDark />
      </div>
      <ApplyToHostModal isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default SearchBarByStateWithHero

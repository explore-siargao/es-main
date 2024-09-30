"use client"
import { Typography } from "@/common/components/ui/Typography"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import React from "react"

interface HeroSectionProps {
  backgroundImage: string
  title: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
}) => {
  return (
    <div
      className={`w-full mt-28 h-60 z-20 flex items-center justify-center bg-cover bg-no-repeat bg-center relative`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-b before:from-gray-700 before:to-gray-900 before:opacity-30 before:z-[-5]`}
      ></div>
      <WidthWrapper
        width="medium"
        className="absolute inset-0 flex justify-center ml-40"
      >
        <Typography className="text-white text-6xl" fontWeight="bold">
          {title}
        </Typography>
      </WidthWrapper>
    </div>
  )
}

export default HeroSection

"use client"

import React from "react"
import { usePathname } from "next/navigation"
import HeroSection from "@/module/Locations/components/HeroSection"

const ClientHeroSection = () => {
  const pathname = usePathname()
  const subPlace = pathname.split("/").pop()

  const toSentenceCase = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  return (
    <HeroSection
      backgroundImage="/hero-image.png"
      title={subPlace ? toSentenceCase(subPlace) : ""}
    />
  )
}

export default ClientHeroSection

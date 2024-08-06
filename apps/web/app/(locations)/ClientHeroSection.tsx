"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import HeroSection from "@/module/Locations/components/HeroSection"

const ClientHeroSection = () => {
  const pathname = usePathname()
  const subPlace = pathname.split("/").pop()
  const firstPath = pathname.split("/")[1]

  const toSentenceCase = (str: string) => {
    let textDisplay
    if (firstPath === "properties") {
      textDisplay =
        str
          .split("-")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ") + "s in Siargao"
    } else {
      textDisplay = str
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    }
    return textDisplay
  }

  return (
    <HeroSection
      backgroundImage="/hero-image.png"
      title={subPlace ? toSentenceCase(subPlace) : ""}
    />
  )
}

export default ClientHeroSection

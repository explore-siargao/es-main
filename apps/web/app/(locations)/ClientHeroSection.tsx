"use client"
import { usePathname } from "next/navigation"
import HeroSection from "@/module/Locations/components/HeroSection"

const ClientHeroSection = () => {
  const pathname = usePathname()
  const subPlace = pathname.split("/").pop()
  const firstPath = pathname.split("/")[1]

  const toSentenceCase = (str: string) => {
    let textDisplay
    const cleanedStr = str.replace("category=", "")

    if (firstPath === "properties") {
      textDisplay =
        cleanedStr
          .split("-")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ") + "s in Siargao"
    } else {
      textDisplay = cleanedStr
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

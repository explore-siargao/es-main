"use client"
import { Separator } from "@/common/components/ui/Separator"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import GuideContent from "../components/GuideContent"
import Guides from "../components/Guides"

const IslandsGuide = () => {
  const contentText = [
    "Siargao Island is a tropical paradise surrounded by smaller islands, each with its own unique charm and attractions. One of the most popular island-hopping destinations is Sohoton Cove National Park, a protected area located on Bucas Grande Island. This stunning cove is known for its crystal-clear waters, white sandy beaches, and lush green forests. Take a private boat tour to explore the lagoon, caves, and surrounding islands, and don't forget to bring your drone to capture the breathtaking views from above.",
    "Another must-visit island is Daku Island, a tranquil retreat located just off the coast of Siargao. This island is perfect for those seeking relaxation and adventure, with its picturesque beaches, coral reefs, and lush forests. Take a leisurely stroll around the island, go snorkeling or diving to explore the underwater world, or simply bask in the sun and enjoy the peaceful atmosphere.",
    "For a more off-the-beaten-path experience, head to Guyam Island, a small, uninhabited island located just a short boat ride from Siargao. This island is a nature lover's paradise, with its stunning beaches, crystal-clear waters, and vibrant marine life. Take a picnic lunch and enjoy the island's serene atmosphere, or go snorkeling or swimming to explore the surrounding coral reefs. With its stunning scenery, rich marine life, and laid-back atmosphere, Siargao Island and its surrounding islands are a must-visit destination for any traveler seeking a tropical adventure.",
  ]

  const markers = [
    {
      lat: 9.67361,
      long: 125.94833,
      name: "Sohoton Cove National Park",
      isCity: true,
    },
    {
      lat: 9.7411837,
      long: 126.1640441,
      name: "Daku Island",
      isCity: false,
    },
    {
      lat: 9.765,
      long: 126.16778,
      name: "Guyam Island",
      isCity: false,
    },
  ]

  const guides = [
    {
      imageKey: "c5037a41-f134-4e18-97a9-8f4807bd8648",
      title: "Daku Island",
      link: "#",
    },
    {
      imageKey: "5.jpg",
      title: "Laonan Island",
      link: "#",
    },
    {
      imageKey: "50c4301e-3d3b-44fe-9e6e-98d4c61eb132",
      title: "Poneas Island",
      link: "#",
    },
    {
      imageKey: "2.jpg",
      title: "Guyam Island",
      link: "#",
    },
  ]

  return (
    <WidthWrapper width="medium" className="mt-10">
      <GuideContent
        contentTitle="Island in Siargao"
        contentText={contentText}
        markers={markers}
        iconMarker="island"
      />
      <Separator orientation="horizontal" className="my-12 bg-gray-300" />
      <Guides title="Island Guides" guides={guides} />
    </WidthWrapper>
  )
}

export default IslandsGuide

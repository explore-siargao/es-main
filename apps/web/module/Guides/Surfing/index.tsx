"use client"
import { Separator } from "@/common/components/ui/Separator"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import GuideContent from "../components/GuideContent"
import Guides from "../components/Guides"

const SurfingGuide = () => {
  const contentText = [
    "Siargao Island is a surfer's paradise, with its powerful waves and stunning scenery making it a must-visit destination for any surfing enthusiast. The island is home to several world-class surf spots, including the famous Cloud 9, which is known for its fast and hollow waves that are perfect for experienced surfers. However, Siargao also has plenty of options for beginners, with gentle waves and patient instructors to help you catch your first wave.",
    "For those just starting out, Jacking Horse and Guiuan are two popular spots that offer gentle waves and a relaxed atmosphere. These spots are perfect for learning the basics of surfing, and there are plenty of surf schools and rental shops nearby to help you get started. More experienced surfers can head to Cloud 9, Quicksilver, or Cemetery, which offer a range of waves to suit different styles and abilities. And if you're looking for a real adventure, consider taking a boat trip to one of the island's more remote surf spots, where you can ride the waves in solitude and enjoy the stunning scenery.",
    "Overall, Siargao Island is a surfer's dream come true, with its warm waters, stunning scenery, and world-class waves making it the perfect destination for surfers of all levels. Whether you're just starting out or are a seasoned pro, Siargao has something for everyone, and its laid-back atmosphere and friendly locals make it the perfect place to relax and enjoy the ride. So why not grab your board and head to Siargao - we promise you won't be disappointed!",
  ]

  const markers = [
    {
      lat: 9.8137,
      long: 126.1651,
      name: "Cloud 9",
      surfingLevel: "Beginner",
    },
  ]

  const guides = [
    {
      imageKey: "1.jpg",
      title: "Cloud 9 Wave",
      link: "#",
      surfingLevel: "Intermediate",
    },
    {
      imageKey: "2.jpg",
      title: "Surfer at Jacking Horse",
      link: "#",
      surfingLevel: "Advanced",
    },
    {
      imageKey: "3.jpg",
      title: "Stimpy's Surf Spot",
      link: "#",
      surfingLevel: "Beginner",
    },
    {
      imageKey: "5.jpg",
      title: "Rock Island Waves",
      link: "#",
      surfingLevel: "Advanced",
    },
  ]

  return (
    <WidthWrapper width="medium" className="mt-10">
      <GuideContent
        contentTitle="Surfing in Siargao"
        contentText={contentText}
        markers={markers}
      />
      <Separator orientation="horizontal" className="my-12 bg-gray-300" />
      <Guides title="Surf Guides" guides={guides} />
    </WidthWrapper>
  )
}

export default SurfingGuide

"use client"
import { Separator } from "@/common/components/ui/Separator"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import GuideContent from "../components/GuideContent"
import Guides from "../components/Guides"

const RestaurantGuide = () => {
  const contentText = [
    "Siargao Island is a haven for foodies and thrill-seekers alike. When it comes to dining, Lamari Bar & Restaurant is a top choice, offering an elevated island experience with its well-stocked bar and well-plated dishes. Located inside Lamari Resort in General Luna, this restaurant serves local and international dishes using only premium ingredients and fresh seafood. Try their Mahi-mahi with Pumpkin Chorizo Risotto, Confit Duck Leg, Butcher’s Steak, and Callos (tomato meat stew) for a taste of the island's rich flavors.",
    "For a more laid-back vibe, head to Kermit Siargao Surf Hotel & Restaurant, a popular resort in General Luna that embodies the island's surf culture. Their menu features a range of options, including pizzas, pasta, and healthy smoothie bowls. Try their Super Bowl, a fruit medley with yogurt, or their Cloud 9 Kook, an energy booster made of banana, peanut butter, cacao, and coconut milk. Another must-visit is Bravo Restaurant, located at Bravo Beach Resort in General Luna, which serves authentic Spanish food and international dishes prepared by a professional chef trained in traditional Basque cuisine. Be sure to try their seafood Paella, a rice dish topped with prawns and crab, along with their Taco Poblano.",
  ]

  const markers = [
    {
      lat: 9.970336,
      long: 126.049733,
    },
    {
      lat: 9.922317,
      long: 126.055913,
    },
    {
      lat: 9.843848,
      long: 126.031194,
    },
    {
      lat: 9.786337,
      long: 126.060033,
    },
    {
      lat: 9.816785,
      long: 126.101918,
    },
  ]

  const guides = [
    {
      imageKey: "3.jpg",
      title: "Lamari Resort",
      link: "#",
    },
    {
      imageKey: "4.jpg",
      title: "Kermit Siargao",
      link: "#",
    },
    {
      imageKey: "24afc4b2-e08d-414e-905e-2d9cdced4626",
      title: "Bravo Restaurant",
      link: "#",
    },
    {
      imageKey: "7f560184-49df-444f-8595-5d36edf5d06d",
      title: "Amaretto Sour",
      link: "#",
    },
  ]

  return (
    <WidthWrapper width="small" className="mt-24 md: mt-36 lg:mt-44">
      <GuideContent
        contentTitle="Restaurant, Cafe, Bars in Siargao"
        contentText={contentText}
        markers={markers}
      />
      <Separator orientation="horizontal" className="my-12 bg-gray-300" />
      <Guides title="Restaurant, Cafe, Bars Guides" guides={guides} />
    </WidthWrapper>
  )
}

export default RestaurantGuide
"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import ImageCards from "./components/ImageCards"
import prop1 from "@/common/assets/sample/prop-1.png"
import prop2 from "@/common/assets/sample/prop-2.png"
import prop3 from "@/common/assets/sample/prop-3.png"
import prop4 from "@/common/assets/sample/prop-4.png"
import prop5 from "@/common/assets/sample/prop-5.png"
import prop6 from "@/common/assets/sample/prop-6.png"
import prop7 from "@/common/assets/sample/prop-7.png"
import prop8 from "@/common/assets/sample/prop-8.png"
import prop9 from "@/common/assets/sample/prop-9.png"
import prop10 from "@/common/assets/sample/prop-10.png"
import rent1 from "@/common/assets/sample/rent-1.jpg"
import rent2 from "@/common/assets/sample/rent-2.png"
import rent3 from "@/common/assets/sample/rent-3.png"
import rent4 from "@/common/assets/sample/rent-4.png"
import rent5 from "@/common/assets/sample/rent-5.png"
import rent6 from "@/common/assets/sample/rent-6.png"
import rent7 from "@/common/assets/sample/rent-7.png"
import rent8 from "@/common/assets/sample/rent-8.png"
import rent9 from "@/common/assets/sample/rent-9.png"
import rent10 from "@/common/assets/sample/rent-10.png"
import act1 from "@/common/assets/sample/act-1.png"
import act2 from "@/common/assets/sample/act-2.png"
import act3 from "@/common/assets/sample/act-3.png"
import act4 from "@/common/assets/sample/act-4.png"
import act5 from "@/common/assets/sample/act-5.png"

const propertiesDummy = [
  {
    imageKey: prop1,
    title: "Ramon’s Beach Front Resort",
    description:
      "Sunset View, Looking across the famous Magpupungko Rock Pool, Facing the Philippine Deep Surf Spot. Walking Distance to other famous spots",
  },
  {
    imageKey: prop2,
    title: "Villa Cali",
    description:
      "An outdoor swimming pool, garden, a terrace and restaurant in General Luna. Providing a bar, the property is located within a few steps of General Luna Beach.",
  },
  {
    imageKey: prop3,
    title: "Kawayan Hostel",
    description:
      "Kawayan Hostel provides air-conditioned rooms and a garden. The property is set 2.4 km from Malinao Beach, 300 metres from Guyam Island and 10 km from Naked Island. ",
  },
  {
    imageKey: prop4,
    title: "Hotel Casa Bianca",
    description:
      "The 5-star Casa Bianca Siargao General Luna hotel, situated 25 minutes by foot from Discover Siargao, features a swimming pool and a picnic area.",
  },
  {
    imageKey: prop5,
    title: "Mama Miya’s Homestay",
    description:
      "Offering sea views, Mama Miya’s Homestay Siargao is an accommodation situated in General Luna, a few steps from General Luna Beach and 2.5 km from Malinao Beach.",
  },
  {
    imageKey: prop6,
    title: "B-Side Resort",
    description:
      "Sunset View, Looking across the famous Magpupungko Rock Pool, Facing the Philippine Deep Surf Spot. Walking Distance to other famous spots",
  },
  {
    imageKey: prop7,
    title: "Mariano’s Hotel",
    description:
      "An outdoor swimming pool, garden, a terrace and restaurant in General Luna. Providing a bar, the property is located within a few steps of General Luna Beach.",
  },
  {
    imageKey: prop8,
    title: "Coconut Island Resort",
    description:
      "Kawayan Hostel provides air-conditioned rooms and a garden. The property is set 2.4 km from Malinao Beach, 300 metres from Guyam Island and 10 km from Naked Island. ",
  },
  {
    imageKey: prop9,
    title: "Sierra Muerte Homestay",
    description:
      "The 5-star Casa Bianca Siargao General Luna hotel, situated 25 minutes by foot from Discover Siargao, features a swimming pool and a picnic area.",
  },
  {
    imageKey: prop10,
    title: "Nuevo Leon’s Grand Hotel",
    description:
      "Offering sea views, Mama Miya’s Homestay Siargao is an accommodation situated in General Luna, a few steps from General Luna Beach and 2.5 km from Malinao Beach.",
  },
]

const rentalsDummy = [
  {
    imageKey: rent1,
    title: "Yamaha Fazzio",
    description:
      "Get up close with the locals and enjoy the picturesque views as you explore the area with a modern bike.",
  },
  {
    imageKey: rent2,
    title: "Pinarello Road Bikes",
    description:
      "A clean, easy and healthy way to get around, didn't see any of these adapted for surfboards though",
  },
  {
    imageKey: rent3,
    title: "Cerevello Mountain Bikes",
    description:
      "Perfect for navigating scenic trails and rugged terrain, these bikes offer a thrilling way to experience the island's natural beauty.",
  },
  {
    imageKey: rent4,
    title: "Suzuki S-Presso",
    description:
      "The S.Presso rental car offers a convenient and comfortable way to explore the vibrant beauty of General Luna.",
  },
  {
    imageKey: rent5,
    title: "Toyota Hiace Super Grandia",
    description:
      "Fast and hassle-free transportation option for groups or families visiting General Luna. With spacious seating for a smooth journey to everyone.",
  },
  {
    imageKey: rent6,
    title: "Ford Ranger",
    description:
      "Get up close with the locals and enjoy the picturesque views as you explore the area with a modern bike.",
  },
  {
    imageKey: rent7,
    title: "Ford Transit Camper Van",
    description:
      "Get up close with the locals and enjoy the picturesque views as you explore the area with a modern bike.",
  },
  {
    imageKey: rent8,
    title: "Mio Sporty",
    description:
      "Get up close with the locals and enjoy the picturesque views as you explore the area with a modern bike.",
  },
  {
    imageKey: rent9,
    title: "Jeep Gladiator",
    description:
      "Get up close with the locals and enjoy the picturesque views as you explore the area with a modern bike.",
  },
  {
    imageKey: rent10,
    title: "ATV Quadbike",
    description:
      "Get up close with the locals and enjoy the picturesque views as you explore the area with a modern bike.",
  },
]

const activitiesDummy = [
  {
    imageKey: act1,
    title: "Surfing",
    description:
      "General Luna is a surfing paradise with world-class waves and stunning views. Whether you're a beginner or an expert, enjoy the thrill of riding the famous Cloud 9 wave or other popular spots like Jacking Horse and Quicksilver.",
  },
  {
    imageKey: act2,
    title: "Night Camping",
    description:
      "Experience the magic of night camping with a cozy bonfire in General Luna. Enjoy starlit skies, the warmth of a crackling fire, and the serenity of nature. Perfect for creating unforgettable memories and relaxing under the stars.",
  },
  {
    imageKey: act3,
    title: "Swimming",
    description:
      "Dive into the crystal-clear waters of General Luna’s lagoon for a refreshing swimming experience. Enjoy the warm, inviting water and serene surroundings as you swim in this tranquil, picturesque setting. Ideal for a relaxing dip or fun water activities.",
  },
  {
    imageKey: act4,
    title: "Long Walk",
    description:
      "Take a leisurely stroll down General Luna’s Palm Tree Road, where lush palms and scenic views create a picturesque walking experience. Enjoy the tranquil ambiance and beautiful surroundings as you unwind and soak in the island’s natural beauty.",
  },
  {
    imageKey: act5,
    title: "Hiking",
    description:
      "Embark on a hiking adventure in General Luna’s mountains, where lush trails and breathtaking views await. Enjoy the challenge of diverse terrain and the reward of panoramic vistas as you explore the island's natural beauty and rugged landscapes.",
  },
  {
    imageKey: act1,
    title: "Surfing",
    description:
      "General Luna is a surfing paradise with world-class waves and stunning views. Whether you're a beginner or an expert, enjoy the thrill of riding the famous Cloud 9 wave or other popular spots like Jacking Horse and Quicksilver.",
  },
  {
    imageKey: act2,
    title: "Night Camping",
    description:
      "Experience the magic of night camping with a cozy bonfire in General Luna. Enjoy starlit skies, the warmth of a crackling fire, and the serenity of nature. Perfect for creating unforgettable memories and relaxing under the stars.",
  },
  {
    imageKey: act3,
    title: "Swimming",
    description:
      "Dive into the crystal-clear waters of General Luna’s lagoon for a refreshing swimming experience. Enjoy the warm, inviting water and serene surroundings as you swim in this tranquil, picturesque setting. Ideal for a relaxing dip or fun water activities.",
  },
  {
    imageKey: act4,
    title: "Long Walk",
    description:
      "Take a leisurely stroll down General Luna’s Palm Tree Road, where lush palms and scenic views create a picturesque walking experience. Enjoy the tranquil ambiance and beautiful surroundings as you unwind and soak in the island’s natural beauty.",
  },
  {
    imageKey: act5,
    title: "Hiking",
    description:
      "Embark on a hiking adventure in General Luna’s mountains, where lush trails and breathtaking views await. Enjoy the challenge of diverse terrain and the reward of panoramic vistas as you explore the island's natural beauty and rugged landscapes.",
  },
]

const Locations = () => {
  return (
    <WidthWrapper width="medium" className="flex justify-center">
      <div className="mt-14 flex justify-center">
        <ImageCards
          cards={propertiesDummy}
          cardTitle="Properties in General Luna"
        />
      </div>

      <div className="mt-10 flex justify-center">
        <ImageCards cards={rentalsDummy} cardTitle="Rentals in General Luna" />
      </div>

      <div className="mt-10 flex justify-center">
        <ImageCards
          cards={activitiesDummy}
          cardTitle="Activities in General Luna"
        />
      </div>
    </WidthWrapper>
  )
}

export default Locations

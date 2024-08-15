"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import TravelStyleContainer from "./components/TravelStyleContainer"
import { useSearchParams } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"

const dummyDataHostel = [
  {
    imageKey: "/assets/7f560184-49df-444f-8595-5d36edf5d06d",
    title: "Three Little Birds Hostel",
    description: "General Luna",
    type: "hostel",
  },
  {
    imageKey: "/assets/b7af31d5-2df5-4517-85af-29871278388d",
    title: "LaFinca Hostel Siargao",
    description: "San Isidro",
    type: "hostel",
  },
  {
    imageKey: "/assets/96e3a47d-c9bc-4944-89cf-32ad00c054e6",
    title: "Hostel Bajala Siargao",
    description: "General Luna",
    type: "hostel",
  },
  {
    imageKey: "/assets/d9df37df-cde8-4e5c-88a4-0a758c3a1b17",
    title: "Mera's Garden",
    description: "General Luna",
    type: "hostel",
  },
]

const dummyDataApartment = [
  {
    imageKey: "/assets/35601671-6796-47aa-9507-f2ddf1825489",
    title: "YAMA APARTMENTS",
    description: "General Luna",
    type: "apartment",
  },
  {
    imageKey: "/assets/d74e7a01-8b78-457b-ace5-9e963d1cfb7f",
    title: "Casa De Loren",
    description: "General Luna",
    type: "apartment",
  },
  {
    imageKey: "/assets/aba0c6ed-01af-4b57-8f8f-5b56365787c2",
    title: "The Village Siargao",
    description: "General Luna",
    type: "apartment",
  },
]

const dummyDataHomestay = [
  {
    imageKey: "/assets/74d817a8-ab1d-4ace-b4e7-77fc0ddc3a95",
    title: "Pore's Home Stay",
    description: "General Luna",
    type: "homestay",
  },
  {
    imageKey: "/assets/6a43ffd4-c1a4-4258-a56e-8f4a8a198088",
    title: "Lampara Siargao Boutique",
    description: "General Luna",
    type: "homestay",
  },
  {
    imageKey: "/assets/971d287d-40bb-433c-b5b3-bd76882301eb",
    title: "Calypso Surf & Dive",
    description: "San Isidro",
    type: "homestay",
  },
]

const dummyDataResort = [
  {
    imageKey: "/assets/5.jpg",
    title: "Ocean 101 Beach Resort",
    description: "General Luna",
    type: "resort",
  },
  {
    imageKey: "/assets/3.jpg",
    title: "Retreat Siargao Resort",
    description: "General Luna",
    type: "resort",
  },
  {
    imageKey: "/assets/c5037a41-f134-4e18-97a9-8f4807bd8648",
    title: "The Hillside Resort Siargao",
    description: "General Luna",
    type: "resort",
  },
]

const dummyDataVilla = [
  {
    imageKey: "/assets/104ae7f8-5bf8-4cdf-9c79-12ad09390904",
    title: "Siargao Island Villas",
    description: "General Luna",
    type: "villa",
  },
  {
    imageKey: "/assets/6f2fb7ec-2c89-4b7e-962e-be66014b7039",
    title: "Lagkaw Siargao Villas Beach Resort",
    description: "General Luna",
    type: "villa",
  },
  {
    imageKey: "/assets/9ed03b07-b40d-4c69-9a04-8cebdeadc034",
    title: "Privada Villa Siargao",
    description: "General Luna",
    type: "villa",
  },
]

const dummyDataHotel = [
  {
    imageKey: "/assets/4dbc0565-277e-4ba5-893e-dfa6ce17fcb8",
    title: "Island Hoppers Inn",
    description: "General Luna",
    type: "hotel",
  },
  {
    imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
    title: "Siargao Island Hopping Hotel",
    description: "General Luna",
    type: "hotel",
  },
  {
    imageKey: "/assets/24afc4b2-e08d-414e-905e-2d9cdced4626",
    title: "Siargao Inn",
    description: "General Luna",
    type: "hotel",
  },
]

const dummyDataActivities = [
  {
    imageKey: "/assets/",
    title: "Surfing Lessons",
    description: "Learn to surf with local experts",
    type: "activities",
  },
  {
    imageKey: "/assets/activity2.jpg",
    title: "Island Hopping",
    description: "Discover the beautiful islands nearby",
    type: "activities",
  },
  {
    imageKey: "/assets/activity3.jpg",
    title: "Snorkeling",
    description: "Explore the underwater world",
    type: "activities",
  },
]

type TravelStyleItem = {
  imageKey: string
  title: string
  description: string
  type: string
}

const TravelStyle = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  let travelStyleItems: TravelStyleItem[] = []
  let travelStyleTitle: string = "No data found"

  if (category === "hostel") {
    travelStyleItems = dummyDataHostel
    travelStyleTitle = "Hostels"
  } else if (category === "apartment") {
    travelStyleItems = dummyDataApartment
    travelStyleTitle = "Apartments"
  } else if (category === "homestay") {
    travelStyleItems = dummyDataHomestay
    travelStyleTitle = "Homestay"
  } else if (category === "hotel") {
    travelStyleItems = dummyDataHotel
    travelStyleTitle = "Hotels"
  } else if (category === "resort") {
    travelStyleItems = dummyDataResort
    travelStyleTitle = "Resorts"
  } else if (category === "villa") {
    travelStyleItems = dummyDataVilla
    travelStyleTitle = "Villas"
  } else if (category === "activities") {
    travelStyleItems = dummyDataActivities
    travelStyleTitle = "Activities"
  }

  return (
    <WidthWrapper width="medium" className="mt-24">
      {travelStyleItems.length > 0 ? (
        <TravelStyleContainer
          title={travelStyleTitle}
          items={travelStyleItems}
        />
      ) : (
        <Typography>No data was found.</Typography>
      )}
    </WidthWrapper>
  )
}

export default TravelStyle

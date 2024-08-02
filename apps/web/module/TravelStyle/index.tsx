"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import TravelStyleContainer from "./TravelStyleContainer"
import { usePathname } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"

const dummyDataHostel = [
  {
    imageKey: "/assets/7f560184-49df-444f-8595-5d36edf5d06d",
    title: "Three Little Birds Hostel",
    description: "General Luna",
  },
  {
    imageKey: "/assets/b7af31d5-2df5-4517-85af-29871278388d",
    title: "LaFinca Hostel Siargao",
    description: "San Isidro",
  },
  {
    imageKey: "/assets/96e3a47d-c9bc-4944-89cf-32ad00c054e6",
    title: "Hostel Bajala Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/d9df37df-cde8-4e5c-88a4-0a758c3a1b17",
    title: "Mera's Garden",
    description: "General Luna",
  },
  {
    imageKey: "/assets/7b291f96-2c2f-4858-b66a-4319bc9a3223",
    title: "Kawayan Hostel",
    description: "General Luna",
  },
  {
    imageKey: "/assets/cf7c14dc-d3f5-46e8-b813-01cf04200519",
    title: "Sinag Hostel",
    description: "General Luna",
  },
  {
    imageKey: "/assets/24afc4b2-e08d-414e-905e-2d9cdced4626",
    title: "Katre Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
    title: "El Lobo Hostel",
    description: "General Luna",
  },
  {
    imageKey: "/assets/4dbc0565-277e-4ba5-893e-dfa6ce17fcb8",
    title: "Hiraya Surf Hostel",
    description: "General Luna",
  },
]

const dummyDataApartment = [
  {
    imageKey: "/assets/35601671-6796-47aa-9507-f2ddf1825489",
    title: "YAMA APARTMENTS",
    description: "General Luna",
  },
  {
    imageKey: "/assets/d74e7a01-8b78-457b-ace5-9e963d1cfb7f",
    title: "Casa De Loren",
    description: "General Luna",
  },
  {
    imageKey: "/assets/aba0c6ed-01af-4b57-8f8f-5b56365787c2",
    title: "The Village Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/f4b1cd4f-e475-488a-9601-29ad9a213230",
    title: "Salvacion Hills",
    description: "General Luna",
  },
  {
    imageKey: "/assets/9ed03b07-b40d-4c69-9a04-8cebdeadc034",
    title: "The Grace Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/230b8a4d-db66-4f5f-98c7-d8d052a7f06b",
    title: "Family Cottage",
    description: "General Luna",
  },
  {
    imageKey: "/assets/16c51e38-ceb0-4231-839a-a7af6ace5c60",
    title: "Dee Siargaonon Homestay",
    description: "General Luna",
  },
  {
    imageKey: "/assets/1.jpg",
    title: "Family Cottage",
    description: "General Luna",
  },
  {
    imageKey: "/assets/f57a9104-b3bc-4c6c-8e7b-ff15ac529b06",
    title: "Sallt Bungalow",
    description: "General Luna",
  },
]

const dummyDataHomestay = [
  {
    imageKey: "/assets/74d817a8-ab1d-4ace-b4e7-77fc0ddc3a95",
    title: "Pore's Home Stay",
    description: "General Luna",
  },
  {
    imageKey: "/assets/6a43ffd4-c1a4-4258-a56e-8f4a8a198088",
    title: "Lampara Siargao Boutique",
    description: "General Luna",
  },
  {
    imageKey: "/assets/971d287d-40bb-433c-b5b3-bd76882301eb",
    title: "Calypso Surf & Dive",
    description: "San Isidro",
  },
  {
    imageKey: "/assets/b24779e0-e3d3-4b40-a659-c1974d2d0848",
    title: "Grotto Gardens",
    description: "Pacifico",
  },
  {
    imageKey: "/assets/472c6650-800a-4ba9-9d2e-856ff90064e9",
    title: "Riad Masaya",
    description: "General Luna",
  },
  {
    imageKey: "/assets/da700550-fb66-46c6-9b6b-456666e9b4a9",
    title: "Paradiso",
    description: "General Luna",
  },
  {
    imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
    title: "Ilakai Homestay",
    description: "General Luna",
  },
  {
    imageKey: "/assets/7b291f96-2c2f-4858-b66a-4319bc9a3223",
    title: "Colette's Homestay",
    description: "General Luna",
  },
  {
    imageKey: "/assets/4.jpg",
    title: "Kubo Tower Room with Kitchen",
    description: "General Luna",
  },
]

const dummyDataResort = [
  {
    imageKey: "/assets/5.jpg",
    title: "Ocean 101 Beach Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/3.jpg",
    title: "Retreat Siargao Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/c5037a41-f134-4e18-97a9-8f4807bd8648",
    title: "The Hillside Resort Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/50c4301e-3d3b-44fe-9e6e-98d4c61eb132",
    title: "Cherinicole Beach Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/2b5e1912-228f-4f12-9e1d-5c85da0ee910",
    title: "Reef Beach Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/d9b5802f-dd6f-40ab-98b2-b2849e295d9b",
    title: "Ohana Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/1f37581a-ef5a-4b64-ad75-47284a09f8ef",
    title: "Siargao Seasky Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/749ddf16-9963-43a7-b447-dd483d7ac041",
    title: "Kawayan Siargao Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/2.jpg",
    title: "Kawili Resort and Hostel",
    description: "General Luna",
  },
]

const dummyDataVilla = [
  {
    imageKey: "/assets/104ae7f8-5bf8-4cdf-9c79-12ad09390904",
    title: "Siargao Island Villas",
    description: "General Luna",
  },
  {
    imageKey: "/assets/6f2fb7ec-2c89-4b7e-962e-be66014b7039",
    title: "Lagkaw Siargao Villas Beach Resort",
    description: "General Luna",
  },
  {
    imageKey: "/assets/9ed03b07-b40d-4c69-9a04-8cebdeadc034",
    title: "Privada Villa Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/f4b1cd4f-e475-488a-9601-29ad9a213230",
    title: "Romantic Beach Villas",
    description: "General Luna",
  },
  {
    imageKey: "/assets/230b8a4d-db66-4f5f-98c7-d8d052a7f06b",
    title: "G VILLAS SIARGAO",
    description: "General Luna",
  },
  {
    imageKey: "/assets/1.jpg",
    title: "Salvacion Hills",
    description: "General Luna",
  },
  {
    imageKey: "/assets/f57a9104-b3bc-4c6c-8e7b-ff15ac529b06",
    title: "Nami Villas Siargao 1",
    description: "General Luna",
  },
  {
    imageKey: "/assets/16c51e38-ceb0-4231-839a-a7af6ace5c60",
    title: "Villa Tulua",
    description: "General Luna",
  },
  {
    imageKey: "/assets/aba0c6ed-01af-4b57-8f8f-5b56365787c2",
    title: "Domu Mia Villa",
    description: "General Luna",
  },
]

const dummyDataHotel = [
  {
    imageKey: "/assets/4dbc0565-277e-4ba5-893e-dfa6ce17fcb8",
    title: "Island Hoppers Inn",
    description: "General Luna",
  },
  {
    imageKey: "/assets/ac0d3e85-f3da-4f30-8db5-e8bdb98385df",
    title: "Siargao Island Hopping Hotel",
    description: "General Luna",
  },
  {
    imageKey: "/assets/24afc4b2-e08d-414e-905e-2d9cdced4626",
    title: "Siargao Inn",
    description: "General Luna",
  },
  {
    imageKey: "/assets/cf7c14dc-d3f5-46e8-b813-01cf04200519",
    title: "Patrick's on the Beach",
    description: "General Luna",
  },
  {
    imageKey: "/assets/7b291f96-2c2f-4858-b66a-4319bc9a3223",
    title: "Casa Basa Siargao",
    description: "General Luna",
  },
  {
    imageKey: "/assets/230b8a4d-db66-4f5f-98c7-d8d052a7f06b",
    title: "Apsaras Tribe Philippines Inc.",
    description: "General Luna",
  },
  {
    imageKey: "/assets/1.jpg",
    title: "Nay Palad Hideaway",
    description: "General Luna",
  },
  {
    imageKey: "/assets/4.jpg",
    title: "Anirada Homestay",
    description: "General Luna",
  },
  {
    imageKey: "/assets/7f560184-49df-444f-8595-5d36edf5d06d",
    title: "Bakhaw Hotel Bed & Breakfast",
    description: "General Luna",
  },
]

const TravelStyle = () => {
  const pathName = usePathname()

  let travelStyleItems
  let travelStyleTitle

  if (pathName === "/properties/hostel") {
    travelStyleItems = dummyDataHostel
    travelStyleTitle = "Hostels"
  } else if (pathName === "/properties/apartment") {
    travelStyleItems = dummyDataApartment
    travelStyleTitle = "Apartments"
  } else if (pathName === "/properties/homestay") {
    travelStyleItems = dummyDataHomestay
    travelStyleTitle = "Homestay"
  } else if (pathName === "/properties/hotel") {
    travelStyleItems = dummyDataHotel
    travelStyleTitle = "Hotels"
  } else if (pathName === "/properties/resort") {
    travelStyleItems = dummyDataResort
    travelStyleTitle = "Resorts"
  } else if (pathName === "/properties/apartment") {
    travelStyleItems = dummyDataApartment
    travelStyleTitle = "Apartments"
  } else if (pathName === "/properties/villa") {
    travelStyleItems = dummyDataVilla
    travelStyleTitle = "Villas"
  } else {
    // nothing
  }

  return (
    <WidthWrapper width="medium" className="mt-24 md: mt-36 lg:mt-44">
      {travelStyleItems ? (
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

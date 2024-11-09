"use client"
import React, { useEffect, useState } from "react"
import ListingItems from "./components/ListingItems"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import ListingsMap from "./components/map/index"
import useGetPropertyListings from "./components/map/hooks/use-get-property-listings"
import useGetRentalListings from "./components/map/hooks/use-get-rental-listings"
import PropertiesFilter from "./properties-filter"

type T_Filter = {
  category: string
  type: string
  filterCount: number
}

type ListingItem = {
  listingId: number
  imageKey: {
    fileKey: string
    alt: string
  }[]
  distance: string
  location: string
  date: string
  price: number
  dayTime: string
  ratings: string
  isHearted: boolean
  propertyType: string
  bedrooms: number
  beds: number
  bathrooms: number
}

const dummyData: ListingItem[] = [
  {
    listingId: 1,
    imageKey: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    distance: "2 km",
    location: "Villa Quintero",
    date: "2024-08-10",
    price: 6000,
    dayTime: "per night",
    ratings: "4.5",
    isHearted: true,
    propertyType: "Villas",
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
  },
  {
    listingId: 2,
    imageKey: [
      { fileKey: "3.jpg", alt: "Image 3" },
      { fileKey: "4.jpg", alt: "Image 4" },
    ],
    distance: "5 km",
    location: "Hostel Luna",
    date: "2024-08-12",
    price: 4500,
    dayTime: "per night",
    ratings: "4.7",
    isHearted: false,
    propertyType: "Hostels",
    bedrooms: 4,
    beds: 3,
    bathrooms: 2,
  },
  {
    listingId: 3,
    imageKey: [
      { fileKey: "3.jpg", alt: "Image 3" },
      { fileKey: "4.jpg", alt: "Image 4" },
    ],
    distance: "5 km",
    location: "Villa Graciela",
    date: "2024-08-12",
    price: 3500,
    dayTime: "per night",
    ratings: "4.7",
    isHearted: false,
    propertyType: "Villas",
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
  },
  {
    listingId: 4,
    imageKey: [
      { fileKey: "3.jpg", alt: "Image 3" },
      { fileKey: "4.jpg", alt: "Image 4" },
    ],
    distance: "5 km",
    location: "Hostel de Matamoros",
    date: "2024-08-12",
    price: 5000,
    dayTime: "per night",
    ratings: "4.7",
    isHearted: false,
    propertyType: "Hostels",
    bedrooms: 2,
    beds: 1,
    bathrooms: 2,
  },
  {
    listingId: 5,
    imageKey: [
      { fileKey: "3.jpg", alt: "Image 3" },
      { fileKey: "4.jpg", alt: "Image 4" },
    ],
    distance: "5 km",
    location: "Kawayan Hostel",
    date: "2024-08-12",
    price: 2000,
    dayTime: "per night",
    ratings: "4.7",
    isHearted: false,
    propertyType: "Hostels",
    bedrooms: 2,
    beds: 5,
    bathrooms: 2,
  },
  {
    listingId: 6,
    imageKey: [
      { fileKey: "3.jpg", alt: "Image 3" },
      { fileKey: "4.jpg", alt: "Image 4" },
    ],
    distance: "5 km",
    location: "Nuevo Leon Beach Front Resort",
    date: "2024-08-12",
    price: 2500,
    dayTime: "per night",
    ratings: "4.7",
    isHearted: false,
    propertyType: "Resorts",
    bedrooms: 5,
    beds: 5,
    bathrooms: 5,
  },
]

const filterDataByPayload = (
  data: ListingItem[],
  payload: T_Filter[],
  budget?: { min: number; max: number }
): ListingItem[] => {
  return data.filter((item) => {
    const matchesBudget =
      !budget || (item.price >= budget.min && item.price <= budget.max)

    const matchesPropertyType =
      payload.some(
        (filter) =>
          filter.category === "Properties" && item.propertyType === filter.type
      ) || !payload.some((filter) => filter.category === "Properties")

    const matchesBedrooms =
      payload.some(
        (filter) =>
          filter.category === "Rooms and beds" &&
          filter.type === "Bedrooms" &&
          item.bedrooms >= filter.filterCount
      ) || !payload.some((filter) => filter.type === "Bedrooms")

    const matchesBeds =
      payload.some(
        (filter) =>
          filter.category === "Rooms and beds" &&
          filter.type === "Beds" &&
          item.beds >= filter.filterCount
      ) || !payload.some((filter) => filter.type === "Beds")

    const matchesBathrooms =
      payload.some(
        (filter) =>
          filter.category === "Rooms and beds" &&
          filter.type === "Bathrooms" &&
          item.bathrooms >= filter.filterCount
      ) || !payload.some((filter) => filter.type === "Bathrooms")

    return (
      matchesBudget &&
      matchesPropertyType &&
      matchesBedrooms &&
      matchesBeds &&
      matchesBathrooms
    )
  })
}

const sampleData = [
  {
    _id: "22c955c0-aa54-46d6-8a18-aeabe3a145b6",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Live",
    finishedSections: ["Photos", "Facilities"],
    title: "Beachfront Villa in Cloud 9",
    description:
      "A luxurious villa located near the famous Cloud 9 surfing spot in Siargao.",
    currency: "PHP",
    primaryLanguage: "English",
    price: 1299,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639123456789",
    email: "villaowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcde2",
      city: "General Luna",
      streetAddress: "123 Cloud 9 Drive",
      barangay: "Catangnan",
      longitude: 126.1842,
      latitude: 9.8482,
      howToGetThere:
        "From Sayak Airport, take a tricycle or van to Cloud 9, General Luna.",
    },
    checkInTime: "2024-12-01T14:00:00Z",
    checkOutTime: "2024-12-05T10:00:00Z",
    isLateCheckOutAllowed: true,
    lateCheckOutType: "Hours",
    lateCheckOutValue: 2,
    termsAndConditions: "No pets. Quiet hours from 10 PM.",
    taxId: 123456789,
    companyLegalName: "Siargao Villas Inc.",
    type: "WHOLE_PLACE",
    wholeplaceType: "VILLA",
    facilities: ["64f1b9ab1234567890abcde3"],
    policies: ["64f1b9ab1234567890abcde4"],
    bookableUnits: ["64f1b9ab1234567890abcde5"],
    reservations: [],
    createdAt: "2024-10-20T10:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "436fb4ad-7fff-4ab3-b158-4d79666cf250",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Pending",
    finishedSections: ["Location", "Photos"],
    title: "Siargao Surf Hostel",
    description:
      "A vibrant hostel perfect for surfers and adventurers in the heart of General Luna.",
    currency: "PHP",
    primaryLanguage: "Filipino",
    price: 1399,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639234567890",
    email: "hostelowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcde7",
      city: "General Luna",
      streetAddress: "456 Siargao Blvd",
      barangay: "Poblacion",
      longitude: 126.1571,
      latitude: 9.8462,
      howToGetThere:
        "Take a van or habal-habal from Sayak Airport to Poblacion, General Luna.",
    },
    checkInTime: "2024-11-10T12:00:00Z",
    checkOutTime: "2024-11-15T10:00:00Z",
    isLateCheckOutAllowed: false,
    termsAndConditions: "Shared rooms. No smoking in rooms.",
    taxId: 987654321,
    companyLegalName: "Surf Hostels PH",
    type: "HOSTEL",
    wholeplaceType: null,
    facilities: ["64f1b9ab1234567890abcde8"],
    policies: ["64f1b9ab1234567890abcde9"],
    bookableUnits: ["64f1b9ab1234567890abcdea"],
    reservations: [],
    createdAt: "2024-10-25T11:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "9703ed44-3424-4498-a9ef-04cce2ad7279",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Incomplete",
    finishedSections: ["Photos", "Facilities"],
    title: "Eco-Friendly Cottage",
    description:
      "An eco-conscious stay amidst the coconut trees, perfect for nature lovers.",
    currency: "PHP",
    primaryLanguage: "English",
    price: 1499,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639345678901",
    email: "cottageowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcdec",
      city: "Pilar",
      streetAddress: "789 Coconut Lane",
      barangay: "San Roque",
      longitude: 126.215,
      latitude: 9.866,
      howToGetThere:
        "From General Luna, drive 30 minutes north to San Roque, Pilar.",
    },
    checkInTime: "2024-12-15T13:00:00Z",
    checkOutTime: "2024-12-20T11:00:00Z",
    isLateCheckOutAllowed: true,
    lateCheckOutType: "Hours",
    lateCheckOutValue: 3,
    termsAndConditions: "Respect the environment. No single-use plastics.",
    taxId: 456789012,
    companyLegalName: "Siargao Eco Stays",
    type: "WHOLE_PLACE",
    wholeplaceType: "COTTAGE",
    facilities: ["64f1b9ab1234567890abcdee"],
    policies: ["64f1b9ab1234567890abcde9"],
    bookableUnits: ["64f1b9ab1234567890abcdef"],
    reservations: [],
    createdAt: "2024-10-18T09:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "6d453d76-08a4-4cd6-8253-179b9dee127d",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Live",
    finishedSections: ["Title", "Location", "Photos"],
    title: "Boutique Hotel near Cloud 9",
    description:
      "A stylish boutique hotel offering comfort and convenience near the famous Cloud 9.",
    currency: "USD",
    primaryLanguage: "English",
    price: 1599,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639876543210",
    email: "hotelowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcdf2",
      city: "General Luna",
      streetAddress: "101 Siargao Beach Rd",
      barangay: "Catangnan",
      longitude: 126.165,
      latitude: 9.8481,
      howToGetThere: "A 5-minute walk from Cloud 9 pier.",
    },
    checkInTime: "2024-11-01T14:00:00Z",
    checkOutTime: "2024-11-05T10:00:00Z",
    isLateCheckOutAllowed: true,
    lateCheckOutType: "Hours",
    lateCheckOutValue: 2,
    termsAndConditions: "No pets allowed. Quiet hours after 9 PM.",
    taxId: 678901234,
    companyLegalName: "Siargao Boutique Hotels Inc.",
    type: "HOTEL",
    wholeplaceType: null,
    facilities: ["64f1b9ab1234567890abcdf3"],
    policies: ["64f1b9ab1234567890abcdf4"],
    bookableUnits: ["64f1b9ab1234567890abcdf5"],
    reservations: ["64f1b9ab1234567890abcdf6"],
    createdAt: "2024-09-30T08:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "79271656-734a-4e84-b153-5cb12d86c33e",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Live",
    finishedSections: ["Title", "Location", "Photos", "Facilities"],
    title: "Luxury Resort in Dapa",
    description:
      "A premium resort offering exclusive amenities with stunning ocean views in Dapa, Siargao.",
    currency: "USD",
    primaryLanguage: "English",
    price: 1699,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639987654321",
    email: "resortowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcd02",
      city: "Dapa",
      streetAddress: "456 Ocean View Rd",
      barangay: "Poblacion",
      longitude: 126.1124,
      latitude: 9.7615,
      howToGetThere:
        "Take a ferry from Surigao City to Dapa. The resort is 10 minutes from the port.",
    },
    checkInTime: "2024-12-05T14:00:00Z",
    checkOutTime: "2024-12-10T12:00:00Z",
    isLateCheckOutAllowed: false,
    termsAndConditions: "No outside food allowed. Quiet hours after 10 PM.",
    taxId: 345678901,
    companyLegalName: "Siargao Luxury Resorts Inc.",
    type: "RESORT",
    wholeplaceType: null,
    facilities: ["64f1b9ab1234567890abcd03"],
    policies: ["64f1b9ab1234567890abcd04"],
    bookableUnits: ["64f1b9ab1234567890abcd05"],
    reservations: [],
    createdAt: "2024-09-10T08:30:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "d40a2552-8535-45a5-9fc8-6387ddb8eb50",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Incomplete",
    finishedSections: ["Location", "Photos"],
    title: "Homestay in Del Carmen",
    description:
      "A cozy homestay near the mangrove forest in Del Carmen, offering an authentic Siargao experience.",
    currency: "PHP",
    primaryLanguage: "Filipino",
    price: 1799,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639456789012",
    email: "homestayowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcd07",
      city: "Del Carmen",
      streetAddress: "789 Mangrove Lane",
      barangay: "Poblacion",
      longitude: 126.0702,
      latitude: 9.8813,
      howToGetThere:
        "A 30-minute drive from Sayak Airport. The homestay is near the mangrove boardwalk.",
    },
    checkInTime: "2024-11-20T13:00:00Z",
    checkOutTime: "2024-11-25T11:00:00Z",
    isLateCheckOutAllowed: true,
    lateCheckOutType: "Hours",
    lateCheckOutValue: 2,
    termsAndConditions: "No smoking inside. Keep noise to a minimum.",
    taxId: 567890123,
    companyLegalName: "Siargao Homestay Ventures",
    type: "HOMESTAY",
    wholeplaceType: null,
    facilities: ["64f1b9ab1234567890abcd08"],
    policies: ["64f1b9ab1234567890abcd09"],
    bookableUnits: ["64f1b9ab1234567890abcda1"],
    reservations: [],
    createdAt: "2024-10-10T09:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "5747181e-2209-4007-8039-9d302a3fcf0b",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Live",
    finishedSections: ["Title", "Photos"],
    title: "Modern Bungalow in Pacifico",
    description:
      "A stylish bungalow near the peaceful shores of Pacifico, perfect for relaxation and surfing.",
    currency: "PHP",
    primaryLanguage: "English",
    price: 1899,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639876543221",
    email: "bungalowowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcda3",
      city: "San Isidro",
      streetAddress: "101 Pacifico Dr",
      barangay: "Pacifico",
      longitude: 126.2238,
      latitude: 9.9812,
      howToGetThere:
        "45 minutes north of General Luna, near the Pacifico surf break.",
    },
    checkInTime: "2024-11-05T15:00:00Z",
    checkOutTime: "2024-11-12T11:00:00Z",
    isLateCheckOutAllowed: true,
    lateCheckOutType: "Hours",
    lateCheckOutValue: 3,
    termsAndConditions: "No parties allowed. No loud music after 9 PM.",
    taxId: 234567890,
    companyLegalName: "Siargao Bungalows",
    type: "WHOLE_PLACE",
    wholeplaceType: "BUNGALOW",
    facilities: ["64f1b9ab1234567890abcda4"],
    policies: ["64f1b9ab1234567890abcda5"],
    bookableUnits: ["64f1b9ab1234567890abcda6"],
    reservations: ["64f1b9ab1234567890abcda7"],
    createdAt: "2024-09-15T08:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
  {
    _id: "1106acc5-3e5d-4615-b761-c3675c909205",
    offerBy: "64f1b9ab1234567890abcdef",
    status: "Pending",
    finishedSections: ["Photos", "Facilities"],
    title: "Cottage by the River",
    description:
      "A peaceful cottage along the river in San Benito, offering a rustic getaway in nature.",
    currency: "PHP",
    primaryLanguage: "Filipino",
    price: 1999,
    photos: [
      { fileKey: "1.jpg", alt: "Image 1" },
      { fileKey: "2.jpg", alt: "Image 2" },
    ],
    phone: "+639234567892",
    email: "cottageowner@siargao.com",
    location: {
      _id: "64f1b9ab1234567890abcda9",
      city: "San Benito",
      streetAddress: "33 Riverside St",
      barangay: "Poblacion",
      longitude: 126.0823,
      latitude: 9.9271,
      howToGetThere:
        "A 25-minute drive from Del Carmen, following the road along the river.",
    },
    checkInTime: "2024-10-15T14:00:00Z",
    checkOutTime: "2024-10-20T10:00:00Z",
    isLateCheckOutAllowed: false,
    termsAndConditions: "Respect the nature around. No cutting trees.",
    taxId: 890123456,
    companyLegalName: "Siargao River Cottages",
    type: "WHOLE_PLACE",
    wholeplaceType: "COTTAGE",
    facilities: ["64f1b9ab1234567890abcdab"],
    policies: ["64f1b9ab1234567890abcdac"],
    bookableUnits: ["64f1b9ab1234567890abcdad"],
    reservations: [],
    createdAt: "2024-10-05T07:00:00Z",
    updatedAt: null,
    deletedAt: null,
  },
]

const ListingsPage = () => {
  return (
    <WidthWrapper width="medium" className="-mt-4">
      <div>
        <PropertiesFilter />
      </div>
    </WidthWrapper>
  )
}

export default ListingsPage

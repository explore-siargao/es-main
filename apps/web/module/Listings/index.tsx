"use client"
import React, { useEffect, useState } from "react"
import ListingItems from "./components/ListingItems"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import SideFilter from "./components/SideFilter"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"

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

const ListingsPage = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const type = searchParams.get("type")

  const [filteredData, setFilterData] = useState<any>([])
  const [filters, setFilters] = useState<T_Filter[]>([])
  const [budget, setBudget] = useState<{ min: number; max: number }>({
    min: 1000,
    max: 9000,
  })

  const handleFiltersChange = (newFilters: T_Filter[]) => {
    setFilters(newFilters)
  }

  const handleBudgetChange = (minValue: number, maxValue: number) => {
    setBudget({ min: minValue, max: maxValue })
  }

  useEffect(() => {
    if (category && type) {
      console.log(`Category: ${category}, Type: ${type}`)
      setFilters([
        {
          type: type,
          filterCount: 0,
          category:
            category === "property"
              ? "Properties"
              : category === "activities"
                ? "Activities"
                : category === "rentals"
                  ? "Rentals"
                  : "",
        },
      ])
    }
  }, [category, type])

  useEffect(() => {
    setFilterData(filterDataByPayload(dummyData, filters, budget))
  }, [filters])

  return (
    <WidthWrapper width="medium" className="">
      <div className="flex gap-x-10 mt-14">
        <div className="w-[30%]">
          <SideFilter
            onFiltersChange={handleFiltersChange}
            onBudgetChange={handleBudgetChange}
            listingCategory={category ? category : ""}
            filterItemType={type ? type : ""}
          />
        </div>
        <div className="w-70%">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {filteredData.map((item: any) => (
                <div key={item.listingId}>
                  <ListingItems {...item} />
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="h4" className="text-center mt-20">
              No Data Found
            </Typography>
          )}
        </div>
      </div>
    </WidthWrapper>
  )
}

export default ListingsPage

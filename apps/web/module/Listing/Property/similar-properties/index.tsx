import { Typography } from "@/common/components/ui/Typography"
import useGetListings from "@/module/search/properties/hooks/use-get-listings"
import { E_Location, T_Property_Filtered } from "@repo/contract-2/search-filters"
import React from "react"
import PropertyCard from "./card"

function SimilarProperties() {
  const location = "any"
  const propertyTypes = "any"
  const priceFrom = "any"
  const priceTo = "any"
  const bedroomCount = "any"
  const bedCount = "any"
  const bathroomCount = "any"
  const facilities = "any"
  const amenities = "any"
  const starRating = "any"
  const checkIn = "any"
  const checkOut = "any"
  const numberOfGuest = "any"
  // This need to be change with server fetch request
  const { data: propertyUnits } = useGetListings({
    page: 1,
    location: location as E_Location,
    propertyTypes,
    priceFrom,
    priceTo,
    bedroomCount,
    bedCount,
    bathroomCount,
    facilities,
    amenities,
    starRating,
    checkIn,
    checkOut,
    numberOfGuest,
  })
  const propertiesData = propertyUnits?.items || []
  const getRandomItems = (array: T_Property_Filtered[], count: number) => {
    if (count > array.length) {
      return []
    }
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const randomItems = getRandomItems(propertiesData, 4);
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold" className="mb-2">Similar places</Typography>
      <div className="grid grid-cols-4 space-x-8 mt-5">
        {randomItems.map((card) => (
          <PropertyCard {...card} />
        ))}
      </div>
    </div>
  )
}

export default SimilarProperties

import { Typography } from "@/common/components/ui/Typography"
import useGetRentalListings from "@/module/search/rentals/hooks/use-get-listings"
import { E_Location, T_Rental_Filtered } from "@repo/contract-2/search-filters"
import React from "react"
import RentalCard from "./card"
import { T_Rental } from "@repo/contract-2/rental"

function SimilarRentals() {
  const location = "any"
  const vehicleTypes = "any"
  const transmissionTypes = "any"
  const seatCount = "any"
  const priceFrom = "any"
  const priceTo = "any"
  const starRating = "any"
  const pickUpDate = "any"
  const dropOffDate = "any"

  const { data: rentalUnits } = useGetRentalListings({
    page: 1,
    location: location as E_Location,
    vehicleTypes,
    transmissionTypes,
    seatCount,
    priceFrom,
    priceTo,
    starRating,
    pickUpDate,
    dropOffDate,
  })
  const rentalsData = rentalUnits?.items || []
  const getRandomItems = (array: T_Rental_Filtered[], count: number) => {
    if (count > array.length) {
      return []
    }
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const randomItems = getRandomItems(rentalsData, 4);
  return (
    <div>
      <Typography variant="h2" fontWeight="semibold" className="mb-2">Similar rentals</Typography>
      <div className="grid grid-cols-4 space-x-8 mt-5">
        {randomItems.map((card) => (
          <RentalCard {...card} />
        ))}
      </div>
    </div>
  )
}

export default SimilarRentals

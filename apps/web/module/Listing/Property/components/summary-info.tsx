import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Star } from "lucide-react"
import { T_BookableUnitType } from "@repo/contract"

const SummaryInfo = ({ bookableUnits, reviews, stars, location}: any) => {
  const aggregateDetails = () => {
    if (!bookableUnits) return ""

    const totalGuests = bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) => acc + unit.maxGuests,
      0
    )
    const totalBedrooms = bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) => acc + unit.bedRooms.length,
      0
    )
    const totalBeds = bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) => acc + unit.qty,
      0
    )
    const totalBaths = bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) =>
        acc + (unit.baths ? unit.baths : 0),
      0
    )

    return `${totalGuests} Guests · ${totalBedrooms} Bedrooms · ${totalBeds} Beds · ${totalBaths} Bathrooms`
  }

  return (
    <>
      <Typography variant="h3" fontWeight="semibold">
        {location.streetAddress +
          " " +
          location.barangay +
          ", " +
          location.city}
      </Typography>

      <Typography className="text-sm md:flex mt-1">
        {aggregateDetails()}
      </Typography>

      <div className="flex gap-1 mt-1">
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <div className="flex gap-2 md:flex items-center">
            <Star className="h-4 w-4 fill-black" />
            <Typography>{stars}</Typography>
          </div>
        </button>
        <Typography>4.5</Typography>
        <Typography>&middot;</Typography>
        <button className="hover:underline hover:duration-300 cursor-pointer">
          <Typography>{reviews} Reviews</Typography>
        </button>
      </div>
    </>
  )
}

export default SummaryInfo

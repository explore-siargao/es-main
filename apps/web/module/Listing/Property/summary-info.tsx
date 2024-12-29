import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Star } from "lucide-react"
import { T_BookableUnitType } from "@repo/contract"
import Reviews from "../../Hosting/Reviews/index"

const SummaryInfo = ({ bookableUnits, location }: any) => {
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

  const reviews = bookableUnits.map((unit: any) => {
    const reviews = unit.reviews.map((review: any) => review.totalRates)
    const totalStars = reviews.reduce(
      (sum: number, rating: number) => sum + rating,
      0
    )
    return totalStars / reviews.length
  })

  const totalStars = reviews.reduce(
    (sum: number, rating: number) => sum + rating,
    0
  )
  const averageRating = (totalStars / reviews.length || 0)?.toFixed(1)

  const totalReviews = bookableUnits.reduce(
    (sum: number, unit: any) => sum + unit.reviews.length,
    0
  )

  return (
    <>
      <Typography variant="h4" fontWeight="semibold">
        {location.streetAddress +
          " " +
          location.barangay +
          ", " +
          location.city}
      </Typography>

      <Typography variant="h5" className="md:flex mt-1 text-text-400">
        {aggregateDetails()}
      </Typography>

      <div className="flex gap-1 mt-1 items-center">
        <div className="flex gap-1 md:flex items-center">
          <Star className="h-4 w-4 fill-text-500" />
          <Typography variant="h4" className="text-text-500">
            {averageRating ? averageRating : 0.0}
          </Typography>
        </div>
        <span>·</span>
        <button className="hover:underline transition text-text-500">
          <Typography variant="h4">
            {totalReviews ? totalReviews : 0.0} review
            {totalReviews > 0 ? "s" : ""}
          </Typography>
        </button>
      </div>
    </>
  )
}

export default SummaryInfo

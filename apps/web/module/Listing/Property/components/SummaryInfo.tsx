import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Star } from "lucide-react"
import { T_SummaryInfoProps } from "../types/SummaryInfo"
import { useParams } from "next/navigation"
import useGetPropertyById from "@/module/Hosting/Listings/Properties/hooks/useGetPropertyById"
import { Spinner } from "@/common/components/ui/Spinner"
import { T_BookableUnitType } from "@repo/contract"

const SummaryInfo = ({ address, reviews, stars }: T_SummaryInfoProps) => {
  const params = useParams<{ propertyId: string }>()
  const propertyId = String(params.propertyId)
  const { data, isPending } = useGetPropertyById(propertyId)

  const aggregateDetails = () => {
    if (!data?.item?.bookableUnits) return ""

    const totalGuests = data.item.bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) => acc + unit.maxGuests,
      0
    )
    const totalBedrooms = data.item.bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) => acc + unit.bedRooms,
      0
    )
    const totalBeds = data.item.bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) => acc + unit.qty,
      0
    )
    const totalBaths = data.item.bookableUnits.reduce(
      (acc: number, unit: T_BookableUnitType) =>
        acc + (unit.baths ? unit.baths : 0),
      0
    )

    return `${totalGuests} Guests · ${totalBedrooms} Bedrooms · ${totalBeds} Beds · ${totalBaths} Baths`
  }

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <>
          <Typography variant="h3" fontWeight="semibold">
            {data?.item?.location.streetAddress +
              " " +
              data?.item?.location.barangay +
              ", " +
              data?.item?.location.city}
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
      )}
    </>
  )
}

export default SummaryInfo

"use client"
import { Typography } from "@/common/components/ui/Typography"
import useGetRentalById from "@/module/Hosting/Listings/hooks/useGetRentalById"
import { useParams } from "next/navigation"

const Car = () => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data } = useGetRentalById(listingId)
  const rental = data?.item
  return (
    <>
      <Typography variant="h4" fontWeight="semibold" className="leading-6">
        Details
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Engine Capacity (L):</span>{" "}
        {rental?.details?.engineCapacityLiter}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Condition:</span>{" "}
        {rental?.details?.condition}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Exterior Color:</span>{" "}
        {rental?.details?.exteriorColor}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Interior Color:</span>{" "}
        {rental?.details?.interiorColor}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Seating Capacity:</span>{" "}
        {rental?.details?.seatingCapacity}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Weight Capacity(kg):</span>{" "}
        {rental?.details?.weightCapacityKg}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Have a driver's license:</span>{" "}
        {rental?.details.haveDriverLicense}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Registered and lawful:</span>{" "}
        {rental?.details?.isRegistered}
      </Typography>
    </>
  )
}

export default Car

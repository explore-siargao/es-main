"use client"
import { Typography } from "@/common/components/ui/Typography"
import useGetRentalById from "@/module/Hosting/Listings/hooks/useGetRentalById"
import { useParams } from "next/navigation"

const Motorbike = () => {
  const params = useParams<{ listingId: string }>()
  const listingId = Number(params.listingId)
  const { data } = useGetRentalById(listingId)
  const rental = data?.item
  return (
    <>
      <Typography variant="h4" fontWeight="semibold" className="leading-6">
        Details
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Engine Capacity (CC):</span>{" "}
        {rental?.Details.engineCapacityCc}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Condition:</span>{" "}
        {rental?.Details.condition}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Exterior Color:</span>{" "}
        {rental?.Details.exteriorColor}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Seating Capacity:</span>{" "}
        {rental?.Details.seatingCapacity}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Weight Capacity:</span>{" "}
        {rental?.Details.weightCapacity}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Minimum Age Requirement:</span>{" "}
        {rental?.Details.minAgeReq}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Registered and lawful:</span>{" "}
        {rental?.Details.isRegistered}
      </Typography>
    </>
  )
}

export default Motorbike

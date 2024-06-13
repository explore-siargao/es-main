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
        Basic info
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Category:</span> {rental?.category}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Make:</span> {rental?.make}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Model / Badge:</span>{" "}
        {rental?.modelBadge}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Body:</span> {rental?.bodyType}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Fuel Type:</span> {rental?.fuel}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Transmission:</span>{" "}
        {rental?.transmission}
      </Typography>
      <Typography variant="h5" className="mt-2">
        <span className="font-semibold">Year:</span> {rental?.year}
      </Typography>
    </>
  )
}

export default Car

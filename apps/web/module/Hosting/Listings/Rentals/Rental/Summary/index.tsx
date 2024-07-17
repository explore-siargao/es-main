"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { LucideEye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import useGetRentalById from "../../../hooks/useGetRentalById"
import { E_Rental_Category, E_Rental_Status, T_Photo } from "@repo/contract"
import BasicInfoCar from "./BasicInfo/Car"
import BasicInfoMotorbike from "./BasicInfo/Motorbike"
import BasicInfoBicycle from "./BasicInfo/Bicycle"
import DetailsCar from "./Details/Car"
import DetailsMotorbike from "./Details/Motorbike"
import DetailsBicycle from "./Details/Bicycle"
import useUpdateRentalStatusById from "../hooks/useUpdateRentalStatusById"
import toast from "react-hot-toast"

const RentalSummary = () => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId as string)
  const { data } = useGetRentalById(listingId)
  const rental = data?.item
  const { mutate } = useUpdateRentalStatusById(listingId)
  const handleSubmit = async () => {
    const newStatus = { status: E_Rental_Status.Pending }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success("Rental submitted for review")
          router.push(`/hosting/listings/rentals/${listingId}/basic-info`)
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    await mutate(newStatus, callBackReq)
  }
  const BASIC_INFO = {
    Car: <BasicInfoCar />,
    Motorbike: <BasicInfoMotorbike />,
    Bicycle: <BasicInfoBicycle />,
  }
  const DETAILS = {
    Car: <DetailsCar />,
    Motorbike: <DetailsMotorbike />,
    Bicycle: <DetailsBicycle />,
  }

  return (
    <div className="mt-20 mb-28">
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="flex justify-between items-center pb-4"
      >
        Summary
      </Typography>
      <div className="mt-4">
        <div className="mt-3 border-b border-gray-200 pb-3">
          {BASIC_INFO[data?.item?.category as E_Rental_Category] ?? null}
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          {DETAILS[data?.item?.category as E_Rental_Category] ?? null}
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          <Typography variant="h4" fontWeight="semibold" className="leading-6">
            Add-Ons
          </Typography>
          {rental?.addOns.roofRack && (
            <Typography variant="h5" className="mt-2">
              Roof Rack
            </Typography>
          )}
          {rental?.addOns.babySeat && (
            <Typography variant="h5" className="mt-2">
              Baby Seat
            </Typography>
          )}
          {rental?.addOns?.dashCam && (
            <Typography variant="h5" className="mt-2">
              Dash Cam
            </Typography>
          )}
          {rental?.addOns.boardRack && (
            <Typography variant="h5" className="mt-2">
              Board Rack
            </Typography>
          )}
          {rental?.addOns.includesHelmet && (
            <Typography variant="h5" className="mt-2">
              Includes Helmet
            </Typography>
          )}
          {rental?.addOns.others.length > 0 && (
            <div className="mt-2">
              {rental?.addOns.others.map((addOn: any) => (
                <Typography key={addOn} variant="h5" className="mt-2">
                  {addOn}
                </Typography>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          <Typography variant="h4" fontWeight="semibold" className="leading-6">
            Photos
          </Typography>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {rental?.photos.map((photo: T_Photo, index: number) => (
              <div key={index} className="h-full">
                {photo.isMain && (
                  <div className="flex justify-center">
                    <span className="absolute mt-[-16px] z-10 rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                      Preferred main photo
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    `relative h-52 w-full bg-primary-50 rounded-lg`,
                    photo.isMain && "border-2 border-secondary-500"
                  )}
                >
                  <Image
                    src={"/assets/" + photo.key}
                    alt={`preview-` + index}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-lg"
                  />
                </div>
                <Typography
                  className={`${photo.description ? "text-gray-900" : "text-gray-500"} text-sm mt-3 truncate`}
                >
                  {photo.description || "No description"}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          <Typography variant="h4" fontWeight="semibold" className="leading-6">
            Pricing
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Day rate (24-hour):</span> ₱{" "}
            {rental?.pricing?.dayRate}
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Required Deposit:</span> ₱{" "}
            {rental?.pricing?.requiredDeposit}
          </Typography>
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          <Typography variant="h4" fontWeight="semibold" className="leading-6">
            Location
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Street Address:</span>{" "}
            {rental?.location?.streetAddress}
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">City / Municipality:</span>{" "}
            {rental?.location?.city}
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Barangay / District:</span>{" "}
            {rental?.location?.barangay}
          </Typography>
          <div className="w-1/2">
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">How to get there:</span>{" "}
              {rental?.location?.howToGetThere}
            </Typography>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 bg-text-50 w-full p-4 bg-opacity-60">
        <div className="flex gap-2">
          <Button size="sm" type="submit" onClick={handleSubmit}>
            Submit for review
          </Button>
          <Link href="/accommodation/1" target="_blank">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              className="flex gap-2"
            >
              <LucideEye className="h-4 w-4" /> Preview listing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RentalSummary

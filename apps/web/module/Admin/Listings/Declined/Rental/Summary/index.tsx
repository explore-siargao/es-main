"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { LucideEye } from "lucide-react"
import Image from "@/common/components/ui/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import useGetRentalById from "../../../hooks/useGetRentalById"
import { E_Rental_Category, T_Photo } from "@repo/contract"
import BasicInfoCar from "./BasicInfo/Car"
import BasicInfoMotorbike from "./BasicInfo/Motorbike"
import BasicInfoBicycle from "./BasicInfo/Bicycle"
import DetailsCar from "./Details/Car"
import DetailsMotorbike from "./Details/Motorbike"
import DetailsBicycle from "./Details/Bicycle"

const RentalSummary = () => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data } = useGetRentalById(listingId)
  const rental = data?.item
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
          {rental?.AddOns.roofRack && (
            <Typography variant="h5" className="mt-2">
              Roof Rack
            </Typography>
          )}
          {rental?.AddOns.babySeat && (
            <Typography variant="h5" className="mt-2">
              Baby Seat
            </Typography>
          )}
          {rental?.AddOns.dashCam && (
            <Typography variant="h5" className="mt-2">
              Dash Cam
            </Typography>
          )}
          {rental?.AddOns.boardRack && (
            <Typography variant="h5" className="mt-2">
              Board Rack
            </Typography>
          )}
          {rental?.AddOns.includesHelmet && (
            <Typography variant="h5" className="mt-2">
              Includes Helmet
            </Typography>
          )}
          {rental?.AddOns.other !== "" && (
            <Typography variant="h5" className="mt-2">
              {rental?.AddOns.other}
            </Typography>
          )}
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          <Typography variant="h4" fontWeight="semibold" className="leading-6">
            Photos
          </Typography>
          <div className="grid grid-cols-4 gap-6 mt-6">
            {rental?.Photos.map((photo: T_Photo, index: number) => (
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
                    `relative h-52 w-full bg-primary-50 rounded-xl`,
                    photo.isMain && "border-2 border-secondary-500"
                  )}
                >
                  <Image
                    src={"/assets/" + photo.key}
                    alt={`preview-` + index}
                    fill
                    style={{ objectFit: "cover" }}
                    objectPosition="center"
                    className="rounded-xl"
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
            <span className="font-semibold">Day rate (24-hour):</span> ₱ 2,500
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Required Deposit:</span> ₱ 5,000
          </Typography>
        </div>
        <div className="mt-3 border-b border-gray-200 pb-3">
          <Typography variant="h4" fontWeight="semibold" className="leading-6">
            Location
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Street Address:</span>{" "}
            {rental?.Location.street}
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">City / Municipality:</span>{" "}
            {rental?.Location.city}
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">Barangay / District:</span>{" "}
            {rental?.Location.barangay}
          </Typography>
          <Typography variant="h5" className="mt-2">
            <span className="font-semibold">How to get there:</span>{" "}
            {rental?.Location.howToGetThere}
          </Typography>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 bg-text-50 w-full p-4 bg-opacity-60">
        <div className="flex gap-2">
          <Button size="sm" type="submit">
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

"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import SpecificMap from "@/common/components/SpecificMap"
import Link from "next/link"
import BusinessHoursModal from "./components/modals/BusinessHoursModal"
import { useState } from "react"

type T_Props = {
  coordinates: number[]
  address: string
  phoneNumber: string
  emailAddress: string
  businessHours: T_BusinessHours[]
  facebookLink: string
  instagramLink: string
}

type T_BusinessHours = {
  day: string
  open: string
  close: string
}

const RestaurantLocation = ({
  coordinates,
  address,
  phoneNumber,
  emailAddress,
  businessHours,
  facebookLink,
  instagramLink,
}: T_Props) => {
  const [hourModalOpen, setHourModalOpen] = useState(false)

  return (
    <>
      <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
        <Typography variant="h1" fontWeight="bold" className="mb-4">
          Location
        </Typography>
        <div className="font-semibold h-64 w-full">
          <SpecificMap
            center={coordinates as [number, number]}
            mapHeight="h-64"
            mapWidth="w-full"
          />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="">
              <MapPin />
            </div>
            <div className="w-full group-hover:underline group-hover:underline-offset-2">
              {address}
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <Phone />
            <div className="group-hover:underline group-hover:underline-offset-2">
              {phoneNumber}
            </div>
          </div>
          <button
            className="flex items-center gap-4 w-40 group"
            onClick={() => setHourModalOpen(true)}
          >
            <Clock />
            <div className="group-hover:underline group-hover:underline-offset-2">
              Business Hours
            </div>
          </button>
          <div className="flex items-center space-x-4">
            <Link href={`mailto: ${emailAddress}`}>
              <Mail />
            </Link>
            <Link href={facebookLink} target="_blank">
              <Facebook />
            </Link>
            <Link href={instagramLink} target="_blank">
              <Instagram />
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <Button variant={"primary"} className="w-full">
            WRITE A REVIEW
          </Button>
        </div>
      </div>
      <BusinessHoursModal
        isOpen={hourModalOpen}
        onClose={() => setHourModalOpen(false)}
        businessHours={businessHours}
      />
    </>
  )
}

export default RestaurantLocation

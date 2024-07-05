"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { AtSign, MapPin, Phone } from "lucide-react"
import SpecificMap from "@/common/components/SpecificMap"

const RestaurantLocation = ({ coordinates }: { coordinates: number[] }) => {
  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
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
        <div className="flex items-center gap-4">
          <div className="">
            <MapPin />
          </div>
          <div className="w-full">
            Tourism Road, General Luna, Siargao Island, Surigao del Norte,
            Philippines
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Phone />
          <div>09123456789</div>
        </div>
        <div className="flex items-center gap-4">
          <AtSign />
          <div>restaurantemail@gmail.com</div>
        </div>
      </div>
      <div className="mt-8">
        <Button variant={"primary"} className="w-full">
          WRITE A REVIEW
        </Button>
      </div>
    </div>
  )
}

export default RestaurantLocation

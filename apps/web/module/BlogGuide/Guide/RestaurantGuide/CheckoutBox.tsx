"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { AtSign, MapPin, Phone } from "lucide-react"

const RestaurantLocation = () => {
  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        Location
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="bg-primary-200 h-64 flex items-center justify-center rounded-md"></div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center gap-4">
          <div className="">
            <MapPin />
          </div>
          <div className="w-full">
            Tourism Road, General Luna, Siargao Island, Surigao del Norte, Philippines
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Phone />
          <div>
            09123456789
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AtSign />
          <div>
           restaurantemail@gmail.com
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Button variant={"primary"} className="w-full">WRITE A REVIEW</Button>
      </div>
    </div>
  )
}

export default RestaurantLocation

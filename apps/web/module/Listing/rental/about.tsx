import React from "react"
import { Check } from "lucide-react"
import { E_Rental_Category, T_Rental } from "@repo/contract-2/rental"
import { Typography } from "@/common/components/ui/Typography"

const About = ({ rental }: { rental: T_Rental }) => {
  let listing: string[] = []
  if (rental.category === E_Rental_Category.Motorbike) {
    listing = [
      `${rental.details?.condition} condition`,
      `${rental.details?.exteriorColor} exterior color`,
      `${rental.details?.weightCapacityKg} kilogram capacity`,
      `${rental.details?.engineCapacityCc} cc`,
      `${rental.transmission} transmission`,
      `${rental.details?.seatingCapacity} seating capacity`,
      `${rental.fuel} fuel`,
    ]
  } else if (rental.category === E_Rental_Category.Car) {
    listing = [
      `${rental?.bodyType} body type`,
      `${rental.details?.condition} condition`,
      `${rental.details?.interiorColor} interior color`,
      `${rental.details?.exteriorColor} exterior color`,
      `${rental.details?.weightCapacityKg} kilogram capacity`,
      `${rental.transmission} transmission`,
      `${rental.details?.engineCapacityLiter} liter${(rental.details?.engineCapacityLiter || 0) > 1 ? "s" : ""}`,
      `${rental.details?.seatingCapacity} seating capacity`,
      `${rental.fuel} fuel`,
    ]
  } else if (rental.category === E_Rental_Category.Bicycle) {
    listing = [
      `${rental.details?.condition} condition`,
      `${rental.details?.exteriorColor} exterior color`,
      `${rental.details?.weightCapacityKg} kilogram capacity`,
    ]
  }
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        About this rental
      </Typography>
      <div className="mt-2">
        <div className="grid grid-cols-2">
          {listing.map((rental: any, index: number) => (
            <div key={index} className="flex my-3">
              <Check className="text-primary-700 mr-2" />
              {rental}
            </div>
          ))}
          {rental.details?.isRegistered === "Yes" && (
            <div className="flex my-3">
              <Check className="text-primary-700 mr-2" /> Up-to-date registration
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default About

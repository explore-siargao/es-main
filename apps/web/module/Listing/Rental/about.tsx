import React from "react"
import { Check } from "lucide-react"
import { TitleSection } from "./title-section"
import { E_Rental_Category, T_Rental } from "@repo/contract-2/rental"

type T_Listing = { label: string; text: string | number | undefined | null }

const About = ({ rental }: { rental: T_Rental }) => {
  let listing: T_Listing[] = []
  if (rental.category === E_Rental_Category.Motorbike) {
    listing = [
      { label: "Condition", text: rental.details?.condition },
      { label: "Exterior Color", text: rental.details?.exteriorColor },
      { label: "Weight Capacity(kg)", text: rental.details?.weightCapacityKg },
      {
        label: "Engine Capacity(Cc)",
        text: rental.details?.engineCapacityCc,
      },
      { label: "Transmission", text: rental.transmission },
      { label: "Seating Capacity", text: rental.details?.seatingCapacity },
      { label: "Fuel", text: rental.fuel },
    ]
  } else if (rental.category === E_Rental_Category.Car) {
    listing = [
      { label: "Body type", text: rental.bodyType },
      { label: "Condition", text: rental.details?.condition },
      { label: "Interior Color", text: rental.details?.interiorColor },
      { label: "Exterior Color", text: rental.details?.exteriorColor },
      { label: "Weight Capacity(kg)", text: rental.details?.weightCapacityKg },
      { label: "Transmission", text: rental.transmission },
      {
        label: "Engine Capacity(L)",
        text: rental.details?.engineCapacityLiter,
      },
      { label: "Seating Capacity", text: rental.details?.seatingCapacity },
      { label: "Fuel", text: rental.fuel },
    ]
  } else if (rental.category === E_Rental_Category.Bicycle) {
    listing = [
      { label: "Condition", text: rental.details?.condition },
      { label: "Exterior Color", text: rental.details?.exteriorColor },
      { label: "Weight Capacity(kg)", text: rental.details?.weightCapacityKg },
    ]
  }
  return (
    <>
      <TitleSection size="lg" title="About this rental">
        <div className="grid grid-cols-2">
          {listing.map((rental: any, index: number) => (
            <div key={index} className="flex my-3">
              <Check className="text-primary-500 mr-2" />
              {rental.label} {rental.text}
            </div>
          ))}
          {rental.details?.isRegistered === "Yes" && (
            <div className="flex my-3">
              <Check className="text-primary-500 mr-4" />
              Registered
            </div>
          )}
        </div>
      </TitleSection>
    </>
  )
}

export default About

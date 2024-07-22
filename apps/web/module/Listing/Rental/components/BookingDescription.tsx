import React from "react"
import { Check, LucideX } from "lucide-react"
import { TitleSection } from "./TitleSection"
import { T_BookingAboutDescriptionProps } from "../types/BookingAboutDescription"

const BookingDescription = ({ aboutData }: T_BookingAboutDescriptionProps) => {
  let properties: any = []
  if (aboutData?.category === "Motorbike") {
    properties = [
      { label: "Condition", text: aboutData.condition },
      { label: "Exterior Color", text: aboutData.exteriorColor },
      { label: "Weight Capacity(kg)", text: aboutData.weightCapacityKg },
      {
        label: "Engine Capacity(Cc)",
        text: aboutData.engineCapacityCc,
      },
      { label: "Transmission", text: aboutData.transmission },
      { label: "Seating Capacity", text: aboutData.seatingCapacity },
      { label: "Fuel", text: aboutData?.fuel },
    ]
  } else if (aboutData?.category === "Car") {
    properties = [
      { label: "Body type", text: aboutData.bodyType },
      { label: "Condition", text: aboutData.condition },
      { label: "Interior Color", text: aboutData.interiorColor },
      { label: "Exterior Color", text: aboutData.exteriorColor },
      { label: "Weight Capacity(kg)", text: aboutData.weightCapacityKg },
      { label: "Transmission", text: aboutData.transmission },
      {
        label: "Engine Capacity(L)",
        text: aboutData.engineCapacityLiter,
      },
      { label: "Seating Capacity", text: aboutData.seatingCapacity },
      { label: "Fuel", text: aboutData?.fuel },
    ]
  } else if (aboutData?.category === "Bicycle") {
    properties = [
      { label: "Condition", text: aboutData.condition },
      { label: "Exterior Color", text: aboutData.exteriorColor },
      { label: "Weight Capacity(kg)", text: aboutData.weightCapacityKg },
    ]
  }
  return (
    <>
      <TitleSection size="lg" title="About this Rental">
        <div className="grid grid-cols-2">
          {properties.map((property: any, index: number) => (
            <div key={index} className="flex my-3">
              <Check className="text-primary-500 mr-2" />
              {property.label} {property.text}
            </div>
          ))}
          {aboutData?.isRegistered === "Yes" && (
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

export default BookingDescription

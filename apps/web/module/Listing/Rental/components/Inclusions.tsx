import React from "react"
import { Check, X } from "lucide-react"
import { TitleSection } from "./TitleSection"

const Inclusions = ({ rentalData, group }: any) => {
  const fieldsToDisplay = [
    { key: "roofRack", label: "Roof Rack" },
    { key: "boardRack", label: "Board Rack" },
    { key: "babySeat", label: "Baby Seat" },
    { key: "dashCam", label: "Dash Cam" },
    { key: "includesHelmet", label: "Includes Helmet" },
    { key: "others", label: "Others" },
  ]

  return (
    <>
      <TitleSection size="lg" title="Inclusions">
        <div className="grid grid-cols-2">
          {fieldsToDisplay.map(({ key, label }) =>
            key === "others" && !rentalData[key] ? null : (
              <div key={key} className="flex my-3">
                {rentalData[key] ? (
                  <Check className="text-primary-500 mr-4" />
                ) : (
                  <X className="text-error-500 mr-4" />
                )}
                {key === "others" && rentalData[key]
                  ? `${label}: ${rentalData[key]}`
                  : label}
              </div>
            )
          )}
        </div>
      </TitleSection>
    </>
  )
}

export default Inclusions

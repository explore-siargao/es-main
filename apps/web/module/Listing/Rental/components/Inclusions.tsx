import React from "react"
import { Check, X } from "lucide-react"
import { TitleSection } from "./TitleSection"
import { keys } from "lodash"

const Inclusions = ({ rentalData, group }: any) => {
  const fieldsToDisplay = [
    { key: "roofRack", label: "Roof Rack" },
    { key: "boardRack", label: "Board Rack" },
    { key: "babySeat", label: "Baby Seat" },
    { key: "dashCam", label: "Dash Cam" },
    { key: "includesHelmet", label: "Includes Helmet" },
  ]

  if (rentalData && rentalData["others"].length > 0) {
    rentalData["others"].forEach((item: any) => {
      fieldsToDisplay.push({ key: item, label: item })
    })
  }

  return (
    <>
      <TitleSection size="lg" title="Inclusions">
        <div className="grid grid-cols-2">
          {rentalData ? fieldsToDisplay.map(({ key, label }) =>
            key === "others" && !rentalData[key] ? null : (
              <div key={key} className="flex my-3">
                {rentalData[key] ||
                rentalData[key] === rentalData["others"][key] ? (
                  <Check className="text-primary-500 mr-4" />
                ) : (
                  <X className="text-error-500 mr-4" />
                )}
                {key === "others" && rentalData[key] ? "" : label || "Others"}
              </div>
            )
          ) : null}
        </div>
      </TitleSection>
    </>
  )
}

export default Inclusions

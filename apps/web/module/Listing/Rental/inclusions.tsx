import React from "react"
import { Check, X } from "lucide-react"
import { TitleSection } from "./title-section"
import { T_Rental } from "@repo/contract-2/rental"

const Inclusions = ({ rental }: { rental: T_Rental }) => {
  const addOns = rental.addOns
  const fieldsToDisplay = [
    { key: "roofRack", label: "Roof Rack", selected: addOns?.roofRack },
    { key: "boardRack", label: "Board Rack", selected: addOns?.boardRack },
    { key: "babySeat", label: "Baby Seat", selected: addOns?.babySeat },
    { key: "dashCam", label: "Dash Cam", selected: addOns?.dashCam },
    {
      key: "includesHelmet",
      label: "Includes Helmet",
      selected: addOns?.includesHelmet,
    },
  ]

  if (addOns?.others && addOns?.others.length > 0) {
    addOns?.others.forEach((item: any) => {
      fieldsToDisplay.push({ key: item, label: item, selected: true })
    })
  }

  return (
    <>
      <TitleSection size="lg" title="Inclusions">
        <div className="grid grid-cols-2">
          {rental
            ? fieldsToDisplay.map(({ key, label, selected }) =>
                key === "others" ? null : (
                  <div key={key} className="flex my-3">
                    {selected ? (
                      <Check className="text-primary-500 mr-4" />
                    ) : (
                      <X className="text-error-500 mr-4" />
                    )}
                    {label}
                  </div>
                )
              )
            : null}
        </div>
      </TitleSection>
    </>
  )
}

export default Inclusions

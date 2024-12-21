import React from "react"
import { LucideCheck, LucideX } from "lucide-react"
import { T_Rental } from "@repo/contract-2/rental"
import { Typography } from "@/common/components/ui/Typography"

const Inclusions = ({ rental }: { rental: T_Rental }) => {
  const addOns = rental.addOns
  const fieldsToDisplay = [
    { key: "roofRack", label: "Roof rack", selected: addOns?.roofRack },
    { key: "boardRack", label: "Board rack", selected: addOns?.boardRack },
    { key: "babySeat", label: "Baby seat", selected: addOns?.babySeat },
    { key: "dashCam", label: "Dash cam", selected: addOns?.dashCam },
    {
      key: "includesHelmet",
      label: "Includes helmet",
      selected: addOns?.includesHelmet,
    },
  ]

  if (addOns?.others && addOns?.others.length > 0) {
    addOns?.others.filter(item => item !== "" && item !== null).forEach((item: string) => {
      fieldsToDisplay.push({ key: item, label: item, selected: true })
    })
  }

  return (
    <>
      <div>
        <Typography variant="h2" fontWeight="semibold">
          Inclusions
        </Typography>
        <div className="mt-2">
          <div className="grid grid-cols-2">
            {rental
              ? fieldsToDisplay.map(({ key, label, selected }) =>
                key === "others" ? null : (
                  <div key={key} className="flex my-3">
                    {selected ? (
                      <LucideCheck className="text-primary-500 mr-4" />
                    ) : (
                      <LucideX className="text-error-500 mr-4" />
                    )}
                    {label}
                  </div>
                )
              )
              : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default Inclusions

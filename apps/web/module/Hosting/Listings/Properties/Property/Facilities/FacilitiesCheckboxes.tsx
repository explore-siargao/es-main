import React, { ReactNode } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Textarea } from "@/common/components/ui/Textarea"
import useSelectFacilityStore2 from "./store/useSelectFacilityStore"

type Props = {
  title: string
  icon: ReactNode
}

const FacilitiesCheckboxes = ({ title, icon }: Props) => {
  const facilities = useSelectFacilityStore2(
    (state) => state.facilities
  ).filter((facility) => facility.category === title)
  const updateFacility = useSelectFacilityStore2(
    (state) => state.updateFacility
  )
  return (
    <div>
      <div className="flex items-center space-x-2.5">
        {icon}
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
      </div>
      {facilities.map((facility) => (
        <div key={facility.facility} className="mt-2">
          <fieldset>
            <input
              id={facility.facility}
              type="checkbox"
              checked={facility.isSelected}
              onChange={(e) =>
                updateFacility({ ...facility, isSelected: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor={facility.facility} className="pl-2 text-sm pt-4">
              {facility.facility}
            </label>
          </fieldset>
        </div>
      ))}
    </div>
  )
}
export default FacilitiesCheckboxes

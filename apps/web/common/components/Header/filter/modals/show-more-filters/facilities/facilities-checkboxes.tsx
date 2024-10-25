import React, { ReactNode } from "react"
import { Typography } from "@/common/components/ui/Typography"
import useSelectFacilityStore from "../../../store/use-select-facility-store"

type Props = {
  title: string
  icon: ReactNode
  gridView?: boolean
}

const FacilitiesCheckboxes = ({ title, icon, gridView }: Props) => {
  const facilities = useSelectFacilityStore(
    (state) => state.facilities
  ).filter((facility) => facility.category === title)
  const updateFacility = useSelectFacilityStore(
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
      <div className={gridView ? "grid grid-cols-3" : "mt-2"}>
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
    </div>
  )
}
export default FacilitiesCheckboxes

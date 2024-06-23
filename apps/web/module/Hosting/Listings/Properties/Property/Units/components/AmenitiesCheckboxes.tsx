import React, { ReactNode } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Textarea } from "@/common/components/ui/Textarea"
import useSelectAmenityStore from "../store/useSelectAmenityStore"

type Props = {
  title: string
  icon: ReactNode
}

const AmenitiesCheckboxes = ({ title, icon }: Props) => {
  const facilities = useSelectAmenityStore(
    (state) => state.amenities
  ).filter((facility) => facility.category === title)
  const updateFacility = useSelectAmenityStore(
    (state) => state.updateAmenity
  )
  return (
    <div>
      <div className="flex items-center space-x-2.5">
        {icon}
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
      </div>
      {facilities.map((amenity) => (
        <div key={amenity.amenity} className="mt-2">
          <fieldset>
            <input
              id={amenity.amenity}
              type="checkbox"
              checked={amenity.isSelected}
              onChange={(e) =>
                updateFacility({ ...amenity, isSelected: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor={amenity.amenity} className="pl-2 text-sm pt-4">
              {amenity.amenity}
            </label>
          </fieldset>
        </div>
      ))}
    </div>
  )
}
export default AmenitiesCheckboxes

import React, { ReactNode } from "react"
import { Typography } from "@/common/components/ui/Typography"
import useSelectAmenityStore from "../../../store/use-select-amenity-store"

type Props = {
  title: string
  icon: ReactNode
  gridView?: boolean
}

const AmenitiesCheckboxes = ({ title, icon, gridView }: Props) => {
  const amenities = useSelectAmenityStore((state) => state.amenities).filter(
    (amenity) => amenity.category === title
  )
  const updateAmenity = useSelectAmenityStore((state) => state.updateAmenity)
  return (
    <div>
      <div className="flex items-center space-x-2.5">
        {icon}
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
      </div>
      <div className={gridView ? "grid grid-cols-3" : "mt-2"}>
        {amenities.map((amenity) => (
          <div key={amenity.amenity} className="mt-2">
            <fieldset>
              <input
                id={amenity.amenity}
                type="checkbox"
                checked={amenity.isSelected}
                onChange={(e) =>
                  updateAmenity({ ...amenity, isSelected: e.target.checked })
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
    </div>
  )
}
export default AmenitiesCheckboxes

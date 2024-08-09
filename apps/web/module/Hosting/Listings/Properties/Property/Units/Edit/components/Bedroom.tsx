import { Typography } from "@/common/components/ui/Typography"
import { LucidePlus } from "lucide-react"
import React, { useState } from "react"
import AddBedroomModal from "./AddBedroomModal"
import { useBedroomStore } from "../store/useBedroomStore"
import { Button } from "@/common/components/ui/Button"

type T_Prop = {
  unitType: string
}

const Bedroom = ({ unitType }: T_Prop) => {
  const bedrooms = useBedroomStore((state) => state.bedrooms)
  const deleteBedroom = useBedroomStore((state) => state.deleteBedroom)
  const [isAddBedroomModalOpen, setIsAddBedroomModalOpen] = useState(false)

  const handleAddButtonClick = () => {
    setIsAddBedroomModalOpen(true)
  }

  const isSingleBedroom = bedrooms.length >= 1
  const displayBedrooms =
    unitType === "Studio" ? bedrooms.slice(0, 1) : bedrooms
  return (
    <div>
      <div>
        <div className="flex items-center "></div>
        <div className="grid grid-cols-2 gap-x-7 gap-y-2">
          {displayBedrooms.map((bedroomArray, index) => {
            return (
              <React.Fragment key={bedroomArray.bedRoomName}>
                <div className="mt-2 rounded-lg p-4 border w-full border-text-200">
                  <Typography variant="h4">
                    {unitType === "Studio"
                      ? "Living Room"
                      : `Bedroom ${index + 1}`}{" "}
                  </Typography>
                  {bedroomArray.beds
                    .filter((bed) => bed.qty > 0)
                    .map((bed, bedIndex, filteredBeds) => (
                      <span key={bed.name} className="text-text-400 text-sm">
                        {bed.qty} {bed.name}
                        {bedIndex !== filteredBeds.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </div>
                {unitType !== "Studio" && (
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => deleteBedroom(index)}
                      className="underline text-md"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <button
          type="button"
          onClick={handleAddButtonClick}
          className="text-text-400 text-sm flex items-center gap-2 p-2 mt-2 hover:font-semibold transition"
        >
          <LucidePlus className="h-4 w-4" />
          {unitType === "Studio"
            ? isSingleBedroom
              ? "Edit Living Room"
              : "Add Living Room"
            : "Add Bedroom"}
        </button>
      </div>
      <AddBedroomModal
        isOpen={isAddBedroomModalOpen}
        onClose={() => setIsAddBedroomModalOpen(false)}
        mode={unitType === "Studio" && isSingleBedroom ? "edit" : "add"}
        selectedIndex={0}
        unitType={unitType}
      />
    </div>
  )
}

export default Bedroom

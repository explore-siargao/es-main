import { Typography } from "@/common/components/ui/Typography"
import { LucidePlus } from "lucide-react"
import React, { useState } from "react"
import AddBedroomModal from "./AddBedroomModal"
import {
  useBedroomStore,
  useBedroomStudioStore,
} from "../store/useBedroomStore"
import { Button } from "@/common/components/ui/Button"

type T_Prop = {
  unitType: string
  category?: string
}

const Bedroom = ({ unitType, category }: T_Prop) => {
  const bedrooms = useBedroomStore((state) => state.bedrooms)
  const deleteBedroom = useBedroomStore((state) => state.deleteBedroom)
  const [isAddBedroomModalOpen, setIsAddBedroomModalOpen] = useState(false)

  const handleAddButtonClick = () => {
    setIsAddBedroomModalOpen(true)
  }

  const isSingleBedroom = bedrooms.length >= 1
  const displayBedrooms =
    unitType === "STUDIO" ? bedrooms.slice(0, 1) : bedrooms
  return (
    <div>
      <div>
        <div className="flex items-center "></div>
        <div className="grid grid-cols-2 gap-y-2">
          {displayBedrooms.map((bedroomArray, index) => {
            return (
              <React.Fragment key={bedroomArray.roomName}>
                <div className=" rounded-xl px-3 py-2 border w-full border-text-200">
                  <Typography variant="h4" fontWeight="semibold">
                    {category === "Room" && unitType !== "STUDIO"
                      ? `Bed ${index + 1}`
                      : unitType === "STUDIO"
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
                {unitType !== "STUDIO" && (
                  <div className="flex items-center ml-6">
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
          {unitType === "STUDIO"
            ? isSingleBedroom
              ? "Edit Living Room"
              : "Add beds in living room"
            : "Add beds"}
        </button>
      </div>
      <AddBedroomModal
        isOpen={isAddBedroomModalOpen}
        onClose={() => setIsAddBedroomModalOpen(false)}
        mode={unitType === "STUDIO" && isSingleBedroom ? "edit" : "add"}
        selectedIndex={0}
        unitType={unitType}
        category={category}
      />
    </div>
  )
}

export default Bedroom

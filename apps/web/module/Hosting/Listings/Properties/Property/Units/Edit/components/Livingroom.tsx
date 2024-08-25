import { Typography } from "@/common/components/ui/Typography"
import { LucidePlus } from "lucide-react"
import React, { useState } from "react"
import AddLivingroomModal from "./AddLivingRoomModal"
import { useLivingroomStore } from "../store/useLivingroomStore"
import { IBedroom } from "../../types"

type T_Prop = {
  unitType: string
  onLivingroomUpdate: (updatedLivingroom: IBedroom[]) => void
}

const Livingroom = ({ unitType, onLivingroomUpdate }: T_Prop) => {
  const livingroom = useLivingroomStore((state) => state.livingroom)
  const [isAddLivingroomModalOpen, setIsAddLivingroomModalOpen] =
    useState(false)
  const setLivingroom = useLivingroomStore((state) => state.updateLivingrooms)

  const handleAddButtonClick = () => {
    setIsAddLivingroomModalOpen(true)
  }

  const isSingleBedroom = livingroom.length >= 1
  const displayLivingroom =
    unitType !== "Studio" ? livingroom.slice(0, 1) : livingroom

  const handleUpdateLivingroom = (updatedLivingroom: IBedroom[]) => {
    onLivingroomUpdate(updatedLivingroom)
    setLivingroom(updatedLivingroom)
  }

  const handleCloseModal = () => {
    setIsAddLivingroomModalOpen(false)
  }

  const mode = unitType !== "Studio" && isSingleBedroom ? "edit" : "add"
  const selectedIndex = isSingleBedroom ? 0 : undefined

  const buttonText =
    unitType !== "Studio"
      ? isSingleBedroom
        ? "Edit Living Room"
        : "Add Living Room"
      : "Add Bedroom"

  return (
    <div>
      <div>
        <div className="flex items-center"></div>
        <div className="grid grid-cols-2 gap-x-7 gap-y-2">
          {displayLivingroom.map((bedroomArray, index) => (
            <React.Fragment key={bedroomArray.roomName}>
              <div className="mt-2 rounded-xl px-3 py-2 border w-full border-text-200">
                <Typography variant="h4">
                  {unitType !== "Studio"
                    ? "Living Room"
                    : `Bedroom ${index + 1}`}
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
            </React.Fragment>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddButtonClick}
          className="text-text-400 text-sm flex items-center gap-2 p-2 mt-2 hover:font-semibold transition"
        >
          <LucidePlus className="h-4 w-4" />
          {buttonText}
        </button>
      </div>
      <AddLivingroomModal
        isOpen={isAddLivingroomModalOpen}
        onClose={handleCloseModal}
        mode={mode}
        selectedIndex={selectedIndex}
        unitType={unitType}
        onUpdate={handleUpdateLivingroom}
      />
    </div>
  )
}

export default Livingroom

import React, { useState, useEffect } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import toast from "react-hot-toast"

interface IRoomQuantity {
  defaultQuantity: number
  customQuantity: {
    date: string
    quantity: number
  }[]
}

interface IRoomQuantityEditModalProps {
  isModalOpen: boolean
  onClose: () => void
  selectedDate: string
  roomQuantity: IRoomQuantity
  setRoomQuantity: Function
  category: string
}

const RoomQuantityEdit = ({
  isModalOpen,
  onClose,
  selectedDate,
  roomQuantity,
  setRoomQuantity,
  category,
}: IRoomQuantityEditModalProps) => {
  const [quantity, setQuantity] = useState(roomQuantity.defaultQuantity)

  useEffect(() => {
    // Check if there is a custom quantity for the selected date
    const customQuantity = getCustomQuantity(selectedDate)
    if (customQuantity !== null) {
      setQuantity(customQuantity)
    } else {
      setQuantity(roomQuantity.defaultQuantity)
    }
  }, [selectedDate, roomQuantity])

  const getCustomQuantity = (date: string): number | null => {
    const customEntry = roomQuantity.customQuantity.find(
      (entry) => entry.date === date
    )
    return customEntry ? customEntry.quantity : null
  }

  const handleSave = () => {
    const updatedCustomQuantity = [...roomQuantity.customQuantity]
    const existingIndex = updatedCustomQuantity.findIndex(
      (entry) => entry.date === selectedDate
    )

    if (existingIndex !== -1) {
      updatedCustomQuantity[existingIndex] = { date: selectedDate, quantity }
    } else {
      updatedCustomQuantity.push({ date: selectedDate, quantity })
    }

    setRoomQuantity((prevRoomQuantity: any) => ({
      ...prevRoomQuantity,
      customQuantity: updatedCustomQuantity,
    }))
    toast.success("Custom room quantity has been saved.")
    onClose()
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title={"Edit Room Quantity"}
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex justify-between items-center"
            >
              Room quantity for {category}
            </Typography>
            <Input
              type="number"
              min={0}
              defaultValue={quantity}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10)
                if (!isNaN(newValue)) {
                  setQuantity(newValue)
                }
              }}
              placeholder="Room quantity"
              label={`${selectedDate}`}
              className="w-[50%]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} variant="primary" className="mr-2">
            Save
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default RoomQuantityEdit

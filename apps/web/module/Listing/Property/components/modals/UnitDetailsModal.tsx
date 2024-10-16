import { useEffect } from "react"
import { Button } from "@/common/components/ui/Button"
import { T_BookableUnitType } from "@repo/contract"
import Image from "@/common/components/ui/image"
import ModalContainer from "@/common/components/ModalContainer"

type UnitDetailsModalProps = {
  isOpen: boolean
  onClose: () => void
  unit: T_BookableUnitType | null
  onConfirm: () => void
}

const UnitDetailsModal = ({
  isOpen,
  onClose,
  unit,
  onConfirm,
}: UnitDetailsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen || !unit) return null

  return (
    <ModalContainer
      title="Unit Details"
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{unit.title}</h2>
        {unit.photos && unit.photos.length > 0 && (
          <Image
            className="rounded-xl relative mb-4"
            src={`/assets/${unit.photos[0]?.key || "default-image-key"}`}
            width={600}
            height={300}
            alt={"Unit Image"}
          />
        )}
        <div className="mb-2">Category: {unit.category}</div>
        <div className="mb-2">base: {unit.baseRate}</div>
        <div className="mb-2">Beds: {unit.bed}</div>
        <div className="mb-2">Size: {unit.totalSize} Square meters</div>
        <div className="mb-2">Guests Capacity: {unit.maxGuests}</div>
        <div className="mb-2">Description: {unit.description}</div>
        <Button onClick={onConfirm} variant="primary" className="mt-4">
          Confirm
        </Button>
      </div>
    </ModalContainer>
  )
}

export default UnitDetailsModal

import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"

interface MapConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  markerCoordinates?: { lat: number; lng: number } | null
  onConfirm: () => void
  setOverlay: (value: boolean) => void
}

const ConfirmationMapLocationModal = ({
  isOpen,
  onClose,
  onConfirm,
  setOverlay,
  markerCoordinates,
}: MapConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm()
    setOverlay(true)
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title="Confirm location"
    >
      <div className="p-5">
        {markerCoordinates && (
          <div>
            <Typography variant="h5" fontWeight="normal">
              <i>
                By clicking "confirm" you are ensuring that you have selected
                your desired location.
              </i>
            </Typography>
          </div>
        )}
        <div className="flex gap-4 justify-end mt-8">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="primary">
            Confirm
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ConfirmationMapLocationModal

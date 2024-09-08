"use client"
import React, { useMemo } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import ModalContainer from "@/common/components/ModalContainer"
import dynamic from "next/dynamic"

type Props = {
  isOpen: boolean
  onClose: () => void
  currentCoords: [number, number]
  handleMarkerSetter: (coords: { lat: number; lng: number }) => void
  markerIsSet: boolean
  setInitialCoords: (coords: [number, number]) => void
}

const LocationSetterModal = ({ isOpen, onClose, currentCoords, handleMarkerSetter, markerIsSet, setInitialCoords }: Props) => {
  const DynamicModalMapWithPin = useMemo(() => dynamic(
    () => import('../../components/ModalMapWithPin'),
    {
        loading: () => <p>Loading...</p>,
        ssr: false
    }
  ), [isOpen])

  return (
    <ModalContainer
    isOpen={isOpen}
    onClose={onClose}
    title="Location"
    size="md"
  >
    <DynamicModalMapWithPin
      center={currentCoords}
      zoom={12}
      onMarkerSet={handleMarkerSetter}
      scrollWheelZoomEnabled
    />
    <div className="px-4 pt-4">
      <Typography variant="h5" className="italic text-gray-500">
        You can drag and drop the yellow marker above or you can also click anywhere on the map to set your exact listing
        location.
      </Typography>
    </div>
    <div className="p-4 flex justify-end">
      <Button
        variant="primary"
        onClick={() => {
          if (markerIsSet) {
            setInitialCoords(currentCoords)
            onClose()
          }
        }}
        className="focus:outline-none focus:ring-0"
        disabled={!markerIsSet}
      >
        Save Location
      </Button>
    </div>
  </ModalContainer>
  )
}

export default LocationSetterModal
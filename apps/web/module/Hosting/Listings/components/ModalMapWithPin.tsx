import React, { useState } from "react"
import { TileLayer, Marker, useMapEvent } from "react-leaflet"
import "leaflet/dist/leaflet.css"
// We have to changed leaflet version from 1.7.1 to 1.4.0 for windy
import { Icon, LatLngTuple, LeafletEvent, LeafletMouseEvent } from "leaflet"
import { WEB_URL } from "@/common/constants/ev"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"

interface SpecificMapProps {
  center: [number, number]
  zoom?: number
  scrollWheelZoomEnabled?: boolean
  onMarkerSet?: (coords: { lat: number; lng: number }) => void | undefined
  disablePinMovement?: boolean
}

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const ModalMapWithPin = ({
  center,
  zoom,
  scrollWheelZoomEnabled,
  onMarkerSet,
  disablePinMovement = false,
}: SpecificMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const [position, setPosition] = useState<[number, number] | null>(null)
  const handleMarkerDragEnd = (event: LeafletEvent) => {
    const newCoordinates = event.target.getLatLng()
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
    if (onMarkerSet) {
      onMarkerSet({ lat: newCoordinates.lat, lng: newCoordinates.lng })
    }
  }

  const handleMapClick = (event: LeafletMouseEvent) => {
    if (!disablePinMovement) {
      const newCoordinates = event.latlng
      setPosition([newCoordinates.lat, newCoordinates.lng])
      setCoordinates(newCoordinates.lat, newCoordinates.lng)
      if (onMarkerSet) {
        onMarkerSet({ lat: newCoordinates.lat, lng: newCoordinates.lng })
      }
    }
  }

  const MapClickHandler = () => {
    useMapEvent("click", handleMapClick)
    return null
  }

  return (
    <MapContainerWrapper
      center={center}
      zoom={zoom ? zoom : 13}
      scrollWheelZoom={scrollWheelZoomEnabled}
      className="h-[52rem]"
      rounded="rounded-none"
    >
      <MapClickHandler />
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={markerIcon}
        position={(position ? position : center) as LatLngTuple}
        draggable={!disablePinMovement}
        eventHandlers={{
          dragend: handleMarkerDragEnd,
        }}
      />
    </MapContainerWrapper>
  )
}

export default ModalMapWithPin

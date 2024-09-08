import React from "react"
import {
  TileLayer,
  Marker,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon, LatLngTuple } from "leaflet"
import { WEB_URL } from "@/common/constants/ev"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"

interface SpecificMapProps {
  center: [number, number]
  zoom?: number
  scrollWheelZoomEnabled?: boolean
  disablePinMovement?: boolean
  className?: string
}

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const MapWithPin = ({
  center,
  zoom,
  scrollWheelZoomEnabled,
  disablePinMovement = false,
  className,
}: SpecificMapProps) => {

  return (
    <MapContainerWrapper
      center={center}
      zoom={zoom ? zoom : 13}
      scrollWheelZoom={scrollWheelZoomEnabled}
      className={`h-80 ${className}`}
    >
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={markerIcon}
        position={center as LatLngTuple}
        draggable={!disablePinMovement}
      />
    </MapContainerWrapper>
  )
}

export default MapWithPin

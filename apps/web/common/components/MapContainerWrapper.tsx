import React from "react"
import { MapContainer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface SpecificMapProps {
  center: [number, number]
  zoom?: number
  scrollWheelZoom?: boolean
  className?: React.ReactNode
  children: React.ReactNode
  rounded?: 'rounded-2xl' | 'rounded-none'
}

const MapContainerWrapper = ({
  center,
  zoom,
  scrollWheelZoom,
  className,
  children,
  rounded = "rounded-2xl",
}: SpecificMapProps) => {
  return (
    // TODO: ADD LOADING SPINNER USING PROPS
    <div
      className={`${className} flex-1 block bg-primary-200 relative ${rounded}`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        className={`${rounded}`}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 30,
        }}
      >
        {children}
      </MapContainer>
    </div>
  )
}

export default MapContainerWrapper

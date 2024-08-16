"use client"
import React, { useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
import { WEB_URL } from "@/common/constants/ev"
import { Button } from "../../ui/Button"

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [-3, -76],
})

const Minimap = () => {
  const [currentCoords] = useState<[number, number]>([9.913431, 126.049483])

  return (
    <div className="border border-gray-300 max-w-xs shadow-sm rounded-md overflow-hidden">
      <div className="relative flex items-center justify-center h-40">
        <MapContainer
          center={currentCoords}
          zoom={9}
          scrollWheelZoom={false}
          dragging={false}
          attributionControl={false}
          zoomControl={false}
          className="absolute inset-0 z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker icon={markerIcon} position={currentCoords}></Marker>
        </MapContainer>
        <div className="absolute bottom-4 left-0 w-full flex items-center justify-center z-20">
          <Button>Show on map</Button>
        </div>
      </div>
    </div>
  )
}

export default Minimap

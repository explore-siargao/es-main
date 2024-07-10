"use client"
import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Spinner } from "./ui/Spinner"
import { Icon, LatLngTuple } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import { WEB_URL } from "../constants/ev"
interface SpecificMapProps {
  center: [number, number]
  mapHeight: string
  mapWidth: string
  zoom?: number
  className?: React.ReactNode
  onMarkerSet?: (coords: { lat: number; lng: number }) => void | undefined
  scrollWheelZoomEnabled?: boolean
}

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [-3, -76],
})

const SpecificMap = ({
  center,
  mapHeight,
  mapWidth,
  zoom,
  onMarkerSet,
  className,
  scrollWheelZoomEnabled,
}: SpecificMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const [position, setPosition] = useState<[number, number] | null>(null)

  const handleMarkerDragEnd = (event: L.LeafletEvent) => {
    const newCoordinates = event.target.getLatLng()
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
    if (onMarkerSet) {
      onMarkerSet({ lat: newCoordinates.lat, lng: newCoordinates.lng })
    }
  }

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    const newCoordinates = event.latlng
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
    if (onMarkerSet) {
      onMarkerSet({ lat: newCoordinates.lat, lng: newCoordinates.lng })
    }
  }

  const MapClickHandler = () => {
    useMapEvent("click", handleMapClick)
    return null
  }

  const [showMap, setShowMap] = useState(false)
  const HandleResize = () => {
    setShowMap(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true)
    }, 1500)
    window.addEventListener("resize", HandleResize)
    return () => clearTimeout(timer)
  }, [HandleResize])

  return (
    <div className={`${className}`}>
      <div className="flex-1 block bg-primary-200 rounded-2xl">
        <div className={`${mapHeight} ${mapWidth} relative rounded-2xl`}>
          {showMap ? (
            <MapContainer
              center={center}
              zoom={zoom ? zoom : 13}
              scrollWheelZoom={scrollWheelZoomEnabled}
              className="rounded-2xl"
              style={{
                height: "100%",
                width: "100%",
                zIndex: 30,
              }}
            >
              <MapClickHandler />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                icon={markerIcon}
                position={(position ? position : center) as LatLngTuple}
                draggable={true}
                eventHandlers={{
                  dragend: handleMarkerDragEnd,
                }}
              ></Marker>
            </MapContainer>
          ) : (
            <div
              className={`flex h-full flex-1 flex-col justify-center items-center`}
            >
              <Spinner variant="primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpecificMap

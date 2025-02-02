"use client"
import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Spinner } from "./ui/Spinner"
// We have to changed leaflet version from 1.7.1 to 1.4.0 for windy
import { Icon, LatLngTuple } from "leaflet"
import { WEB_URL } from "../constants/ev"

interface SpecificMapProps {
  center: [number, number]
  mapHeight: string
  mapWidth: string
  zoom?: number
  setCoordinates: (lat: number, lng: number) => void
  isRoundedEdge?: boolean
}

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [-3, -76],
})

const CustomSpecificMap = ({
  center,
  mapHeight,
  mapWidth,
  zoom,
  setCoordinates,
  isRoundedEdge,
}: SpecificMapProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null)

  const handleMarkerDragEnd = (event: any) => {
    const newCoordinates = event.target.getLatLng()
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
  }

  const handleMapClick = (event: any) => {
    const newCoordinates = event.latlng
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
  }

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    })
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
    <div
      className={`${isRoundedEdge && "rounded-xl"} flex-1 block bg-primary-200`}
    >
      <div className={`${mapHeight} ${mapWidth} relative`}>
        {showMap ? (
          <MapContainer
            center={center}
            zoom={zoom ? zoom : 13}
            scrollWheelZoom={true}
            style={{
              height: "100%",
              width: "100%",
              zIndex: 30,
            }}
            className={isRoundedEdge ? "rounded-xl" : ""}
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
  )
}

export default CustomSpecificMap

import React, { useState, useEffect, useRef, ReactNode } from "react"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"
import { TileLayer, Popup, useMapEvent } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngTuple, LeafletMouseEvent } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import { T_Markers } from "."
import CustomMarker from "./custom-marker"

interface MultipleMarkerMapProps {
  center: [number, number]
  markerLocations: T_Markers[]
  zoom?: number
  scrollWheelZoom?: boolean
  isSurfGuide?: boolean
  markerFileName?: string
}

const MultiMarkerMap = ({
  center,
  markerLocations,
  zoom,
  scrollWheelZoom,
}: MultipleMarkerMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const markerRefs = useRef<Map<number, L.Marker>>(new Map())
  const popupRefs = useRef<Map<number, L.Popup>>(new Map())

  const handleMapClick = (event: LeafletMouseEvent) => {
    const newCoordinates = event.latlng
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
  }

  const MapClickHandler = () => {
    useMapEvent("click", handleMapClick)
    return null
  }

  const handleMarkerMouseOver = (index: number) => {
    const marker = markerRefs.current.get(index)
    marker?.openPopup()
  }

  return (
    <MapContainerWrapper
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className="h-[70vh]"
    >
      <MapClickHandler />
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerLocations.map((location, index) => {
        if (!location?.latitude || !location?.longitude) {
          console.error(`Invalid location data at index ${index}`)
          return null
        }

        return (
          <CustomMarker
            position={[location.latitude, location.longitude] as LatLngTuple}
            key={index}
            onClick={() => handleMarkerMouseOver(index)}
            price={location.price}
          >
            <Popup
              ref={(el) => {
                if (el) {
                  popupRefs.current.set(index, el)
                }
              }}
              position={[location.latitude, location.longitude] as LatLngTuple}
              offset={[0, -2]}
            ></Popup>
          </CustomMarker>
        )
      })}
    </MapContainerWrapper>
  )
}

export default MultiMarkerMap

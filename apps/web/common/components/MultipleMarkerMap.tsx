import React, { useState, useEffect, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Spinner } from "./ui/Spinner"
import { Icon, LatLngTuple, LeafletMouseEvent } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import { WEB_URL } from "../constants/ev"
import Image from "next/image"
import Link from "next/link"

interface MarkerLocation {
  lat: number
  long: number
  name: string
  surfingLevel?: string
  cuisine?: string
  isCity?: boolean
}

interface MultipleMarkerMapProps {
  center: [number, number]
  markerLocations: MarkerLocation[]
  mapHeight: string
  mapWidth: string
  zoom?: number
  className?: React.ReactNode
  onMarkerSet?: (coords: { lat: number; lng: number }) => void | undefined
  scrollWheelZoomEnabled?: boolean
  imagePlace?: string
  isSurfGuide?: boolean
  iconMarker?: "surf" | "restaurant" | "island"
}

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const surfMarkerIcon = new Icon({
  iconUrl: `${WEB_URL}/surf-map-icon.png`,
  iconSize: [30, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const restaurantMarkerIcon = new Icon({
  iconUrl: `${WEB_URL}/restaurant-map-icon.png`,
  iconSize: [28, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const islandMarkerIcon1 = new Icon({
  iconUrl: `${WEB_URL}/island-map-icon-1.png`,
  iconSize: [30, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const islandMarkerIcon2 = new Icon({
  iconUrl: `${WEB_URL}/island-map-icon-2.png`,
  iconSize: [28, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const getMarkerIcon = (
  iconMarker: string | undefined,
  isCity: boolean | undefined
) => {
  let markerIconToUse

  if (iconMarker === "surf") {
    markerIconToUse = surfMarkerIcon
  } else if (iconMarker === "restaurant") {
    markerIconToUse = restaurantMarkerIcon
  } else if (iconMarker === "island" && isCity) {
    markerIconToUse = islandMarkerIcon2
  } else if (iconMarker === "island" && !isCity) {
    markerIconToUse = islandMarkerIcon1
  } else {
    markerIconToUse = markerIcon
  }

  return markerIconToUse
}

const MultipleMarkerMap = ({
  center,
  markerLocations,
  mapHeight,
  mapWidth,
  zoom,
  onMarkerSet,
  className,
  scrollWheelZoomEnabled,
  imagePlace,
  isSurfGuide,
  iconMarker,
}: MultipleMarkerMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const [placeNames, setPlaceNames] = useState<{ [key: number]: string }>({})

  const markerRefs = useRef<Map<number, L.Marker>>(new Map())
  const popupRefs = useRef<Map<number, L.Popup>>(new Map())

  useEffect(() => {
    const fetchAllPlaceNames = async () => {
      const newPlaceNames: any = {}

      for (const [index, location] of markerLocations.entries()) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.long}&addressdetails=1&extratags=0`
          )
          const data = await response.json()
          const { town, road, village } = data.address || {}
          const formattedAddress = `${town ? town + ", " : ""}${road ? road + ", " : ""}${village ? village + "" : ""}`
          newPlaceNames[index] = formattedAddress || "Unknown place"
        } catch (error) {
          console.error(`Error fetching place name for marker ${index}:`, error)
          newPlaceNames[index] = "Unknown place"
        }
      }

      setPlaceNames(newPlaceNames)
    }

    fetchAllPlaceNames()
  }, [markerLocations])

  const handleMapClick = (event: LeafletMouseEvent) => {
    const newCoordinates = event.latlng
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
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", HandleResize)
    }
  }, [])

  const handleMarkerMouseOver = (index: number) => {
    const marker = markerRefs.current.get(index)
    marker?.openPopup()
  }

  const handleMarkerMouseOut = (index: number) => {
    const marker = markerRefs.current.get(index)
    marker?.closePopup()
  }

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
              {markerLocations.map((location, index) => {
                if (!location?.lat || !location?.long) {
                  console.error(`Invalid location data at index ${index}`)
                  return null
                }

                return (
                  <Marker
                    icon={getMarkerIcon(iconMarker, location.isCity)}
                    position={[location.lat, location.long] as LatLngTuple}
                    draggable={false}
                    key={index}
                    ref={(el) => {
                      if (el) {
                        markerRefs.current.set(index, el)
                      }
                    }}
                    eventHandlers={{
                      mouseover: () => handleMarkerMouseOver(index),
                      mouseout: () => handleMarkerMouseOut(index),
                    }}
                  >
                    <button
                      onMouseEnter={() => handleMarkerMouseOver(index)}
                      onMouseLeave={() => handleMarkerMouseOut(index)}
                    >
                      <Popup
                        ref={(el) => {
                          if (el) {
                            popupRefs.current.set(index, el)
                          }
                        }}
                      >
                        <div className="w-32 grid ">
                          {imagePlace ? (
                            <Image
                              src={imagePlace}
                              alt=""
                              width={150}
                              height={100}
                              className="bg-gray-200 rounded-md"
                            />
                          ) : null}
                          <span className="mt-2 font-semibold">
                            {location.name}
                          </span>
                          <span>
                            {location.cuisine ? location.cuisine : ""}
                          </span>
                          <span>
                            {location.surfingLevel ? location.surfingLevel : ""}
                          </span>
                          <span className="mt-2 ">
                            {placeNames[index] || "Loading place name..."}
                          </span>
                          {isSurfGuide ? (
                            <span className="mt-2">
                              Skill level required: Intermediate
                            </span>
                          ) : null}
                          <Link href={""} className=" mt-2">
                            <span className="underline text-primary-600 hover:text-primary-700 text-start">
                              {" "}
                              View Guides
                            </span>
                          </Link>
                        </div>
                      </Popup>
                    </button>
                  </Marker>
                )
              })}
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

export default MultipleMarkerMap

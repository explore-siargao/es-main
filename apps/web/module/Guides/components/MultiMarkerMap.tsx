import React, { useState, useEffect, useRef } from "react"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"
import { TileLayer, Marker, Popup, useMapEvent } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon, LatLngTuple, LeafletMouseEvent } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import Image from "next/image"
import Link from "next/link"
import { WEB_URL } from "@/common/constants/ev"

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
  zoom?: number
  scrollWheelZoom?: boolean
  imagePlace?: string
  isSurfGuide?: boolean
  markerFileName?: string
}

const MultiMarkerMap = ({
  center,
  markerLocations,
  zoom,
  scrollWheelZoom,
  imagePlace,
  isSurfGuide,
  markerFileName,
}: MultipleMarkerMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const [placeNames, setPlaceNames] = useState<{ [key: number]: string }>({})

  const markerRefs = useRef<Map<number, L.Marker>>(new Map())
  const popupRefs = useRef<Map<number, L.Popup>>(new Map())

  // TODO: Refactor this to a custom hook
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
  }

  const MapClickHandler = () => {
    useMapEvent("click", handleMapClick)
    return null
  }

  const handleMarkerMouseOver = (index: number) => {
    const marker = markerRefs.current.get(index)
    marker?.openPopup()
  }

  const handleMarkerMouseOut = (index: number) => {
    const marker = markerRefs.current.get(index)
    marker?.closePopup()
  }

  const customMarker = new Icon({
    iconUrl: `${WEB_URL}/${markerFileName}`,
    iconSize: [28, 35],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  })

  return (
    <MapContainerWrapper
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className="h-80 sm:h-[735px] md:h-[470px] lg:h-[500px]"
    >
      <MapClickHandler />
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerLocations.map((location, index) => {
        if (!location?.lat || !location?.long) {
          console.error(`Invalid location data at index ${index}`)
          return null
        }

        return (
          <Marker
            icon={customMarker}
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
                  <span className="mt-2 font-semibold">{location.name}</span>
                  <span>{location.cuisine ? location.cuisine : ""}</span>
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
    </MapContainerWrapper>
  )
}

export default MultiMarkerMap

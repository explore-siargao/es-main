import React, { useState, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Spinner } from "./ui/Spinner"
import { divIcon, Icon, LatLngTuple } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import { WEB_URL } from "../constants/ev"
import Image from "next/image"
import { Button } from "./ui/Button"
import formatCurrency from "../helpers/formatCurrency"

interface SpecificMapProps {
  center: [number, number]
  mapHeight: string
  mapWidth: string
  zoom?: number
  className?: React.ReactNode
  onMarkerSet?: (coords: { lat: number; lng: number }) => void | undefined
  scrollWheelZoomEnabled?: boolean
  imagePlace?: string
  isPriceMarker?: boolean
  priceData?: number
}

const markerIcon = new Icon({
  iconUrl: `${WEB_URL}/marker.png`,
  iconSize: [35, 35],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
})

const priceMarkerIcon = (price?: number) =>
  divIcon({
    className: "custom-marker",
    html: `<div class="relative min-w-20 min-h-7 bg-white rounded-full shadow-lg">
  <div class="flex items-center justify-center p-1">
  <strong>
  ${price ? formatCurrency(price, "Philippines") : "&#8369;0.00"}
  </strong>
  </div>
  <div class="flex justify-center">
  <div class="absolute bottom-0 translate-y-2"
   style="border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #fff;">
  </div>
  </div>
  </div>`,
    iconAnchor: [40, 18],
    popupAnchor: [0, -20],
  })

const SpecificMap = ({
  center,
  mapHeight,
  mapWidth,
  zoom,
  onMarkerSet,
  className,
  scrollWheelZoomEnabled,
  imagePlace,
  isPriceMarker,
  priceData,
}: SpecificMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [placeName, setPlaceName] = useState<string>("")

  useEffect(() => {
    fetchPlaceName(center[0], center[1])
  }, [center])

  const fetchPlaceName = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      )
      const data = await response.json()
      setPlaceName(data.display_name || "Unknown place")
    } catch (error) {
      console.error("Error fetching place name:", error)
      setPlaceName("Unknown place")
    }
  }

  const handleMarkerDragEnd = (event: L.LeafletEvent) => {
    const newCoordinates = event.target.getLatLng()
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
    fetchPlaceName(newCoordinates.lat, newCoordinates.lng)
    if (onMarkerSet) {
      onMarkerSet({ lat: newCoordinates.lat, lng: newCoordinates.lng })
    }
  }

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    const newCoordinates = event.latlng
    setPosition([newCoordinates.lat, newCoordinates.lng])
    setCoordinates(newCoordinates.lat, newCoordinates.lng)
    fetchPlaceName(newCoordinates.lat, newCoordinates.lng)
    if (onMarkerSet) {
      onMarkerSet({ lat: newCoordinates.lat, lng: newCoordinates.lng })
    }
  }

  const handleMarkerEvents = (marker: L.Marker) => {
    const popup = marker.getPopup()

    marker.on("mouseover", () => {
      marker.openPopup()
    })

    marker.on("mouseout", () => {
      if (!popup?.isOpen) {
        marker.closePopup()
      }
    })

    popup?.on("mouseover", () => {
      marker.openPopup()
    })

    popup?.on("mouseout", () => {
      marker.closePopup()
    })
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
                icon={isPriceMarker ? priceMarkerIcon(priceData) : markerIcon}
                position={(position ? position : center) as LatLngTuple}
                draggable={true}
                eventHandlers={{
                  dragend: handleMarkerDragEnd,
                }}
                ref={(marker) => {
                  if (marker) {
                    handleMarkerEvents(marker)
                  }
                }}
              >
                <Popup autoClose={false} closeOnClick={false}>
                  <div className="w-32 grid">
                    {imagePlace ? (
                      <Image
                        src={imagePlace}
                        alt=""
                        width={150}
                        height={100}
                        className="bg-gray-200 rounded-md"
                      />
                    ) : null}
                    {placeName}
                    <span>Difficulty: Intermediate</span>
                    <Button variant={"link"} className="underline">
                      View Guides
                    </Button>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="flex h-full flex-1 flex-col justify-center items-center">
              <Spinner variant="primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpecificMap

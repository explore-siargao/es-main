import React, { useState, useEffect, useRef, ReactNode } from "react"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"
import { TileLayer, Marker, Popup, useMapEvent } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngTuple, LeafletMouseEvent, divIcon } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import Image from "@/common/components/ui/image"
import Link from "next/link"
import { T_Markers } from "."

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
  isSurfGuide,
  markerFileName,
}: MultipleMarkerMapProps) => {
  const { setCoordinates } = useCoordinatesStore()
  const [placeNames, setPlaceNames] = useState<{ [key: number]: string }>({})

  const markerRefs = useRef<Map<number, L.Marker>>(new Map())
  const popupRefs = useRef<Map<number, L.Popup>>(new Map())

  const CustomMarker = ({ position, onClick, price, children }: { position: LatLngTuple, onClick: () => void, price: number, children: ReactNode }) => {
    const [isClicked, setIsClicked] = useState(false)
  
    const handleMarkerClick = () => {
      setIsClicked(prev => !prev)
      onClick()
    }
  
    const customIcon = divIcon({
      className: 'custom-marker',
      html: `<div style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: ${isClicked ? '#4b5563' : 'white'};
        border-radius: 15px;
        padding: 5px 10px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        font-weight: bold;
        color: ${isClicked ? 'white' : 'black'};
        text-align: center;
      ">₱${price}</div>`,
      iconSize: [50, 30],
    })
  
    return (
      <Marker
        position={position}
        icon={customIcon}
        eventHandlers={{
          click: () => handleMarkerClick(), // Handle the marker click event
        }}
      >
        {children}
      </Marker>
    )
  }

  // TODO: Refactor this to a custom hook
  useEffect(() => {
    const fetchAllPlaceNames = async () => {
      const newPlaceNames: any = {}

      for (const [index, location] of markerLocations.entries()) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&addressdetails=1&extratags=0`
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
            >
              <div className="w-32 grid ">
                {location.photos ? (
                  <Image
                    src={`/assets/${location.photos.fileKey}`}
                    alt=""
                    width={150}
                    height={100}
                    className="bg-gray-200 rounded-md"
                  />
                ) : null}
                <span className="mt-2 font-semibold">{location.name}</span>
                <span className="mt-2 ">
                  {placeNames[index] || "Loading place name..."}
                </span>
                {isSurfGuide ? (
                  <span className="mt-2">
                    Skill level required: Intermediate
                  </span>
                ) : null}
                <Link href={`/listing/property/${location._id}`} target="_blank" className=" mt-2">
                  <span className="underline text-primary-600 hover:text-primary-700 text-start">
                    View property
                  </span>
                </Link>
              </div>
            </Popup>
          </CustomMarker>
        )
      })}
    </MapContainerWrapper>
  )
}

export default MultiMarkerMap

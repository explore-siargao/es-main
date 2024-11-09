import React, { useRef } from "react"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"
import { TileLayer, useMapEvent, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngTuple, LeafletMouseEvent } from "leaflet"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
// import { Feature, Geometry } from "geojson";
import Marker from "./marker"
import { T_Property_Card } from "../card"
import Popup from "./popup"

type T_Props = {
  center: [number, number]
  units: T_Property_Card[]
  zoom?: number
  scrollWheelZoom?: boolean
}
// https://github.com/faeldon/philippines-json-maps
// const generalLunaGeoJson: Feature<Geometry> = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Polygon",
//     "coordinates": [
//       [
//         [126.1501691, 9.721637],
//         [126.1601691, 9.721637],
//         [126.1601691, 9.731637],
//         [126.1501691, 9.731637],
//         [126.1501691, 9.721637]
//       ]
//     ]
//   }
// };

const Dynamic = ({
  center,
  units,
  zoom,
  scrollWheelZoom,
}: T_Props) => {
  const { setCoordinates } = useCoordinatesStore()
  const markerRefs = useRef<Map<number, L.Marker>>(new Map())

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
      {units.map((unit, index) => {
        if (!unit.location?.latitude || !unit.location?.longitude) {
          console.error(`Invalid location data at index ${index}`)
          return null
        }
        return (
          <Marker
            position={[unit.location?.latitude, unit.location?.longitude] as LatLngTuple}
            key={index}
            onClick={() => handleMarkerMouseOver(index)}
            price={unit.price}
          >
            <Popup
              index={index}
              {...unit}
            />
          </Marker>
        )
      })}
      {/* <GeoJSON
        data={generalLunaGeoJson}
        style={{
          color: "blue",
          weight: 2,
          fillColor: "lightblue",
          fillOpacity: 0.1
        }}
      /> */}
    </MapContainerWrapper>
  )
}

export default Dynamic

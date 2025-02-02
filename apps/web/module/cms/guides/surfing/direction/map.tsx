import React from "react"
import MapContainerWrapper from "@/common/components/Map/MapContainerWrapper"
import { TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Marker from "./marker"
import { LatLngTuple } from "leaflet"

type T_Props = {
  center: [number, number]
  zoom?: number
  scrollWheelZoom?: boolean
}

const Map = ({ center, zoom, scrollWheelZoom }: T_Props) => {
  return (
    <MapContainerWrapper
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className="h-full"
      rounded="rounded-2xl"
    >
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={
          center as LatLngTuple
        }
      />
    </MapContainerWrapper>
  )
}

export default Map

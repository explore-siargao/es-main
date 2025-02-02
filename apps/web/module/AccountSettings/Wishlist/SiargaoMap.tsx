import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useRef, useState } from "react"
import MapCustomPopup from "@/common/components/MapCustomPopup"
// We have to changed leaflet version from 1.7.1 to 1.4.0 for windy
import { Icon } from "leaflet"
import useSessionStore from "@/common/store/useSessionStore"
import { useParams } from "next/navigation"
import useGetWishGroupByUserAndTitle from "../hooks/useGetWishGroupByUserAndTitle"
import useMarkerHoverStore from "@/common/store/useMarkerHoverStore"

const navIcon = new Icon({
  iconUrl: "/primary-marker.svg",
  iconAnchor: [12, 0],
})

const navIconHover = new Icon({
  iconUrl: "/secondary-marker.svg",
  iconAnchor: [12, 0],
})

const SiargaoMap = () => {
  const mapRef = useRef(null)
  const [markerRefs, setMarkerRefs] = useState([])

  const isHover = useMarkerHoverStore((state) => state.isHover)
  const selectedHoverMarker = useMarkerHoverStore((state) => state.selectedItem)

  const session = useSessionStore((state) => state)
  const params = useParams()
  const { data, isLoading } = useGetWishGroupByUserAndTitle(
    session.id as number,
    params?._id as string
  )

  const showPopup = (index: any) => {
    const map = mapRef.current
    if (!map) {
      return
    }

    const marker = markerRefs[index]
    if (marker) {
      // @ts-ignore
      marker.openPopup()
    }
  }

  const closePopup = (index: any) => {
    const map = mapRef.current
    if (!map) {
      return
    }

    const marker = markerRefs[index]
    if (marker) {
      // @ts-ignore
      marker.closePopup()
    }
  }

  useEffect(() => {
    // @ts-ignore
    if (data?.items?.length > 0) {
      // @ts-ignore
      setMarkerRefs(Array(data.items.length).fill(null))

      const map = mapRef.current
      const bounds = data?.items?.map((item) => [
        item.listing.latitude,
        item.listing.longitude,
      ])

      // @ts-ignore
      map.target.fitBounds([bounds])
    }
  }, [data])

  return (
    <>
      <MapContainer
        center={[9.9, 126.03]}
        zoom={11}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 30,
        }}
        // @ts-ignore
        whenReady={(map: any) => {
          mapRef.current = map
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.items?.length !== 0 &&
          data?.items?.map((item, index) => (
            <Marker
              key={index}
              position={[item.listing.latitude, item.listing.longitude]}
              icon={
                selectedHoverMarker === item.id && isHover
                  ? navIconHover
                  : navIcon
              }
              // @ts-ignore
              ref={(el) => (markerRefs[index] = el)}
            >
              <MapCustomPopup
                itemId={item.id}
                price={
                  item.listing.price.fee +
                  item.listing.price.serviceFee +
                  item.listing.price.cleaningFee
                }
                isNight={false}
                images={item.listing.images}
                location={item.listing.address}
                rating={"0.0"}
                onClose={() => closePopup(index)}
              />
            </Marker>
          ))}
      </MapContainer>
    </>
  )
}

export default SiargaoMap

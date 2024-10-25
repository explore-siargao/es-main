import dynamic from "next/dynamic"

const DynamicMultiMarkerMap = dynamic(() => import("./multi-marker-map"), {
  ssr: false,
})

export type T_Markers = {
  _id: string,
  city: string,
  streetAddress: string,
  barangay: string,
  longitude: number,
  latitude: number,
  howToGetThere: string,
  name: string,
  currency: string,
  price: number,
  photos: { fileKey: string, alt: string }
}

type T_Props = {
  markers: T_Markers[]
  iconMarker?: "surf" | "restaurant" | "island"
}

const ListingsMap = ({
  markers,
  iconMarker,
}: T_Props) => {
  const getMarkerFileName = (
    iconMarker: string | undefined,
    isCity: boolean | undefined
  ) => {
    let markerIconToUse

    if (iconMarker === "surf") {
      markerIconToUse = "surf-map-icon.png"
    } else if (iconMarker === "restaurant") {
      markerIconToUse = "restaurant-map-icon.png"
    } else if (iconMarker === "island" && isCity) {
      markerIconToUse = "island-map-icon-2.png"
    } else if (iconMarker === "island" && !isCity) {
      markerIconToUse = "island-map-icon-1.png"
    } else {
      markerIconToUse = "marker.png"
    }

    return markerIconToUse
  }
  
  return (
    <div className="w-full">
      <div>
        <DynamicMultiMarkerMap
          markerLocations={markers}
          center={[9.8813, 126.0702]}
          zoom={12}
          markerFileName={getMarkerFileName(iconMarker, markers[0]?.city ? true : false)}
        />
      </div>
    </div>
  )
}

export default ListingsMap

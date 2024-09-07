import { Typography } from "@/common/components/ui/Typography"
import data from "../data.json"
import dynamic from "next/dynamic"

const DynamicMultiMarkerMap = dynamic(() => import("./MultiMarkerMap"), {
  ssr: false,
})

type T_Markers = {
  lat: number
  long: number
  name: string
  causine?: string
  isCity?: boolean
}

type T_Props = {
  contentTitle: string
  contentText: string[]
  markers: T_Markers[]
  iconMarker?: "surf" | "restaurant" | "island"
}

const GuideContent = ({
  contentTitle,
  contentText,
  markers,
  iconMarker,
}: T_Props) => {
  const images = data.surfGuide.images
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
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <Typography
          variant="h1"
          fontWeight="bold"
          className="mb-6 text-text-500"
        >
          {contentTitle}
        </Typography>
        {contentText.map((paragraph, index) => (
          <div key={index}>
            <Typography variant="p" className="text-text-500">
              {paragraph}
            </Typography>
            <br />
          </div>
        ))}
      </div>
      <div>
        <DynamicMultiMarkerMap
          markerLocations={markers}
          center={[9.835667, 126.049483]}
          imagePlace={`/assets/${images[0]?.fileKey}`}
          zoom={11}
          markerFileName={getMarkerFileName(iconMarker, markers[0]?.isCity)}
        />
      </div>
    </div>
  )
}

export default GuideContent

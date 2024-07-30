import MultipleMarkerMap from "@/common/components/MultipleMarkerMap"
import { Typography } from "@/common/components/ui/Typography"
import data from "../data.json"
type T_Markers = {
  lat: number
  long: number
  name: string
}

type T_Props = {
  contentTitle: string
  contentText: string[]
  markers: T_Markers[]
}

const GuideContent = ({ contentTitle, contentText, markers }: T_Props) => {
  const images = data.surfGuide.images
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
        <MultipleMarkerMap
          markerLocations={markers}
          center={[9.835667, 126.049483]}
          imagePlace={`/assets/${images[0]?.fileKey}`}
          mapHeight={"h-80 sm:h-[735px] md:h-[470px] lg:h-[500px]"}
          mapWidth={"w-full"}
          zoom={11}
        />
      </div>
    </div>
  )
}

export default GuideContent

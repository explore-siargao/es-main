import MultipleMarkerMap from "@/common/components/MultipleMarkerMap"
import SpecificMap from "@/common/components/SpecificMap"
import { Typography } from "@/common/components/ui/Typography"

type T_Markers = {
  lat: number
  long: number
}

type T_Props = {
  contentTitle: string
  contentText: string[]
  markers: T_Markers[]
}

const GuideContent = ({ contentTitle, contentText, markers }: T_Props) => {
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
          center={[9.913431, 126.049483]}
          mapHeight={"h-[520px]"}
          mapWidth={"w-full"}
          zoom={11}
        />
      </div>
    </div>
  )
}

export default GuideContent

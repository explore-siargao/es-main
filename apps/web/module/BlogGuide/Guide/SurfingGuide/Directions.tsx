import React from "react"
import CustomSpecificMap from "@/common/components/CustomSpecificMap"

type T_Props = {
  readonly latitude: number
  readonly longitude: number
  readonly locationGuide: string
}

function Directions({ latitude, longitude, locationGuide }: T_Props) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <CustomSpecificMap
          center={[latitude, longitude]}
          mapHeight={"h-80 sm:h-[720px] md:h-[470px] lg:h-[500px]"}
          mapWidth={"w-full"}
          zoom={11}
          setCoordinates={(lat, long) => {}}
          isRoundedEdge={true}
        />
        <div>
          <h2 className="text-xl font-bold mb-2">How to get there</h2>
          <p className="whitespace-pre-wrap">{locationGuide}</p>
        </div>
      </div>
    </div>
  )
}

export default Directions

import React from "react"
import data from "../../data.json"
import SpecificMap from "@/common/components/SpecificMap"

function Directions() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        {" "}
        <SpecificMap
          center={[9.913431, 126.049483]}
          mapHeight={"h-80 sm:h-[720px] md:h-[470px] lg:h-[500px]"}
          mapWidth={"w-full"}
          zoom={11}
        />
        <div>
          <h2 className="text-xl font-bold mb-2">How to get there</h2>
          <p>{data.howToGetThere.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Directions

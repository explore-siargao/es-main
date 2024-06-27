import React from "react"
import data from "../../data.json"
import SpecificMap from "@/common/components/SpecificMap"

function Directions() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <SpecificMap
          center={[9.913431, 126.049483]}
          mapHeight={"h-[300px]"}
          mapWidth={"w-full"}
          zoom={11}
        />
        <div>
          <h2 className="text-xl font-bold mb-2">HOW TO GET THERE</h2>
          <p>{data.howToGetThere.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Directions

import React from "react"
import dynamic from "next/dynamic";
import SurfForecast from "./surf-forecast";

const WindyMap = dynamic(() => import("./windy"), {
  ssr: false,
});

function Forecast() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Surf Forecast</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-full w-full rounded-2xl">
          {/* BUG: Forecast windy map controls is missing when Directions' map is rendered */}
          <WindyMap />
        </div>
        <div className="flex justify-center">
          <SurfForecast />
        </div>
      </div>
    </div>
  )
}

export default Forecast

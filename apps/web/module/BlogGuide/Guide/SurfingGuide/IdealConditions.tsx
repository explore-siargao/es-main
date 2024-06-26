import React from "react"
import ProgressBar from "./ProgressBar"
import { Rainbow, Waves, Wind } from "lucide-react"
import data from "../../data.json"

function IdealConditions() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ideal Conditions</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-2 flex gap-2">
            <Rainbow />
            Swell Direction
          </h3>
          <p className="mb-4">{data.idealConditions.swellDirection}</p>
          <h3 className="text-lg font-bold mb-2">Wave Difficulty</h3>
          <div className="flex gap-2 mb-8">
            <ProgressBar progress={data.idealConditions.waveDifficulty.level} />
          </div>
          <p className="font-bold mb-1">GOOD</p>
          <p>{data.idealConditions.waveDifficulty.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 flex gap-2">
            <Wind />
            Wind Direction
          </h3>
          <p className="mb-4">{data.idealConditions.windDirection}</p>
          <h3 className="text-lg font-bold mb-2">Wave Quality</h3>
          <div className="flex gap-2 mb-8">
            <ProgressBar progress={data.idealConditions.waveQuality.level} />
          </div>
          <p className="font-bold mb-1">GOOD</p>
          <p>{data.idealConditions.waveQuality.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 flex gap-2">
            <Waves />
            Tide
          </h3>
          <p className="mb-4">{data.idealConditions.tide}</p>
          <h3 className="text-lg font-bold mb-2">Crowd Factor</h3>
          <div className="flex gap-2 mb-8">
            <ProgressBar progress={data.idealConditions.crowdFactor.level} />
          </div>
          <p className="font-bold mb-1">MEDIUM</p>
          <p>{data.idealConditions.crowdFactor.description}</p>
        </div>
      </div>
    </div>
  )
}

export default IdealConditions

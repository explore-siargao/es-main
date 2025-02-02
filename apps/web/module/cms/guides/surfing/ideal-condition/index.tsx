import React from "react"
import ProgressBar from "./progress-bar"
import { Rainbow, Waves, Wind } from "lucide-react"
import data from "../data.json"

type T_Ideal_Conditions = {
  swellDirection: string;
  windDirection: string;
  tide: string;
  waveDifficulty: {
    scale: number;
    level: string;
    description: string;
  };
  waveQuality: {
    scale: number;
    level: string;
    description: string;
  };
  crowdFactor: {
    scale: number;
    level: string;
    description: string;
  };
};

function IdealConditions({ item }: { item: T_Ideal_Conditions}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ideal Conditions</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-2 flex gap-2">
            <Rainbow />
            Swell Direction
          </h3>
          <p className="mb-4">{item.swellDirection}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 flex gap-2">
            <Wind />
            Wind Direction
          </h3>
          <p className="mb-4">{item.windDirection}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 flex gap-2">
            <Waves />
            Tide
          </h3>
          <p className="mb-4">{item.tide}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Wave Difficulty</h3>
          <div className="flex gap-2 mb-4">
            <ProgressBar progress={item.waveDifficulty.scale*10} />
          </div>
          <p className="font-bold mb-1 uppercase">{item.waveDifficulty.level}</p>
          <p>{item.waveDifficulty.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Wave Quality</h3>
          <div className="flex gap-2 mb-4">
            <ProgressBar progress={item.waveQuality.scale*10} />
          </div>
          <p className="font-bold mb-1 uppercase">{item.waveQuality.level}</p>
          <p>{item.waveQuality.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Crowd Factor</h3>
          <div className="flex gap-2 mb-4">
            <ProgressBar progress={item.crowdFactor.scale*10} />
          </div>
          <p className="font-bold mb-1 uppercase">{item.crowdFactor.level}</p>
          <p>{item.crowdFactor.description}</p>
        </div>
      </div>
    </div>
  )
}

export default IdealConditions

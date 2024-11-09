import dynamic from "next/dynamic"
import { T_Property_Card } from "../card"

const DynamicMap = dynamic(() => import("./dynamic"), {
  ssr: false,
})

export enum E_Location {
  Any = "any",
  GeneralLuna = "General Luna",
  Dapa = "Dapa",
  DelCarmen = "Del Carmen",
  SanIsidro = "San Isidro",
  Pilar = "Pilar",
  SanBenito = "San Benito",
  Burgos = "Burgos",
  SantaMonica = "Santa Monica",
  Socorro = "Socorro",
}

type T_Props = {
  units: T_Property_Card[]
  location: E_Location
}

const Map = ({ units, location }: T_Props) => {
  const locationMap = {
    any: {
      center: [9.825699, 126.0481901] as [number, number],
      zoom: 11,
    },
    "General Luna": {
      center: [9.721637, 126.1501691] as [number, number],
      zoom: 12,
    },
    Dapa: {
      center: [9.752993, 126.0475581] as [number, number],
      zoom: 12,
    },
    "Del Carmen": {
      center: [9.866288, 125.9790491] as [number, number],
      zoom: 12,
    },
    "San Isidro": {
      center: [9.952742, 126.0685441] as [number, number],
      zoom: 12,
    },
    Pilar: {
      center: [9.873669, 126.0754001] as [number, number],
      zoom: 13,
    },
    "San Benito": {
      center: [9.957892, 126.0221231] as [number, number],
      zoom: 13,
    },
    Burgos: {
      center: [10.017579, 126.0594681] as [number, number],
      zoom: 13,
    },
    "Santa Monica": {
      center: [10.025946, 126.0482881] as [number, number],
      zoom: 13,
    },
    Socorro: {
      center: [9.657513, 125.9392181] as [number, number],
      zoom: 12,
    },
  }
  return (
    <div className="w-full">
      <DynamicMap
        key={location}
        units={units}
        center={locationMap[location].center}
        zoom={locationMap[location].zoom}
      />
    </div>
  )
}

export default Map

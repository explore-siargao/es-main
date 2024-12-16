import dynamic from "next/dynamic"
import { E_Location, T_Rental_Filtered } from "@repo/contract-2/search-filters"

const DynamicMap = dynamic(() => import("./dynamic"), {
  ssr: false,
})

type T_Props = {
  rentals: T_Rental_Filtered[]
  location: E_Location
}

type T_Map_Center = {
  center: [number, number]
  zoom: number
}

const Map = ({ rentals, location }: T_Props) => {
  const screenHeight = window.innerHeight
  // keys are the specific screen heights
  // just add a new key if you want to add a new screen height
  const dynamicMapCenter: { [key: number]: T_Map_Center } = {
    857: {
      center: [9.907176747651983, 126.03786003188247] as [number, number],
      zoom: 10,
    },
    968: {
      center: [9.858985514734842, 126.04518096735858] as [number, number],
      zoom: 11,
    },
    1328: {
      center: [9.816033649893807, 126.04451542773673] as [number, number],
      zoom: 11,
    },
  }
  const fallBackMapCenter = {
    center: [9.816033649893807, 126.04451542773673] as [number, number],
    zoom: 11,
  }
  const locationMap = {
    any: dynamicMapCenter[screenHeight] || fallBackMapCenter,
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
        rentals={rentals}
        center={locationMap[location].center}
        zoom={locationMap[location].zoom}
        scrollWheelZoom
      />
    </div>
  )
}

export default Map

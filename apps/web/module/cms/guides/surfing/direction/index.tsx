"use client"
import React from "react"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("./map"), {
  ssr: false,
})

type T_Props = {
  readonly latitude: number
  readonly longitude: number
  readonly locationGuide: string
}

function Directions({ latitude, longitude, locationGuide }: T_Props) {
  return (
    <div>
      <div className="h-96 w-full rounded-2xl mb-4">
        <Map center={[latitude, longitude]} zoom={11} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">How to get there</h2>
        <p className="whitespace-pre-wrap">{locationGuide}</p>
      </div>
    </div>
  )
}

export default Directions

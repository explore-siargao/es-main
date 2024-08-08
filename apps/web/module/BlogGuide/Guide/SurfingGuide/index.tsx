"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Separator } from "@/common/components/ui/Separator"
import SurfGuide from "./SurfGuide"
import Directions from "./Directions"
import IdealConditions from "./IdealConditions"
import Forecast from "./Forecast"
import { Spinner } from "@/common/components/ui/Spinner"
import { Typography } from "@/common/components/ui/Typography"

const GuideContent = ({ guideData }: { guideData: any }) => {
  return (
    <div className="mt-10">
      <SurfGuide
        title={guideData?.title}
        guideText={guideData?.hero?.guide[0]?.children[0]?.text}
        images={guideData?.hero?.images}
      />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <Directions
        longitude={guideData?.location[0]}
        latitude={guideData?.location[1]}
        locationGuide={guideData?.locationGuide[0]?.children[0]?.text}
      />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <IdealConditions />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <Forecast />
    </div>
  )
}

const SurfingGuide = () => {
  const [guideData, setGuideData] = useState<any>([])
  const [guideDataLoading, setGuideDataLoading] = useState(true)
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const updateCoordinates = (latitude: number, longitude: number) => {
    setCoordinates({ latitude, longitude })
  }
  const params = useParams()
  const guideName = params.guideName

  const getGuidePost = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/guide/${guideName}`
      )

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      const data = await res.json()

      setGuideData(data.docs[0])
      setGuideDataLoading(false)
    } catch (err) {
      console.log(err)
      setGuideDataLoading(false)
    }
  }

  useEffect(() => {
    getGuidePost()
  }, [])

  return (
    <WidthWrapper width={"small"}>
      {guideDataLoading ? (
        <Spinner variant="primary" middle />
      ) : guideData ? (
        <GuideContent guideData={guideData} />
      ) : (
        <Typography className="mt-10">No data was found.</Typography>
      )}
    </WidthWrapper>
  )
}

export default SurfingGuide

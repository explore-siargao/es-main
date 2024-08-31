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
import { MESSAGE_404 } from "@/common/constants"
import { WEB_URL } from "@/common/constants/ev"
import ErrorContent from "@/common/components/ErrorContent"

const GuideContent = ({ guideData }: { guideData: any }) => {
  return (
    <div className="mt-10">
      <SurfGuide
        title={guideData.title}
        guideText={guideData.hero.guide}
        images={guideData.hero.images}
      />
      <Separator orientation="horizontal" className="mt-10 mb-6 bg-gray-300" />
      <Directions
        longitude={guideData.content.location[0]}
        latitude={guideData.content.location[1]}
        locationGuide={guideData.content.locationGuide}
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
      const res = await fetch(`${WEB_URL}/cms/api/surfs/guide/${guideName}`)

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

  let content

  if (guideDataLoading) {
    content = <Spinner variant="primary" middle />
  } else if (guideData) {
    content = <GuideContent guideData={guideData} />
  } else {
    content = <ErrorContent mainError="404 - PAGE NOT FOUND" errorDesc={MESSAGE_404} />
  }

  return <WidthWrapper width="medium">{content}</WidthWrapper>
}

export default SurfingGuide

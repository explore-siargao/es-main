"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Separator } from "@/common/components/ui/Separator"
import TravelImages from "./TravelImages"
import PopularGuides from "./PopularGuides"
import { Spinner } from "@/common/components/ui/Spinner"
import { MESSAGE_404 } from "@/common/constants"
import serialize from "../../../../common/components/RichText/serialize"
import { WEB_URL } from "@/common/constants/ev"
import ErrorContent from "@/common/components/ErrorContent"

const TravelGuideContent = ({ guideData }: { guideData: any }) => {
  return (
    <div>
      <div className="mt-2">
        <div className="py-8 flex">
          <div className="lg:w-3/4 w-full lg:mr-20 mr-10 space-y-10 flex-1">
            <TravelImages
              title={guideData.title}
              images={guideData.hero.images}
            />
            <div className="prose max-w-full">
              {serialize(guideData?.content?.mainContent)}
            </div>
          </div>

          <div>
            <PopularGuides data={guideData.sideContent.popularGuides} />
            <div className="flex w-60 flex-col sticky top-28">
              <div>
                <h1 className="mt-10 text-xl font-bold">Page Summary</h1>
                <Separator
                  orientation="horizontal"
                  className="mb-5 bg-gray-300"
                />
                <ul
                  className="list-disc list-inside space-y-3 max-h-40 w-full overflow-y-auto pr-2"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {guideData.sideContent.pageSummary.map(
                    (note: any, index: number) => (
                      <li key={index}>{note.item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TravelBlog() {
  const params = useParams()
  const travelName = params.travelName
  const [travelData, setTravelData] = useState<any>([])
  const [travelDataLoading, setTravelDataLoading] = useState(true)
  const getTravelCms = async () => {
    try {
      const res = await fetch(
        `${WEB_URL}/cms/api/locations/guide/${travelName}`
      )

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      const data = await res.json()
      setTravelData(data.docs[0])
      setTravelDataLoading(false)
    } catch (err) {
      setTravelDataLoading(false)
    }
  }

  useEffect(() => {
    getTravelCms()
  }, [])

  let content

  if (travelDataLoading) {
    content = <Spinner variant="primary" middle />
  } else if (travelData) {
    content = <TravelGuideContent guideData={travelData} />
  } else {
    content = <ErrorContent mainError="404 - PAGE NOT FOUND" errorDesc={MESSAGE_404} />
  }

  return <WidthWrapper width="medium">{content}</WidthWrapper>
}

export default TravelBlog

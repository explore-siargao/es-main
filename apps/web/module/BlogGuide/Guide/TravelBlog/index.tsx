"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Separator } from "@/common/components/ui/Separator"
import TravelImages from "./TravelImages"
import PopularGuides from "./PopularGuides"
import TravelChecklist from "./TravelChecklist"
import { Spinner } from "@/common/components/ui/Spinner"
import { Typography } from "@/common/components/ui/Typography"
import OtherContents from "./OtherContents"

const TravelGuideContent = ({ guideData }: { guideData: any }) => {
  return (
    <div className="mt-10">
      <div className="py-8 grid lg:grid-cols-5">
        <div className="lg:col-span-4 lg:mr-20 mr-10 space-y-10">
          <TravelImages title={guideData?.title} images={guideData?.hero?.images} guideText={guideData?.hero?.guide[0]?.children[0]?.text} />
          <Separator orientation="horizontal" className="my-10 bg-gray-300" />
          <TravelChecklist requirements={guideData?.content?.requirements} />
          <Separator orientation="horizontal" className="my-10 bg-gray-300" />
          <OtherContents thingsToDo={guideData?.content?.thingsToDo} foodNotes={guideData?.content?.foodNotes} />
        </div>

        <div>
          <PopularGuides />
          <div className="sticky top-2">
            <div className="grid w-60">
              <div>
                <h1 className="mt-10 text-xl font-bold">Page Summary</h1>
                <Separator
                  orientation="horizontal"
                  className="mb-5 bg-gray-300"
                />
                <ul className="grid list-disc ml-5 space-y-5">
                {guideData?.content?.thingsToDo.map((note:any, index: number) => (
                    <li key={index}>{note.item}</li>
                  ))}
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
        `http://localhost:3000/api/locations/guide/${travelName}`
      )

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      const data = await res.json()
      setTravelData(data.docs[0])
      setTravelDataLoading(false)
    } catch (err) {
      console.log(err)
      setTravelDataLoading(false)
    }
  }
 

  useEffect(() => {
    getTravelCms()
  }, [])

  console.log(travelData)
  
  let content

  if (travelDataLoading) {
    content = <Spinner variant="primary" middle />
  } else if (travelData) {
    content = <TravelGuideContent guideData={travelData} />
  } else {
    content = <Typography className="mt-10">No data was found.</Typography>
  }

  return <WidthWrapper width={"small"}>{content}</WidthWrapper>
}

export default TravelBlog

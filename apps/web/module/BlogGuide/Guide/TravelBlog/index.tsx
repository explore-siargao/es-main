"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import TravelImages from "./TravelImages"
import PopularGuides from "./PopularGuides"
import serialize from "../../../../common/components/RichText/serialize"

type T_Props = {
  data: any
}

export const TravelBlog = ({ data }: T_Props) => {
  return (
    <WidthWrapper width="medium">
      <div className="flex">
        <div className="lg:w-3/4 w-full lg:mr-20 mr-10 space-y-10 flex-1">
          <TravelImages title={data.title} images={data.hero.images} />
          <div className="prose max-w-full">
            {serialize(data.content.mainContent)}
          </div>
        </div>

        <div>
          <PopularGuides data={data.sideContent.popularGuides} />
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
                {data.sideContent.pageSummary.map(
                  (note: any, index: number) => (
                    <li key={index}>{note.item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default TravelBlog

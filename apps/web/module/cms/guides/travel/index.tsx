"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import React from "react"
import Hero from "./hero"
import PopularBlogs from "./popular"
import { Typography } from "@/common/components/ui/Typography"
import serialize from "@/common/components/RichText/serialize"

type T_Prop = {
  data: any
}

const Travel = ({ data }: T_Prop) => {
  return (
    <WidthWrapper width="medium">
      <div className="flex gap-12">
        <div className="flex-1">
          <Hero title={data.title} images={data.hero.images} />
          <div className="prose max-w-full">
            {serialize(data?.content?.mainContent)}
          </div>
        </div>

        <div className="w-80">
          <PopularBlogs data={data.sideContent.popularTravels} />
          <div className="flex flex-col sticky top-56">
            <Typography variant="h2" fontWeight="semibold" className="mb-2">
              Page Summary
            </Typography>
            <hr className="border-text-50 mb-4" />
            <ul
              className="list-disc list-inside space-y-3 max-h-40 w-full overflow-y-auto pr-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {data.sideContent.pageSummary.map((note: any, index: number) => (
                <li key={index}>{note.item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default Travel

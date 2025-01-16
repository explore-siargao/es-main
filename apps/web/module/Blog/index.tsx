"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import BlogImages from "./BlogImages"
import PopularBlogs from "./PopularBlogs"
import serialize from "../../common/components/RichText/serialize"
import { Typography } from "@/common/components/ui/Typography"

type T_Prop = {
  data: any
}

const Blog = ({ data }: T_Prop) => {
  console.log('data', data.hero.images)
  return (
    <WidthWrapper width="medium">
      <div className="flex gap-12">
        <div className="flex-1">
          <BlogImages title={data.title} images={data.hero.images} />
          <div className="prose max-w-full">
            {serialize(data?.content?.mainContent)}
          </div>
        </div>

        <div className="w-80">
          <PopularBlogs data={data.sideContent.popularBlogs} />
          <div className="flex flex-col sticky top-56">
              <Typography variant="h2" fontWeight="semibold" className="mb-2">Page Summary</Typography>
              <hr className="border-text-50 mb-4" />
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
    </WidthWrapper>
  )
}

export default Blog

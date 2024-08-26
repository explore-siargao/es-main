"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Separator } from "@/common/components/ui/Separator"
import BlogImages from "./BlogImages"
import PopularBlogs from "./PopularBlogs"
import { WEB_URL } from "@/common/constants/ev"
import serialize from "../../common/components/RichText/serialize"
import { Spinner } from "@/common/components/ui/Spinner"
import { Typography } from "@/common/components/ui/Typography"

const BlogContent = ({ blogData }: { blogData: any }) => {
  return (
    <div>
      <div className="mt-2">
        <div className="py-8 flex">
          <div className="lg:mr-20 mr-10 space-y-10 flex-1">
            <BlogImages title={blogData.title} images={blogData.hero.images} />
            <div className="prose max-w-full">
              {serialize(blogData?.content?.mainContent)}
            </div>
          </div>

          <div>
            <PopularBlogs data={blogData?.sideContent.popularBlogs} />
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
                  {blogData.sideContent.pageSummary.map(
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

function Blog() {
  const params = useParams()
  const blogName = params.blogName
  const [blogData, setBlogData] = useState<any>([])
  const [blogDataLoading, setBlogDataLoading] = useState(true)
  const getBlogCms = async () => {
    try {
      const res = await fetch(`${WEB_URL}/cms/api/blogs/general/${blogName}`)

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      const data = await res.json()
      setBlogData(data.docs[0])
      setBlogDataLoading(false)
    } catch (err) {
      setBlogDataLoading(false)
    }
  }

  useEffect(() => {
    getBlogCms()
  }, [])

  let content

  if (blogDataLoading) {
    content = <Spinner variant="primary" middle />
  } else if (blogData) {
    content = <BlogContent blogData={blogData} />
  } else {
    content = <Typography className="mt-10">No data was found.</Typography>
  }

  return <WidthWrapper width="medium">{content}</WidthWrapper>
}

export default Blog

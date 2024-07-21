"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import TopThingsToDo from "./TopThingsToDo"
import data from "./data.json"
import WhereToStay from "./WhereToStay"
import BlogImages from "./BlogImages"
import BlogChecklist from "./BlogChecklist"
import PopularBlogs from "./PopularBlogs"
function Blog() {
  const params = useParams()
  const travelName = params.travelName
  const images = data.surfGuide.images
  return (
    <WidthWrapper width="small" className="mt-2">
      <div className="py-8 grid lg:grid-cols-5">
        <div className="lg:col-span-4 lg:mr-20 mr-10 space-y-10">
          <BlogImages />
          <Separator orientation="horizontal" className="my-10 bg-gray-300" />
          <BlogChecklist />
          <Separator orientation="horizontal" className="my-10 bg-gray-300" />
          <TopThingsToDo />
          <Separator orientation="horizontal" className="my-10 bg-gray-300" />
          <WhereToStay />
        </div>

        <div>
          <PopularBlogs />
          <div className="sticky top-2">
            <div className="grid w-60">
              <div>
                <h1 className="mt-10 text-xl font-bold">Page Summary</h1>
                <Separator
                  orientation="horizontal"
                  className="mb-5 bg-gray-300"
                />
                <ul className="grid list-disc ml-5 space-y-5">
                  <li>Introduction</li>
                  <li>Travel Requirements Checklist</li>
                  <li>Top Things To Do</li>
                  <li>Foodie Notes</li>
                  <li>Where To Stay</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default Blog

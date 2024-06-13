"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { useParams } from "next/navigation"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import TravelImages from "./TravelImages"
import data from "../../data.json"
import PopularGuides from "./PopularGuides"
import TravelChecklist from "./TravelChecklist"
import TopThingsToDo from "./TopThingsToDo"

function TravelBlog() {
  const params = useParams()
  const travelName = params.travelName
  const images = data.travelBlog.images
  return (
    <WidthWrapper width={"medium"}>
      <div className="py-8 lg:mt-32 mt-16 grid lg:grid-cols-5">
      <div className="lg:col-span-4 lg:mx-20 mx-10 space-y-10" >
      <TravelImages />
      <Separator
          orientation="horizontal"
          className="my-10 bg-gray-300"
        />
      <TravelChecklist/>
      <Separator
          orientation="horizontal"
          className="my-10 bg-gray-300"
        />
      <TopThingsToDo/>
      <TravelImages />
      <Separator
          orientation="horizontal"
          className="my-10 bg-gray-300"
        />
      <TravelChecklist/>
      <Separator
          orientation="horizontal"
          className="my-10 bg-gray-300"
        />
      <TopThingsToDo/>
      </div>
      
      <div>
      <PopularGuides/>
      <div className="sticky top-24">
      <div className="grid w-60">
      <div>
      <h1 className="mt-10 text-xl font-bold">PAGE SUMMARY</h1>
      <Separator
          orientation="horizontal"
          className="mb-5 bg-gray-300"
        />
         <ul className="grid list-disc ml-5 space-y-5">
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
        </ul>
      </div>
      </div> 
      </div>
      </div>
      <div>
        
      </div>
      </div>
    </WidthWrapper>
  )
}

export default TravelBlog

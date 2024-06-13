"use client"
import { useParams } from "next/navigation"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"

import data from "../../data.json"
import GridImage from "./components/GridImage"

function PopularGuides() {
  const params = useParams()
  const travelName = params.travelName
  const images = data.travelBlog.images
  return (
      <div className="grid w-60">
      <div>
      <h1 className="mt-10 text-xl font-bold">POPULAR GUIDES</h1>
      <Separator
          orientation="horizontal"
          className="mb-5 bg-gray-300"
        />
        <GridImage
        src={images[0]?.fileKey}
        alt={String(images[0]?.alt)}
        text="Lorem ipsum dolor sit amet, consectetur"
      />
      <Separator
          orientation="horizontal"
          className="my-5 bg-gray-300"
        />
        <GridImage
        src={images[0]?.fileKey}
        alt={String(images[0]?.alt)}
        text="Lorem ipsum dolor sit amet, consectetur"
      />
      <Separator
          orientation="horizontal"
          className="my-5 bg-gray-300"
        />
        <GridImage
        src={images[0]?.fileKey}
        alt={String(images[0]?.alt)}
        text="Lorem ipsum dolor sit amet, consectetur"
      />
      <Separator
          orientation="horizontal"
          className="my-5 bg-gray-300"
        />
        <GridImage
        src={images[0]?.fileKey}
        alt={String(images[0]?.alt)}
        text="Lorem ipsum dolor sit amet, consectetur"
      />
      </div>
      </div>  
  )
}

export default PopularGuides

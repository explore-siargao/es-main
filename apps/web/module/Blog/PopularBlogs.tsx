"use client"
import { useParams } from "next/navigation"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"

import data from "./data.json"
import GridImage from "./components/GridImage"

function PopularBlogs() {
  const params = useParams()
  const travelName = params.travelName
  const images = data.travelBlog.images
  return (
    <div className="grid w-60">
      <div>
        <h1 className=" text-xl font-bold">Popular Blogs</h1>
        <Separator orientation="horizontal" className="mb-5 bg-gray-300" />
        <GridImage
          src={images[0]?.fileKey}
          alt={String(images[0]?.alt)}
          text="Surfing Paradise: Riding the Waves of Cloud Nine"
        />
        <Separator orientation="horizontal" className="my-5 bg-gray-300" />
        <GridImage
          src={images[0]?.fileKey}
          alt={String(images[0]?.alt)}
          text="Sunrise to Sunset: A Day in the Life of Siargao"
        />
        <Separator orientation="horizontal" className="my-5 bg-gray-300" />
        <GridImage
          src={images[0]?.fileKey}
          alt={String(images[0]?.alt)}
          text="Culinary Delights of Siargao: A Foodie's Journey"
        />
        <Separator orientation="horizontal" className="my-5 bg-gray-300" />
        <GridImage
          src={images[0]?.fileKey}
          alt={String(images[0]?.alt)}
          text="Beyond the Beach: Discovering Siargao's Inland Treasures"
        />
      </div>
    </div>
  )
}

export default PopularBlogs

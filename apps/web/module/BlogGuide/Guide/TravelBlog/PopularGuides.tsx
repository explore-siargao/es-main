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
        <h1 className="text-xl font-bold">Popular Guides</h1>
        <Separator orientation="horizontal" className="mb-5 bg-gray-300" />

        <div
          className="max-h-96 overflow-y-auto space-y-5"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <GridImage
              src={images[0]?.fileKey}
              alt={String(images[0]?.alt)}
              text="Swim with Stingless Jellyfish in Sohoton Cove"
            />
            <Separator orientation="horizontal" className="my-5 bg-gray-300" />
            <GridImage
              src={images[0]?.fileKey}
              alt={String(images[0]?.alt)}
              text="Dive Into the Blue Cathedral"
            />
            <Separator orientation="horizontal" className="my-5 bg-gray-300" />
            <GridImage
              src={images[0]?.fileKey}
              alt={String(images[0]?.alt)}
              text="Island-Hopping"
            />
            <Separator orientation="horizontal" className="my-5 bg-gray-300" />
            <GridImage
              src={images[0]?.fileKey}
              alt={String(images[0]?.alt)}
              text="Surf at Cloud 9 and Other Spots"
            />
            <Separator orientation="horizontal" className="my-5 bg-gray-300" />
            <GridImage
              src={images[0]?.fileKey}
              alt={String(images[0]?.alt)}
              text="Explore other surfing spots"
            />
            <Separator orientation="horizontal" className="my-5 bg-gray-300" />
            <GridImage
              src={images[0]?.fileKey}
              alt={String(images[0]?.alt)}
              text="Surf with finest view with safety"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularGuides

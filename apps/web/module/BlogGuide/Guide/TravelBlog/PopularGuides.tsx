"use client"
import React from "react"
import { Separator } from "@/common/components/ui/Separator"
import GridImage from "./components/GridImage"

type T_Props = {
  data: {
    title: string
    image: {
      alt: string
      filename: string
    }
  }[]
}

function PopularGuides({ data }: T_Props) {
  return (
    <div className="grid w-60">
      <div>
        <h1 className="text-xl font-bold">Popular Guides</h1>
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
            {data.map((item, index) => (
              <div key={item.image.alt}>
                <Separator
                  orientation="horizontal"
                  className={`${index > 0 ? "my-5" : "mb-5"} bg-gray-300`}
                />
                <GridImage
                  src={item.image.filename}
                  alt={item.image.alt}
                  text={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularGuides

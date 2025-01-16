"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Image from "next/image"

type T_Props = {
  data: {
    title: string
    image: {
      alt: string
      filename: string
    }
  }[]
}

function PopularBlogs({ data }: T_Props) {
  return (
    <div className="mb-6">
      <Typography variant="h2" fontWeight="semibold" className="mb-2">Popular Blogs</Typography>
      <hr className="border-text-50 mb-4" />
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div className="flex gap-2" key={item.image.alt}>
            <div className="relative w-24 h-16 rounded-xl">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={`/assets/${item.image.filename}`}
                alt={item.image.alt}
                className="cursor-pointer rounded-xl"
              />
            </div>
            <div>
              <p className="text-sm p-2">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularBlogs

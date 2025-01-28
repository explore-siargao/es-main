"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Image from "next/image"
import Link from "next/link"
import { WEB_URL } from "@/common/constants/ev"

type T_Props = {
  data: {
    blog: {
      hero: {
        images: {
          image: {
            id: string
            filename: string
            alt: string
          }
          id: string
        }[]
      }
      slug: string
      title: string
    }
    id: string
  }[]
}

function PopularBlogs({ data }: T_Props) {
  console.log("veve", data)
  return (
    <div className="mb-6">
      <Typography variant="h2" fontWeight="semibold" className="mb-2">
        Popular Blogs
      </Typography>
      <hr className="border-text-50 mb-4" />
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <Link
            href={`${WEB_URL}/blogs/${item.blog.slug}`}
            className="flex gap-4 h-20 items-center"
            key="Test"
          >
            <div className="relative w-24 h-20">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={`/assets/${item.blog.hero.images[0]?.image.filename}`}
                alt={
                  item.blog.hero.images[0]?.image.alt || `Blog image ${index}`
                }
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <Typography variant="h3" className="text-ellipsis">
                {item.blog.title}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularBlogs

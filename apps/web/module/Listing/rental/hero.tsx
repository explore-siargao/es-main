"use client"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import ShareSave from "@/module/Listing/share-save"
import ImageGallery from "@/module/Listing/property/image-gallery"
import { T_Photo } from "@repo/contract-2/photos"

type T_Hero = {
  title: string
  images: T_Photo[]
}

const Hero = ({ title, images }: T_Hero) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  return (
    <>
      <div className="justify-between md:flex text-start items-center">
        <div>
          <Typography variant="h1" fontWeight="semibold">
            {title}
          </Typography>
        </div>
        <ShareSave />
      </div>
      <div className="my-6">
        <ImageGallery
          images={images}
          isOpen={galleryModalOpen}
          openModal={() => setGalleryModalOpen(!galleryModalOpen)}
          isViewModal={true}
          isRoundedEdge={true}
        />
      </div>
    </>
  )
}

export default Hero

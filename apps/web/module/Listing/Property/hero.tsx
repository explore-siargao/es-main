"use client"
import { Typography } from "@/common/components/ui/Typography"
import ShareSave from "@/module/Listing/share-save"
import React, { useState } from "react"
import ImageGallery from "./image-gallery"
import { T_SectionInfoProps } from "./types/SectionInfo"

const Hero = ({ title, images }: T_SectionInfoProps) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  return (
    <div>
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
    </div>
  )
}

export default Hero

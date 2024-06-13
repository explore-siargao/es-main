"use client"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import ImageGallery from "./ImageGallery"
import ImageGalleryModal from "./modals/ImageGalleryModal"
import ShareSave from "./ShareSave"
import { T_SectionInfoProps } from "../types/SectionInfo"

const SectionInfo = ({ title, images }: T_SectionInfoProps) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const openModal = () => {
    setGalleryModalOpen(true)
  }
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
        <ImageGallery images={images} openModal={openModal} isViewModal={false} />
      </div>
      <ImageGalleryModal
        images={images}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </>
  )
}

export default SectionInfo

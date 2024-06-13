"use client"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import ImageGallery from "@/module/Accommodation/components/ImageGallery"
import ImageGalleryModal from "@/module/Accommodation/components/modals/ImageGalleryModal"
import { T_SectionInfoProps } from "@/module/Accommodation/types/SectionInfo"
import { Star } from "lucide-react"

const SectionInfo = ({ title, images }: T_SectionInfoProps) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const openModal = () => {
    setGalleryModalOpen(true)
  }
  return (
    <>
      <div className="justify-between md:flex text-start items-center">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 mt-1 items-center">
            <button className="hover:underline hover:duration-300 cursor-pointer">
              <div className="flex gap-2 md:flex items-center">
                <Star className="h-4 w-4 fill-black" />
                <Typography>4</Typography>
              </div>
            </button>{" "}
            <Typography>&middot;</Typography>
            <button className="hover:underline hover:duration-300 cursor-pointer">
              <Typography>4 Reviews</Typography>
            </button>{" "}
          </div>
          <Typography variant="h1" fontWeight="semibold">
            {title}
          </Typography>
        </div>
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

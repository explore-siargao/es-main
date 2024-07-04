import React, { useState } from "react"
import data from "../../data.json"
import ImageGallery from "@/module/Accommodation/components/ImageGallery"
import { Typography } from "@/common/components/ui/Typography"
import ShareSave from "@/module/Accommodation/components/ShareSave"
import ImageGalleryModal from "@/module/Accommodation/components/modals/ImageGalleryModal"

function TravelBlog() {
  const images = data.surfGuide.images
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const openModal = () => {
    setGalleryModalOpen(true)
  }

  return (
    <div>
      <div className="justify-between md:flex text-start items-center">
        <div>
          <Typography variant="h1" fontWeight="semibold">
          Magpupungko Rock Pools 
          </Typography>
        </div>
        <ShareSave />
      </div>
      <div className="flex flex-col gap-2 mb-8 mt-6">
        <ImageGallery
          images={images}
          openModal={openModal}
          isViewModal={true}
        />
      </div>
      <h2 className="text-xl font-bold mb-2">About Travel</h2>
      <p className="mb-8">{data.travelBlog.guide}</p>
      <ImageGalleryModal
        images={images}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  )
}

export default TravelBlog

import React, { useState } from "react"
import data from "./data.json"
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
            Siargao, dream island of the Philippines
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
      <h2 className="text-xl font-bold mb-2">About Blog</h2>
      <p className="mb-8">
        A special atmosphere, with a lot of young people with a surfing spirit /
        good vibes and beautiful landscapes. Even before touching the ground,
        you will realize the beauty of the island. Indeed, from the air, you
        will see hundreds of thousands of palm trees, as far as the eye can see.
        There are many things to do in Siargao, that is what we will detail in
        this article.
      </p>
      <ImageGalleryModal
        images={images}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  )
}

export default TravelBlog

import React, { useState } from "react"
import data from "./data.json"
import ImageGallery from "@/module/Listing/property/image-gallery"
import { Typography } from "@/common/components/ui/Typography"
import ShareSave from "@/module/Listing/property/share-save"
import ImageGalleryModal from "@/module/Listing/property/modals/image-gallery-modal"

type T_Props = {
  readonly title: string
  readonly images: any
}

function GeneralBlog({ title, images }: T_Props) {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const openModal = () => {
    setGalleryModalOpen(true)
  }

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
      <div className="flex flex-col gap-2 mb-8 mt-6">
        <ImageGallery
          images={images}
          openModal={openModal}
          isViewModal={true}
          isRoundedEdge={true}
        />
      </div>
      <ImageGalleryModal
        images={images}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  )
}

export default GeneralBlog

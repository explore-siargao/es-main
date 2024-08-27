import React, { useState } from "react"
import ImageGallery from "@/module/Accommodation/components/ImageGallery"
import ImageGalleryModal from "@/module/Accommodation/components/modals/ImageGalleryModal"
import { Typography } from "@/common/components/ui/Typography"
import ShareSave from "@/module/Accommodation/components/ShareSave"

type T_Props = {
  readonly title: string
  readonly images: any
  readonly guideText: string
}

type T_Images = {
  alt: string
  fileName: string
  url: string
}

function SurfGuide({ title, guideText, images }: T_Props) {
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
      <h2 className="text-xl font-bold mb-2">Guide</h2>
      <p className="mb-8 whitespace-pre-wrap">{guideText}</p>
      <ImageGalleryModal
        images={images}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  )
}

export default SurfGuide

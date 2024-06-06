import { Button } from '@/common/components/ui/Button'
import React, { useState } from 'react'
import data from '../../data.json'
import Image from 'next/image'
import ImageGallery from '@/module/Accommodation/components/ImageGallery';
import ImageGalleryModal from '@/module/Accommodation/components/modals/ImageGalleryModal';

function SurfGuide() {
  const images = data.surfGuide.images;
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const openModal = () => {
    setGalleryModalOpen(true)
  }

  return (
    <div>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className="text-2xl font-bold">SURF GUIDE</h1>
        <ImageGallery images={images} openModal={openModal} />
      </div>
      <h2 className="text-xl font-bold mb-2">GUIDE</h2>
      <p className="mb-8">
        {data.surfGuide.guide}
      </p>
      <ImageGalleryModal
        images={images}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  )
}

export default SurfGuide

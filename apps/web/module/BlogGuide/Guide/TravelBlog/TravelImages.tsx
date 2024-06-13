import React from "react"
import data from "../../data.json"
import ImageGallery from "@/module/Accommodation/components/ImageGallery"

function TravelBlog() {
  const images = data.travelBlog.images

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold">TRAVEL GUIDE</h1>
        <ImageGallery images={images} isViewModal={false} openModal={function (): void {} } />
        <p className="text-md text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
      </div>
      
      <h2 className="text-xl font-bold mb-2">GUIDE</h2>
      <p className="mb-8">{data.travelBlog.guide}</p>
    </div>
  )
}

export default TravelBlog

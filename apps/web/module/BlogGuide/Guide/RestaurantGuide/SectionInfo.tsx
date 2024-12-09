"use client"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import ImageGallery from "@/module/Listing/Property/components/image-gallery"
import { StarIcon } from "lucide-react"
import ShareSave from "./components/ShareSave"
import Link from "next/link"
import MenuModal from "./components/modals/MenuModal"
import EventsModal from "./components/modals/EventsModal"
import formatCurrency from "@/common/helpers/formatCurrency"
import { T_Photo } from "@repo/contract"

export type T_SectionInfoProps = {
  title: string
  images: T_Photo[]
  ratings?: number
  reviews?: number
  priceRangeLow?: number
  priceRangeHigh?: number
  location?: string
  cuisine?: string
  menus?: any
  events?: any
}

const SectionInfo = ({
  title,
  images,
  ratings,
  reviews,
  priceRangeLow,
  priceRangeHigh,
  location,
  cuisine,
  menus,
  events,
}: T_SectionInfoProps) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)

  const [menuModalOpen, setMenuModalOpen] = useState(false)
  const [eventModalOpen, setEventModalOpen] = useState(false)

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
      <div className="flex items-center space-x-3 mt-2 flex-wrap">
        <Link href="#reviews">
          <div className="flex items-center space-x-1.5">
            <StarIcon className="h-3 w-3" fill="#000" />
            <Typography>
              {ratings} ({reviews}{" "}
              {
                // @ts-ignore
                reviews <= 1 ? "review" : "reviews"
              }
              )
            </Typography>
          </div>
        </Link>
        <Typography variant="h6">&#8226;</Typography>
        <Link href="#location">
          <Typography>{location}</Typography>
        </Link>
        <Typography variant="h6">&#8226;</Typography>
        <Typography>
          {
            // @ts-ignore
            formatCurrency(priceRangeLow)
          }{" "}
          -{" "}
          {
            // @ts-ignore
            formatCurrency(priceRangeHigh)
          }
        </Typography>
        <Typography variant="h6">&#8226;</Typography>
        <Typography>{cuisine}</Typography>
        <Typography variant="h6">&#8226;</Typography>
        <button onClick={() => setMenuModalOpen(true)}>Menu</button>
        <Typography variant="h6">&#8226;</Typography>
        <button onClick={() => setEventModalOpen(true)}>
          <Typography>Specials and Events</Typography>
        </button>
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
      <MenuModal
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        menus={menus}
      />
      <EventsModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        events={events}
      />
    </>
  )
}

export default SectionInfo

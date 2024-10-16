"use client"
import React, { useState } from "react"
import Image from "@/common/components/ui/image"
import DeleteWIshlistsModal from "@/module/AccountSettings/modals/DeleteWIshlistsModal"
import { Typography } from "../../../common/components/ui/Typography"
import Link from "next/link"
import { LucideX } from "lucide-react"

type Props = {
  photo: string
  title: string
  text: string
  link: string
}
const WishlistBoxContainer = ({ title, link, text, photo }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)

  return (
    <>
      <div className="flex flex-col select-none">
        <div
          className="h-[150px] w-[150px] md:h-72 md:w-auto 2xl:h-72 2xl:w-auto rounded-3xl relative border border-text-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-hidden="true"
        >
          {isHovered && (
            <button
              onClick={() => setRemoveModal(true)}
              className="absolute top-4 left-4 p-1 bg-primary-100 rounded-full hover:bg-white hover:shadow-lg transition hover:scale-105"
            >
              <LucideX className=" h-7 w-7 text-text-400 " aria-hidden="true" />
            </button>
          )}
          <Link href={"/account-settings/wishlist/" + link}>
            <Image
              src={`/assets/${photo}`}
              width={300}
              height={300}
              alt={photo}
              className="object-cover h-full w-full rounded-3xl p-1"
            />
          </Link>
        </div>
        <div className="flex-1 ml-1 -space-y-1 w-auto">
          <Typography
            variant="h3"
            fontWeight="semibold"
            className="text-text-500"
          >
            {title}
          </Typography>
          <Typography className="text-text-300">{text}</Typography>
        </div>
      </div>

      <DeleteWIshlistsModal
        isOpen={removeModal}
        onClose={() => setRemoveModal(false)}
        title={title}
      />
    </>
  )
}

export default WishlistBoxContainer

"use client"
import { Typography } from "@/common/components/ui/Typography"
import { Heart, Share } from "lucide-react"
import React, { useState } from "react"
import SharePlaceModal from "./modal"

const ShareSave = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const handleClick = () => {
    setIsClicked(!isClicked)
  }
  return (
    <div className="flex items-center gap-3">
      <button
        className="hover:duration-300 cursor-pointer"
        onClick={() => setIsShareModalOpen(true)}
      >
        <div className="flex gap-2 underline underline-offset-1 text-sm pt-1 md:flex items-center hover:bg-gray-100 rounded-md p-1">
          <Share className="h-4 w-4 text-text-400" />
          <Typography className="text-sm text-text-400">Share</Typography>
        </div>
      </button>
      <button
        onClick={handleClick}
        className="hover:duration-300 cursor-pointer"
      >
        <div className="flex gap-2 underline underline-offset-1 text-sm pt-1 md:flex items-center hover:bg-gray-100 rounded-md p-1">
          <Heart className="h-4 w-4 text-text-400" />
          <Typography className="text-sm text-text-400">
            {isClicked ? "Saved" : "Save"}
          </Typography>
        </div>
      </button>
      <SharePlaceModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  )
}

export default ShareSave

"use client"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"

interface WhereYouWillBe {
  locationDescription?: string
}

const WhereYouWillBe: React.FC<WhereYouWillBe> = ({ locationDescription }) => {
  return (
    <div>
      <Typography fontWeight="semibold" className="text-3xl px-4 mb-5">
        Where You'll be
      </Typography>
      <div className="px-4">
        <Typography variant="p" fontWeight="normal">
          <p className="w-full break-words">{locationDescription}</p>
        </Typography>
      </div>
    </div>
  )
}

export default WhereYouWillBe

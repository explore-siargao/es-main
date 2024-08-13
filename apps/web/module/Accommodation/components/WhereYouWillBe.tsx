"use client"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import { TitleSection } from "./TitleSection"

interface WhereYouWillBe {
  title: string
  locationDescription?: string
}

const WhereYouWillBe: React.FC<WhereYouWillBe> = ({
  title,
  locationDescription,
}) => {
  return (
    <div>
      <Typography fontWeight="semibold" className="text-3xl px-4 mb-5">
        Where You'll be
      </Typography>
      <div className="container px-4">
        <TitleSection
          title={title}
          className="text-xl font-semibold mb-4"
        ></TitleSection>
      </div>
      <div className="px-4">
        <Typography variant="p" fontWeight="normal">
          {locationDescription}
        </Typography>
      </div>
    </div>
  )
}

export default WhereYouWillBe

"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"

type T_Prop = {
  chefNote: string
}

const ChefsNote = ({ chefNote }: T_Prop) => {
  return (
    <div className="my-8">
      <Typography variant="h1" fontWeight="bold" className="uppercase">
        From the Chef
      </Typography>
      <div className="divide-y">
        <div className="py-4">
          <Typography variant="h4">{chefNote}</Typography>
        </div>
      </div>
    </div>
  )
}

export default ChefsNote

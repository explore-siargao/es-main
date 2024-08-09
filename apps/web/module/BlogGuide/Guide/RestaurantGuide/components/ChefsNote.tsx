"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"

type T_Prop = {
  note: string
}

const ChefsNote = ({ note }: T_Prop) => {
  return (
    <div className="my-14">
      <Typography variant="h1" fontWeight="semibold">
        Chef's Note
      </Typography>
      <div className="divide-y">
        <div className="py-4">
          <Typography variant="h4">{note}</Typography>
        </div>
      </div>
    </div>
  )
}

export default ChefsNote

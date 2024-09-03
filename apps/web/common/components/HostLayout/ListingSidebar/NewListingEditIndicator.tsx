"use client"
import { LucideEdit3 } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

const NewListingEditIndicator = ({ basePath }: { basePath: string }) => {
  const pathname = usePathname()
  return (
    <>{pathname.includes(basePath) && <LucideEdit3 className="h-4 w-4" />}</>
  )
}

export default NewListingEditIndicator

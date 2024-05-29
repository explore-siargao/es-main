"use client"
import { usePathname } from "next/navigation"
import React from "react"

const LinkIndicator = ({ basePath }: { basePath: string }) => {
  const pathname = usePathname()
  return (
    <>
      {pathname.includes(basePath) && (
        <div className="absolute left-0 w-[3px] h-6 bg-secondary-500 mt-2"></div>
      )}
    </>
  )
}

export default LinkIndicator

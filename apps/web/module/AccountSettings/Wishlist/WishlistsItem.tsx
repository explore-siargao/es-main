"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import WishlistsItemContainer from "@/module/AccountSettings/Wishlist/WishlistsItemContainer"
import React from "react"
import dynamic from "next/dynamic"

const SiargaoMap = dynamic(
  () => import("@/module/AccountSettings/Wishlist/SiargaoMap"),
  {
    ssr: false,
  }
)

const WishlistsItem = () => {
  return (
    <WidthWrapper width="full">
      <div className="flex pt-28">
        <div className="flex-1">
          <WishlistsItemContainer />
        </div>
        <div className="flex-1 hidden lg:block z-0">
          <div className="h-[calc(100vh-112px)] w-6/12 fixed">
            <SiargaoMap />
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default WishlistsItem

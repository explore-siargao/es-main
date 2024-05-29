import AuthGuard from "@/common/components/AuthGuard"
import WishlistsItem from "@/module/AccountSettings/Wishlist/WishlistsItem"
import React from "react"

const WishListItemPage = () => {
  return (
    <AuthGuard>
      <WishlistsItem />
    </AuthGuard>
  )
}

export default WishListItemPage

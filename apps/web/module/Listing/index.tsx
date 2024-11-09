import React from "react"
import BoxContainer from "@/module/Listing/components/BoxContainer"
import { E_Listing_Category } from "@repo/contract"

export type BookingProps = {
  listingId: number
  photos: {
    key: string
    alt: string
  }[]
  distance: string
  location: {
    city: string
  }
  date: string
  price: number
  dayTime: string
  ratings: string
  isHearted: boolean
  category: E_Listing_Category
}

const Listing = (props: BookingProps) => {
  return <BoxContainer {...props} />
}

export default Listing

import React from "react"
import BoxContainer from "@/module/Listing/components/BoxContainer"

export type BookingProps = {
  listingId: number
  photos: {
    fileKey: string
    alt: string
  }[]
  distance: string
  location: {
    city: string,
  }
  date: string
  price: number
  dayTime: string
  ratings: string
  isHearted: boolean
}

const ListingItems = (props: BookingProps) => {
  return <BoxContainer {...props} />
}

export default ListingItems

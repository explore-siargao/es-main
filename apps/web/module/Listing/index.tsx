import React from "react"
import BoxContainer from "@/module/Listing/components/BoxContainer"

export type BookingProps = {
  listingId: number
  imageKey: {
    fileKey: string
    alt: string
  }[]
  distance: string
  location: string
  date: string
  price: number
  dayTime: string
  ratings: string
  isHearted: boolean
}

const Listing = (props: BookingProps) => {
  return <BoxContainer {...props} />
}

export default Listing

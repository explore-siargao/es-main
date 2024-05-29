export type ImageKeys = {
  fileKey: string
  alt: string
}

export type Listings = {
  id: number
  hostedById: number
  images: ImageKeys
  title: string
  descriptionId: string
  address: string
  listingPriceId: number
  category: string
  favoriteBy: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: string | null
  latitude: string
  longitude: string
  basicAboutPlaceId: 1
  review: []
}

export type HostListingsProps = {
  name: string
  listings: Listings[]
}

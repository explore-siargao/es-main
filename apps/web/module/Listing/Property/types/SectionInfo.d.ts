export type T_Image = {
  _id?: string
  rentalId?: string
  key?: string
  thumbKey?: string
  isMain?: boolean
  description?: string
  tags?: string
  createdAt?: string
  __v?: number
  updatedAt?: string
  fileKey?: string
  alt?: string
  image?: {
    filename?: string
    url?: string
    alt?: string
  }
}

export type T_SectionInfoProps = {
  title: string
  images: T_Photo[]
  ratings?: number
  reviews?: number
  priceRangeLow?: number
  priceRangeHigh?: number
  location?: string
  cuisine?: string
  menus?: any
  events?: any
}

export type T_ImagesProps = {
  openModal: () => void
  images: T_Image[]
  isViewModal: boolean
  showThreeOnly?: boolean
  showTwoOnly?: boolean
  isRoundedEdge?: boolean
  isImageAllowClickView?: boolean
}

export type T_ImageGalleryModalProps = {
  isOpen: boolean
  onClose: () => void
  images: T_Image[]
}

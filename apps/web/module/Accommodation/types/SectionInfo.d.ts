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
    url?: string
    alt?: string
  }
}

export type T_SectionInfoProps = {
  title: string
  images: T_Image[]
}

export type T_ImagesProps = {
  openModal: () => void
  images: T_Image[]
  isViewModal: boolean
  showThreeOnly?: boolean
  isRoundedEdge?: boolean
}

export type T_ImageGalleryModalProps = {
  isOpen: boolean
  onClose: () => void
  images: T_Image[]
}

export type T_Image = {
  fileKey: string
  alt: string
}

export type T_SectionInfoProps = {
  title: string
  images: T_Image[]
}

export type T_ImagesProps = {
  openModal: () => void
  images: T_Image[]
}

export type T_ImageGalleryModalProps = {
  isOpen: boolean
  onClose: () => void
  images: T_Image[]
}

export type T_Offer = {
  _id?: string
  index?: number
  category?: string
  facility?: string
  isSelected?: boolean
  createdAt?: string
  updatedAt?: string | null
  deletedAt?: string | null
  icon?: string
  description?: string
  isNotIncluded?: boolean
}

export type T_OfferModal = {
  _id?: string
  index?: number
  category?: string
  facility?: string
  isSelected?: boolean
  createdAt?: string
  updatedAt?: string | null
  deletedAt?: string | null
  icon?: string
  description?: string
  isNotIncluded?: boolean
  title: string
  offers: T_Offer[]
}

export type T_PlaceOfferProps = {
  offers: T_Offer[]
  group?: T_OfferModal[]
}

export type T_Offer = {
  icon: string
  description: string
  isNotIncluded: boolean
}

export type T_OfferModal = {
  title: string
  offers: T_Offer[]
}

export type T_PlaceOfferProps = {
  offers: T_Offer[]
  group: T_OfferModal[]
}

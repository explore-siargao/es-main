export type T_BookingDescriptionProps = {
  generalDescription: string
  aboutSpace: string
  aboutGuestAccess: string
  otherThingsNote: string
}

export type T_BookingDescriptionModalProps = {
  isOpen: boolean
  onClose: () => void
  listingDescription: T_BookingDescriptionProps
}

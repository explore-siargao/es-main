import { Listing, Review } from "./HostReviews"

export type AllReviewsModalProps = {
  isOpen: boolean
  onClose: () => void
  reviews: Listing[]
  countReviews: number
}

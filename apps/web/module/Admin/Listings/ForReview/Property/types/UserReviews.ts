export type T_UserReviews = {
  imageSrc: string
  name: string
  origin: string
  rate: number
  date: string
  review: string
  showMore: boolean
}

export type T_UserReviewsProps = {
  reviews: T_UserReviews[]
}

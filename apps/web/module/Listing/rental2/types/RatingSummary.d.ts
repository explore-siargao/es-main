export type T_Categories = {
  title: string
  rating: string
  isHorizontal: boolean
}

export type T_RatingSummaryProps = {
  ratings: number
  reviews: number
  categories: T_Categories[]
}

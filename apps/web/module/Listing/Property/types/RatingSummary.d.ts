export type T_Categories = {
  title: string
  rating: string | number | undefined
  isHorizontal: boolean
}

export type T_RatingSummaryProps = {
  ratings: number
  reviews: number
  categories: T_Categories[]
}

import OverallRating from "./overall-rating"
import Category from "./category"
import {
  KeyRound,
  SprayCan,
  CheckCircle2,
  MessageSquare,
  Map,
  Tag,
  LucideStar,
} from "lucide-react"
import { Typography } from "@/common/components/ui/Typography"
import {
  T_Categories,
  T_RatingSummaryProps,
} from "../property/types/RatingSummary"
import { T_Reviews } from "@repo/contract-2/review"
import RatingDistribution from "./overall-review"

type T_HeadReviewProps = {
  ratings: number
  reviews: number
  categories: T_Categories[]
  totalRating: T_Reviews
}
const HeadReview = ({
  ratings,
  reviews,
  categories,
  totalRating,
}: T_HeadReviewProps) => {
  console.log(totalRating, "totalRating")
  return (
    <>
      <div className="flex mb-4 space-x-2">
        <LucideStar className="h-6 w-6" />
        <Typography variant="h3" fontWeight="semibold">
          {ratings} &middot; {reviews} reviews
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-6 gap-y-5 lg:gap-y-0 lg:divide-x divide-y lg:divide-y-0">
        <div className="md:col-span-2 lg:col-span-2">
          <OverallRating reviews={totalRating} />
        </div>
        <div className="md:col-span-3 lg:col-span-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-full md:items-center lg:divide-x">
            {categories.map((category) => {
              if (!category.title) return
              return (
                <Category
                  title={category.title}
                  rating={category.rating}
                  isHorizontal={category.isHorizontal}
                  icon={
                    category.title === "Cleanliness" ? (
                      <SprayCan strokeWidth={1.5} className="h-7 w-7" />
                    ) : category.title === "Accuracy" ? (
                      <CheckCircle2 strokeWidth={1.5} className="h-7 w-7" />
                    ) : category.title === "Check-in" ? (
                      <KeyRound strokeWidth={1.5} className="h-7 w-7" />
                    ) : category.title === "Communication" ? (
                      <MessageSquare strokeWidth={1.5} className="h-7 w-7" />
                    ) : category.title === "Location" ? (
                      <Map strokeWidth={1.5} className="h-7 w-7" />
                    ) : category.title === "Value" ? (
                      <Tag strokeWidth={1.5} className="h-7 w-7" />
                    ) : (
                      ""
                    )
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeadReview

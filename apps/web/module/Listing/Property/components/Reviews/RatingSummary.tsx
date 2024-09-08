import OverallRating from "./OverallRating"
import Category from "./Category"
import {
  KeyRound,
  SprayCan,
  CheckCircle2,
  MessageSquare,
  Map,
  Tag,
} from "lucide-react"
import { StarIcon } from "@heroicons/react/20/solid"
import { Typography } from "@/common/components/ui/Typography"
import { T_RatingSummaryProps } from "../../types/RatingSummary"

const HeadReview = ({ ratings, reviews, categories }: T_RatingSummaryProps) => {
  return (
    <>
      <div className="flex mb-4 space-x-2">
        <StarIcon className="h-6 w-6" />
        <Typography variant="h3" fontWeight="semibold">
          {ratings} &middot; {reviews} reviews
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-6 gap-y-5 lg:gap-y-0 lg:divide-x divide-y lg:divide-y-0">
        <div className="md:col-span-2 lg:col-span-2">
          <OverallRating />
        </div>
        <div className="md:col-span-3 lg:col-span-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-full md:items-center lg:divide-x">
            {categories.map((category) => {
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

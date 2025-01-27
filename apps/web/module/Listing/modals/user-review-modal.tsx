import ModalContainer from "@/common/components/ModalContainer"
import OverallRating from "../reviews/overall-rating"
import {
  KeyRound,
  SprayCan,
  CheckCircle2,
  MessageSquare,
  Map,
  Tag,
  LucideStar,
} from "lucide-react"
import Category from "../reviews/category"
import { Typography } from "@/common/components/ui/Typography"
import UserReview from "../reviews/review"
import { T_Reviews } from "@repo/contract-2/review"
import { userReviews } from "../dummy"
import { T_Review_Category } from "@/common/types/global"
interface UserReviewModalProps {
  isOpen: boolean
  onClose: () => void
  reviews?: T_Reviews
  categories?: T_Review_Category[]
}

const UserReviewModal = ({
  isOpen,
  onClose,
  reviews,
  categories,
}: UserReviewModalProps) => {
  const countWords = (str: string) => {
    return str.trim().split(/\s+/).length
  }
  console.log(reviews, "reviews")

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="md">
      <div className="md:flex px-7 md:px-8 py-6 md:space-x-14 h-[80vh] overflow-y-scroll">
        <div className="md:w-[30%]">
          <div className="flex items-center mb-5">
            <LucideStar className="h-6 w-6 mb-1 mr-2" />
            <Typography className="text-2xl" fontWeight="semibold">
              {categories?.[7]?.rating}
            </Typography>
          </div>
          <div className="mb-4">
            <OverallRating reviews={reviews as T_Reviews} />
          </div>
          <div>
            <Category
              isHorizontal={true}
              title={categories?.[0]?.title}
              rating={categories?.[0]?.rating}
              icon={<SprayCan strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title={categories?.[1]?.title}
              rating={categories?.[1]?.rating}
              icon={<CheckCircle2 strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title={categories?.[2]?.title}
              rating={categories?.[2]?.rating}
              icon={<KeyRound strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title={categories?.[3]?.title}
              rating={categories?.[3]?.rating}
              icon={<MessageSquare strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title={categories?.[4]?.title}
              rating={categories?.[4]?.rating}
              icon={<Map strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title={categories?.[5]?.title}
              rating={categories?.[5]?.rating}
              icon={<Tag strokeWidth={1} />}
            />
          </div>
        </div>
        <div className="md:w-[70%]">
          <div className="flex items-center justify-between mt-4">
            <Typography variant="h2" fontWeight="semibold">
              {categories?.[6]?.rating} reviews
            </Typography>
            <div className="rounded-full px-1 py-1 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600">
              <select className="block w-full border-0 text-xs py-0 pl-3 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
                <option>Most recent</option>
                <option>Highest rated</option>
                <option>Lowest rated</option>
              </select>
            </div>
          </div>
          <div className="py-8 space-y-8">
            {reviews?.map((review, index) => (
              <UserReview
                key={review._id}
                avatarKey={userReviews[index]?.imageSrc || ""}
                name={`${review?.reviewer?.guest?.firstName || ""} ${review?.reviewer?.guest?.middleName || ""} ${review?.reviewer?.guest?.lastName || ""}`}
                origin={`${review?.reviewer?.guest?.address?.city} ${review?.reviewer?.guest?.address?.stateProvince},  ${review?.reviewer?.guest?.address?.country}`}
                rate={review?.totalRates}
                date={review?.createdAt as string}
                review={review?.comment}
                showMore={countWords(review.comment) > 300}
              />
            ))}
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default UserReviewModal

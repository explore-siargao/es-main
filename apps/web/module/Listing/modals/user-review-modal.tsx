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

interface UserReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const userReviews = [
  {
    imageSrc: "1.jpg",
    name: "Bradford",
    origin: "Canada",
    rate: 5,
    date: "January 1, 1889",
    review:
      "Beautiful, quiet and private! This place offers solitude to everyone who wants to disappear from chaotic crowd once in a while. Place is romantic and cozy. It is the same as the pictures. We love the comfortable king size bed, outdoor shower, pool and kitchen! It is complete of amenities. Host are friendly and give us recommendations. Highly recommended. Will definitely come back again. Thank you!",
    showMore: false,
  },
  {
    imageSrc: "2.jpg",
    name: "Maygan",
    origin: "California, United States",
    rate: 4,
    date: "February 15, 1890",
    review:
      "The villa is exactly as seen in the photos, such an absolute dream to stay in! We were there during rainy season, so it’s a bit of an adventure to leave the villa on the beaten path. If it’s rainy, there are massive puddles to get through and only certain drivers will go through it (which the host help to arrange!).",
    showMore: true,
  },
  {
    imageSrc: "1.jpg",
    name: "Sami",
    origin: "Helsinki, Finland",
    rate: 5,
    date: "January 1, 1889",
    review:
      "The villa is extremely clean, cozy, beautiful, and right next to a quite and one of the most beautiful beaches on the island! We had an amazing stay all in all. Claire the caretaker was super responsive and took care of every need that we had during our 7 day stay.",
    showMore: true,
  },
  {
    imageSrc: "2.jpg",
    name: "Anna",
    origin: "Toronto, Canada",
    rate: 4,
    date: "February 15, 1890",
    review:
      "We loved our stay at Simon’s place. Beautifully designed and with lots of amenities (bathrobes were a nice touch!). We made full use of the beautiful outdoor shower, bathtub and pool! And I just loved having a chance to play a little on the electric piano! The villa was peaceful and secluded and the caretaker was lovely. We also really enjoyed walking out onto a pristine empty beach.",
    showMore: false,
  },
]

const UserReviewModal = ({ isOpen, onClose }: UserReviewModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="md">
      <div className="md:flex px-7 md:px-8 py-6 md:space-x-14 h-[80vh] overflow-y-scroll">
        <div className="md:w-[30%]">
          <div className="flex items-center mb-5">
            <LucideStar className="h-6 w-6 mb-1 mr-2" />
            <Typography className="text-2xl" fontWeight="semibold">
              4.60
            </Typography>
          </div>
          <div className="mb-4">
            <OverallRating />
          </div>
          <div>
            <Category
              isHorizontal={true}
              title="Cleanliness"
              rating="4.8"
              icon={<SprayCan strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title="Accuracy"
              rating="4.8"
              icon={<CheckCircle2 strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title="Check-in"
              rating="5.0"
              icon={<KeyRound strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title="Communication"
              rating="4.4"
              icon={<MessageSquare strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title="Location"
              rating="5.0"
              icon={<Map strokeWidth={1} />}
            />
            <hr />
            <Category
              isHorizontal={true}
              title="Value"
              rating="5.0"
              icon={<Tag strokeWidth={1} />}
            />
          </div>
        </div>
        <div className="md:w-[70%]">
          <div className="flex items-center justify-between mt-4">
            <Typography variant="h2" fontWeight="semibold">
              4 reviews
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
            {userReviews.map((review) => (
              <UserReview
                key={review.date}
                avatarKey={review.imageSrc}
                name={review.name}
                origin={review.origin}
                rate={review.rate}
                date={review.date}
                review={review.review}
                showMore={false}
              />
            ))}
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default UserReviewModal

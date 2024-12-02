import { Typography } from "@/common/components/ui/Typography"
import ReviewCard from "./ReviewCard"
import { Button } from "@/common/components/ui/Button"
import { HostReviewsProps } from "../types/HostReviews"
import { useState } from "react"
import AllReviewsModal from "./modals/AllReviewsModal"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import SwiperCustomButton from "./SwiperCustomButton"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

const HostReviews = ({ name, reviewsCount, reviews }: HostReviewsProps) => {
  const [openReviewsModal, setOpenReviewsModal] = useState(false)

  return (
    <div className="profile-slider">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
      >
        <style>
          {`
            .profile-slider .swiper-wrapper {
              width: 100px;
            }
          `}
        </style>
        <div className="flex justify-between items-center absolute top-0 w-full z-10">
          <Typography variant="h2" fontWeight="semibold" className="text-2xl">
            {name}'s reviews
          </Typography>
          <div className="hidden md:block space-x-2">
            <SwiperCustomButton />
          </div>
        </div>
        {reviews?.map((listing) => (
          <div key={listing.id}>
            {listing?.review?.slice(0, 5).map((review) => (
              <SwiperSlide className="mt-14" key={review.id}>
                <ReviewCard
                  reviewerName={
                    review?.user?.personalInfo?.firstName +
                    " " +
                    review?.user?.personalInfo?.lastName
                  }
                  reviewMessage={review?.comment}
                  reviewerImage={"1.jpg"}
                  reviewDate={review?.createdAt}
                  forModal={false}
                />
              </SwiperSlide>
            ))}
          </div>
        ))}
      </Swiper>
      <Button
        variant="outline"
        onClick={() => setOpenReviewsModal(true)}
        className="font-semibold text-[16px] w-full md:w-auto mt-7"
      >
        Show all {reviewsCount} reviews
      </Button>
      <AllReviewsModal
        reviews={reviews}
        isOpen={openReviewsModal}
        countReviews={reviewsCount}
        onClose={() => setOpenReviewsModal(false)}
      />
    </div>
  )
}

export default HostReviews

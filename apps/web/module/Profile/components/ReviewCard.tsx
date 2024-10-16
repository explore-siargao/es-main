import Image from "@/common/components/ui/image"
import { ASSET_ROOT } from "@/common/constants/index"
import { ReviewsCardProps } from "../types/ReviewCard"

const ReviewCard = ({
  reviewMessage,
  reviewerImage,
  reviewerName,
  reviewDate,
  forModal,
}: ReviewsCardProps) => {
  const date = new Date(reviewDate)

  return (
    <div
      className={`${forModal ? "flex flex-col-reverse py-5" : "border rounded-md p-5"}`}
    >
      {forModal ? (
        <p>{reviewMessage}</p>
      ) : (
        <p>“...{reviewMessage.substring(0, 180)}...</p>
      )}
      <div className={`${forModal ? "mb-5" : "mt-5"} flex items-center`}>
        <div className="relative h-14 w-14 bg-gray-200 rounded-full">
          <Image
            src={`${ASSET_ROOT}/${reviewerImage}`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            alt="Reviewer's profile"
          />
        </div>
        <div className="ml-4 leading-5 mt-0.5">
          <h4 className="font-semibold">{reviewerName}</h4>
          <h4 className="text-gray-500 text-[15px]">
            {date.toLocaleString("en-US", { month: "long" }) +
              " " +
              date.toLocaleString("en-US", { year: "numeric" })}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard

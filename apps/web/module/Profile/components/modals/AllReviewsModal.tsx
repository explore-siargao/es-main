import ModalContainer from "@/common/components/ModalContainer"
import { AllReviewsModalProps } from "../../types/AllReviewsModal"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import ReviewCard from "../ReviewCard"
import Image from "@/common/components/ui/image"
import { ASSET_ROOT } from "@/common/constants"
import { Button } from "@/common/components/ui/Button"

const AllReviewsModal = ({
  isOpen,
  onClose,
  reviews,
  countReviews,
}: AllReviewsModalProps) => {
  const tabs = [
    {
      name: "From guests",
      href: "#",
      reviewCounts: countReviews,
      current: true,
    },
    { name: "From hosts", href: "#", reviewCounts: 0, current: false },
  ]

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-5 h-[80vh] overflow-y-auto">
        <Typography variant="h2" fontWeight="semibold">
          {countReviews} reviews
        </Typography>
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="mt-4 block w-full rounded-md border-primary-300 py-2 pl-3 pr-10 text-base focus:border-primary-600 focus:outline-none focus:ring-primary-600 sm:text-sm"
              // @ts-ignore
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={cn(
                      tab.current
                        ? "border-gray-600 text-gray-800 font-semibold"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "whitespace-nowrap border-b-2 pt-4 pb-2 font-medium mt-4"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <div className="flex items-center">
                      {tab.name}
                      <span className="text-[8px] mx-1">•</span>
                      {tab.reviewCounts}
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {reviews?.map((data) => (
          <div key={data.id}>
            {data?.review?.map((review) => (
              <div key={review.id}>
                <div className="my-5">
                  <div className="flex space-x-2">
                    <div className="w-4/5">
                      <Typography variant="h3" fontWeight="semibold">
                        {data.title}
                      </Typography>
                    </div>
                    <div className="w-1/5 bg-gray-200 h-14 relative rounded-md">
                      <Image
                        src={`${ASSET_ROOT}/${data?.images[0]?.fileKey}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-md"
                        alt="listing-image"
                      />
                    </div>
                  </div>
                  <div>
                    <ReviewCard
                      reviewerImage={"1.jpg"}
                      reviewerName={
                        review.user.personalInfo.firstName +
                        " " +
                        review.user.personalInfo.lastName
                      }
                      reviewMessage={review.comment}
                      reviewDate={review.createdAt}
                      forModal={true}
                    />
                    <hr />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <Button variant="outline" className="text-base font-semibold">
          Show more reviews
        </Button>
      </div>
    </ModalContainer>
  )
}

export default AllReviewsModal

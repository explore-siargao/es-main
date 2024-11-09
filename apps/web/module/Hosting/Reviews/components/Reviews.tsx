import Image from "@/common/components/ui/image"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import { cn } from "@/common/helpers/cn"
import useGetReviewsByHost from "../../hooks/useGetReviewsByHost"
import { Spinner } from "@/common/components/ui/Spinner"
import { format } from "date-fns"

const ReviewCard = () => {
  const { data, isPending } = useGetReviewsByHost(1)

  const imageContainer = (...classes: any) =>
    cn("flex-none", "w-14", "h-14", ...classes)
  const imageShape = (...classes: any) =>
    cn("relative", "h-14", "w-14", "bg-gray-200", ...classes)

  return (
    <>
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {isPending ? (
          <Spinner size="md">Loading...</Spinner>
        ) : (
          data?.allItemCount + " Reviews"
        )}
      </Typography>

      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <>
          {data?.items?.map((review) => (
            <>
              <div className="flex mb-4 pt-8">
                <div className={imageContainer()}>
                  <div className={`${imageShape()} rounded-full`}>
                    <Image
                      src={`/assets/${review.reviewedBy.profilePic}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                      alt="Reviewer's profile"
                    />
                  </div>
                </div>
                <div className="name-and-date grow h-14 pl-4">
                  <Typography>{review.reviewedBy.name}</Typography>
                  <h4 className="text-gray-500 text-[15px]">
                    {format(review.createdAt, "MMMM dd, yyyy")}
                  </h4>
                </div>
                <div className="flex-none w-18 h-14">
                  <div className={imageContainer()}>
                    <div className={`${imageShape()}rounded-xl`}>
                      <Image
                        src={`/assets/${review.listing.image}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-xl"
                        alt="Reviewer's profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <p>{review.comment}</p>
                <p>{review.reply.reply}</p>
              </div>
              <div className="flex flex-col">
                <textarea></textarea>
              </div>
              <div className="flex items-center pt-4 md:bottom-0 border-b-2 border-gray-200 rounded-b dark:border-gray-600">
                <div className="flex justify-between w-full">
                  <Button variant="primary" className="ml-auto mb-6">
                    Reply
                  </Button>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  )
}

export default ReviewCard

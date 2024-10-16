import { Button } from "@/common/components/ui/Button"
import { Textarea } from "@/common/components/ui/Textarea"
import { Typography } from "@/common/components/ui/Typography"
import { ASSET_ROOT } from "@/common/constants"
import Image from "@/common/components/ui/image"
import { useRouter } from "next/navigation"
import React from "react"

type BookingReviewItemProps = {
  id: number
  image: string
  title: string
  dateFrom: string
  dateTo: string
}

const BookingReviewItemPending = ({
  id,
  title,
  image,
  dateFrom,
  dateTo,
}: BookingReviewItemProps) => {
  const router = useRouter()

  const rawDateFrom = new Date(dateFrom)
  const rawDateTo = new Date(dateTo)

  const formattedDateFrom = rawDateFrom.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const formattedDateTo = rawDateTo.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  return (
    <div key={id} className="flex w-full p-6 gap-x-4 items-center">
      <div className="flex w-full gap-x-4 items-center">
        <div className="h-24 w-24 rounded-xl bg-primary-100 relative">
          <Image
            src={`${ASSET_ROOT}/${image}`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            alt="booking-image"
          />
        </div>
        <div className="h-full flex flex-col content-between">
          <div className="col-span-3">
            <Typography variant={"h3"}>{title}</Typography>
          </div>
          <div className="col-span-3">
            <Typography variant="h6" className="text-gray-500 flex-shrink-0">
              {formattedDateFrom} to {formattedDateTo}
            </Typography>
          </div>
        </div>
      </div>
      <div className="w-full text-right">
        <Button
          onClick={() =>
            router.push(`/account-settings/booking-reviews/add-review/${id}`)
          }
          variant={"primary"}
        >
          Add Review
        </Button>
      </div>
    </div>
  )
}

export default BookingReviewItemPending

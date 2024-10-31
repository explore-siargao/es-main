"use client"
import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import React, { useState } from "react"
import BookingReviewItem from "./BookingReviewItem"
import { Breadcrumb } from "@/common/components/ui/Breadcrumb"
import { LINK_ACCOUNT } from "@/common/constants"
import { cn } from "@/common/helpers/cn"
import BookingReviewItemPending from "./BookingReviewItemPending"
import useGetReviewsByUserId from "../../Listing/hooks/useGetReviewsByUserId"
import useSessionStore from "@/common/store/useSessionStore"
import { ACCOUNT, BOOKING_REVIEWS } from "@/common/constants"
import useGetListings from "../hooks/useGetListings"
import useGetToReviews from "../hooks/useGetToReviews"
import { Typography } from "@/common/components/ui/Typography"

const BookingReviews = () => {
  const [tableState, setTableState] = useState(0)
  let content
  const userId = useSessionStore().id
  const { data: reviewsByUserId } = useGetReviewsByUserId(userId as number)
  const { data: listingData } = useGetListings()
  const { data: toReviewsData } = useGetToReviews()

  type ratingsSchema = {
    accuracyRates: number
    checkInRates: number
    cleanLinessRates: number
    communicationRates: number
    locationRates: number
    valueRates: number
  }

  function getAverageStars(ratings: ratingsSchema) {
    // Extract values from the ratings object
    const values = Object.values(ratings)

    // Calculate the sum of all values
    const sum = values.reduce((acc, currentValue) => acc + currentValue, 0)

    // Calculate the average
    const average = sum / values.length
    return average
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  if (tableState === 1) {
    content = (
      <>
        {reviewsByUserId?.items?.map((item, index) => {
          const ratings = {
            accuracyRates: item.accuracyRates,
            checkInRates: item.checkInRates,
            cleanLinessRates: item.cleanLinessRates,
            communicationRates: item.communicationRates,
            locationRates: item.locationRates,
            valueRates: item.valueRates,
          }

          const reviewDate = new Date(item.createdAt)

          const year = reviewDate.getFullYear()
          const monthIndex = reviewDate.getMonth()
          const day = reviewDate.getDate()
          const monthName = months[monthIndex]
          return (
            <>
              <BookingReviewItem
                id={item.listing.id}
                location={item.listing.address}
                name={item.listing.title}
                pic={item.listing.images[0].fileKey}
                reviewMessage={item.comment}
                reviewedTime={`${monthName} ${day}, ${year}`}
                key={item.id}
                averageRating={getAverageStars(ratings)}
              />
              {index === reviewsByUserId.items?.length! - 1 ? <></> : <hr />}
            </>
          )
        })}
      </>
    )
  } else if (tableState === 0) {
    content = (
      <div className="flex flex-col">
        {toReviewsData?.items?.length === 0 ? (
          <Typography variant="h3">No bookings at the moment.</Typography>
        ) : (
          toReviewsData?.items?.map((item, index) => (
            <div key={item.id}>
              <BookingReviewItemPending
                id={item.id}
                title={item.listing.title}
                image={item.listing.imageKey}
                dateFrom={item.fromDate}
                dateTo={item.toDate}
                key={item.id}
              />
              {index === toReviewsData?.items?.length! - 1 ? <></> : <hr />}
            </div>
          ))
        )}
      </div>
    )
  }
  return (
    <AccountSettingWrapper>
      <div>
        <Breadcrumb home={ACCOUNT} page={BOOKING_REVIEWS} link={LINK_ACCOUNT} />
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="text-4xl my-3.5"
        >
          {BOOKING_REVIEWS}
        </Typography>
      </div>
      <div className="hidden sm:block">
        <div className="flex border-b border-b-text-50">
          <button
            className={cn(
              tableState === 0
                ? "border-text-900 text-text-900"
                : "border-transparent text-text-500 hover:border-text-300 hover:text-text-700",
              "whitespace-nowrap border-b-2 py-4 px-8 text-sm font-medium"
            )}
            onClick={() => setTableState(0)}
          >
            To Review
            <span className="ml-2 inline-flex items-center rounded-full bg-error-600 px-2.5 py-0.5 text-[10px] font-bold text-white ring-1 ring-inset ring-error-500/10">
              {toReviewsData?.allItemCount}
            </span>
          </button>
          <button
            className={cn(
              tableState === 1
                ? "border-text-900 text-text-900"
                : "border-transparent text-text-500 hover:border-text-300 hover:text-text-700",
              "whitespace-nowrap border-b-2 py-4 px-8 text-sm font-medium"
            )}
            onClick={() => setTableState(1)}
          >
            Reviewed
          </button>
        </div>
        <div className="mt-6">{content}</div>
      </div>
    </AccountSettingWrapper>
  )
}

export default BookingReviews

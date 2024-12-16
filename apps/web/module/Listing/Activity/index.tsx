"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { useState } from "react"
import AvatarTitleDescription from "@/module/Listing/Property/components/AvatarTitleDescription"
import HostInformation from "@/module/Listing/Property/components/HostInformation"
import RatingSummary from "@/module/Listing/Property/components/Reviews/RatingSummary"
import ReportListingModal from "@/module/Listing/Property/components/modals/ReportListingModal"
import UserReviews from "../../Hosting/Listings/Properties/Property/Reviews/UserReviews"
import Hero from "./hero"
import PlaceOffers from "./PlaceOffers"
import Languages from "./Languages"
import Duration from "./Duration"
import Highlights from "./Highlights"
import ActivityDescription from "./ActivityDescription"
import WhatToBrings from "./WhatToBrings"
import NotAllowed from "./NotAllowed"
import ThingsToKnow from "./ThingsToKnow"
import MeetingPoint from "./MeetingPoint"
import CheckoutBox from "./CheckoutBox"
import Builder from "./Itinerary/Builder"
import { notFound } from "next/navigation"
import { activities, hostDummy, ratingSummary, userReviews } from "./dummy"
import PledgeBox from "../pledge-box"

export const ActivitySingleView = ({
  activityData: data,
}: {
  activityData: any
}) => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const hostingSince = new Date(data?.item?.host?.guest?.createdAt)
  const monthsDifference =
    (new Date().getFullYear() - hostingSince.getFullYear()) * 12 +
    (new Date().getMonth() - hostingSince.getMonth())

  const subTitle = `${monthsDifference} ${monthsDifference === 1 ? "month" : "months"} hosting`

  if (!data) {
    notFound()
  }

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      {data && <Hero images={data?.item?.photos} title={data?.item?.title} />}

      <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="py-6">
              {data && (
                <AvatarTitleDescription
                  avatarKey="2.jpg"
                  title={`Hosted by ${data?.item?.host?.guest?.firstName}`}
                  subTitle={subTitle}
                />
              )}
            </div>

            <div className="py-6">
              {data && (
                <ActivityDescription description={data?.item?.description} />
              )}
            </div>

            {data ? (
              <div className="py-6">
                <Builder />
              </div>
            ) : null}

            <div className="py-6">
              {data && <Highlights highlights={data?.item?.highLights} />}
            </div>

            <div className="py-6 ">
              {data && (
                <PlaceOffers
                  isFoodIncluded={data?.item?.isFoodIncluded}
                  isNonAlcoholicDrinkIncluded={
                    data?.item?.isNonAlcoholicDrinkIncluded
                  }
                  isAlcoholicDrinkIncluded={
                    data?.item?.isAlcoholicDrinkIncluded
                  }
                  otherInclusion={data?.item?.otherInclusion}
                  notIncluded={data?.item?.notIncluded}
                />
              )}
            </div>

            <div className="py-6 ">
              {data && <Languages languages={data?.item?.languages} />}
            </div>

            <div className="py-6 ">
              {data && (
                <Duration
                  durationHour={data?.item?.durationHour}
                  durationMinute={data?.item?.durationMinute}
                />
              )}
            </div>

            <div className="py-6">
              {data && <WhatToBrings whatToBrings={data?.item?.whatToBring} />}
            </div>

            <div className="py-6">
              {data && <NotAllowed notAllowed={data?.item?.notAllowed} />}
            </div>
          </div>
        </div>

        <div className="md:w-[27rem] md:relative">
          <div className="md:sticky md:top-6">
            <CheckoutBox
              //@ts-ignore
              checkoutDesc={{
                serviceFee: 1000,
                durationCost: 125000,
                descTotalBeforeTaxes: 3000,
                totalBeforeTaxes: 2000,
                titlePrice: 1000,
                pricePerAdditionalPerson: 0,
              }}
              timeSlot={undefined}
            />
            <PledgeBox/>
          </div>
        </div>
      </div>
      <div className="divide-y border-t">
        <div className="py-8">
          <RatingSummary
            ratings={ratingSummary.ratings}
            reviews={ratingSummary.reviews}
            categories={ratingSummary.categories}
          />
        </div>
        <div className="py-8">
          <UserReviews reviews={userReviews} />
        </div>

        <div className="py-8">
          {data && (
            <MeetingPoint
              location={`${data?.item?.meetingPoint?.streetAddress}, ${data?.item?.meetingPoint?.barangay}, ${data?.item?.meetingPoint?.city}`}
              coordinates={[
                data?.item?.meetingPoint?.latitude,
                data?.item?.meetingPoint?.longitude,
              ]}
              desc={data?.item?.meetingPoint?.howToGetThere}
            />
          )}
        </div>

        <div className="py-8">
          {data && (
            <HostInformation
              {...hostDummy}
              hostName={data?.item?.host?.guest?.firstName}
              joinedIn={new Date(
                data?.item?.host?.guest?.createdAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          )}
        </div>
      </div>
      <div className="md:w-96 md:relative">
        <div className="md:sticky md:top-6">
          <CheckoutBox
            checkoutDesc={{
              serviceFee: 1000,
              durationCost: 125000,
              descTotalBeforeTaxes: 3000,
              totalBeforeTaxes: 1000,
              titlePrice: activities.price.baseRate,
              pricePerAdditionalPerson:
                activities.price.pricePerAdditionalPerson,
            }}
            timeSlot={activities.timeSlots}
          />

          <div className="pt-8">
            {data && (
              <ThingsToKnow
                otherPolicies={data?.item?.policies}
                otherPoliciesModalData={data?.item?.policies}
                cancellationPolicies={data?.item?.cancellationDays}
                cancellationModalData={data?.item?.cancellationDays}
              />
            )}
          </div>
        </div>
      </div>
      <ReportListingModal isOpen={showModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default ActivitySingleView

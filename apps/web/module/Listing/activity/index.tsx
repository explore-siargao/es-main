"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { useRef, useState } from "react"
import RatingSummary from "@/module/Listing/reviews/rating-summary"
import ReportListingModal from "@/module/Listing/modals/report-listing-modal"
import UserReviews from "../../Hosting/Listings/Properties/Property/Reviews/UserReviews"
import Hero from "./hero"
import Inclusions from "./inclusions"
import Languages from "./languages"
import Duration from "./duration"
import Highlights from "./highlights"
import WhatToBring from "./what-to-bring"
import NotAllowed from "./not-allowed"
import MeetingPoint from "./meeting-point"
import CheckoutBoxJoiner from "./checkout-box/joiner"
import CheckoutBoxPrivate from "./checkout-box/private"
import Builder from "./itinerary/builder"
import { notFound } from "next/navigation"
import { ratingSummary, userReviews } from "./dummy"
import PledgeBox from "../pledge-box"
import { T_Activity } from "@repo/contract-2/activity"
import HostedBy from "../hosted-by"
import { Typography } from "@/common/components/ui/Typography"
import SimilarActivities from "./similar-activities"
import { Button } from "@/common/components/ui/Button"
import { LucideFlag } from "lucide-react"
import { E_Activity_Experience_Type } from "@repo/contract"
import HostPolicies from "./host-policies"
import CheckoutBox from "./checkout-box"

export const Activity = ({ activity }: { activity: T_Activity }) => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  if (!activity) {
    notFound()
  }

  const targetDivRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      {activity && (
        <Hero images={activity?.photos} title={activity.title || ""} />
      )}

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="pb-6">
              <HostedBy
                name={activity?.host?.guest.firstName || "Unknown"}
                language={activity?.host?.guest?.language}
                profilePicture={"2.jpg"}
                joinDate={activity?.host?.createdAt || ""}
              />
            </div>

            <div className="py-6">
              <Typography variant="h4">{activity?.description}</Typography>
            </div>

            {activity ? (
              <div className="pt-6 pb-8">
                <Builder
                  segments={activity.segments}
                  scrollToMap={handleScroll}
                />
              </div>
            ) : null}

            <div className="py-6">
              <Highlights highlights={activity?.highLights || []} />
            </div>

            <div className="py-6">
              <Inclusions
                isFoodIncluded={activity?.isFoodIncluded}
                isNonAlcoholicDrinkIncluded={
                  activity?.isNonAlcoholicDrinkIncluded
                }
                isAlcoholicDrinkIncluded={activity?.isAlcoholicDrinkIncluded}
                otherInclusion={activity?.otherInclusion}
                notIncluded={activity?.notIncluded}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 py-6">
              <Languages languages={activity?.languages} />
              <Duration
                durationHour={activity?.durationHour}
                durationMinute={activity?.durationMinute}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 py-6">
              <WhatToBring whatToBring={activity?.whatToBring} />
              <NotAllowed notAllowed={activity?.notAllowed} />
              <HostPolicies activity={activity} />
            </div>
          </div>
        </div>

        <div className="md:w-[27rem] md:relative">
          <div className="md:sticky md:top-6">
            {/* {activity.experienceType === E_Activity_Experience_Type.Private ? (
              <CheckoutBoxPrivate activity={activity} />
            ) : null}
            {activity.experienceType === E_Activity_Experience_Type.Joiner ? (
              <CheckoutBoxJoiner activity={activity} />
            ) : null} */}
            <CheckoutBox activity={activity} />
            <PledgeBox />
            <div className="flex justify-center">
              <div className="justify-items-center">
                <Button
                  variant="ghost"
                  className="underline md:float-right flex gap-1 items-center text-text-400 hover:text-text-600"
                  size="sm"
                  onClick={handleOpenModal}
                >
                  <LucideFlag className="h-4 w-4" />
                  Report this listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y border-t">
        <div className="py-8" ref={targetDivRef}>
          <MeetingPoint meetingPoint={activity?.meetingPoint} />
        </div>
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
          <SimilarActivities />
        </div>
      </div>
      <ReportListingModal isOpen={showModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default Activity

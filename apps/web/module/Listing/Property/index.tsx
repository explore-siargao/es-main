"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import HostInformation from "./host-information"
import BookingDescription from "./booking-description"
import Hero from "./hero"
import SummaryInfo from "./summary-info"
import RatingSummary from "../reviews/rating-summary"
import UserReviews from "../reviews/user-reviews"
import CheckoutBox from "./checkout-box"
import PlaceOffers from "./place-offers"
import WhereYoullBeDescription from "./where-you-will-be/map"
import { Button } from "@/common/components/ui/Button"
import { Flag } from "lucide-react"
import { useState } from "react"
import ReportListingModal from "../modals/report-listing-modal"
import AvailableBooking from "./available-units"
import { format, parseISO } from "date-fns"
import { description, hostDummy, ratingSummary, userReviews } from "../dummy"
import PledgeBox from "../pledge-box"
import HostedBy from "../hosted-by"
import SimilarProperties from "./similar-properties"
import { Typography } from "@/common/components/ui/Typography"
import HostPolicies from "./host-policies"
import { T_Property } from "@repo/contract-2/property"

export const Property = ({
  property,
  unitId,
}: {
  property: T_Property
  unitId: string
}) => {
  const [showReportModal, setShowReportModal] = useState(false)

  const handleOpenModal = () => {
    setShowReportModal(true)
  }
  const handleCloseModal = () => {
    setShowReportModal(false)
  }
  const offerBy = property
  const formattedDate = offerBy?.createdAt
    ? format(parseISO(offerBy.createdAt as string), "MMMM d, yyyy")
    : ""
  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      <Hero images={property?.photos} title={property?.title} />

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="pb-6">
              <HostedBy
                name={property?.offerBy?.guest?.firstName}
                language={property?.offerBy?.guest?.language}
                profilePicture={property?.offerBy?.profilePicture}
                joinDate={
                  property?.createdAt
                    ? format(property.createdAt, "MMMM d, yyyy")
                    : ""
                }
              />
            </div>
            <div className="py-6">
              <SummaryInfo
                bookableUnits={property?.bookableUnits}
                location={property?.location}
              />
            </div>
            <div className="py-6">
              <BookingDescription {...description} />
            </div>

            <div className="py-6 ">
              <PlaceOffers offers={property?.facilities} />
            </div>
            <div className="py-6">
              {property?.bookableUnits?.length > 0 ? (
                <AvailableBooking property={property} selectedUnitId={unitId} />
              ) : (
                <Typography variant="h5" className="text-text-400 italic">
                  No available units for this property
                </Typography>
              )}
            </div>
            <div className="pt-6">
              <HostPolicies property={property} />
            </div>
          </div>
        </div>
        <div className="md:w-[27rem] md:relative">
          <div className="md:sticky md:top-6">
            <CheckoutBox
              selectedUnitId={unitId}
              propertyId={property?._id}
              units={property?.bookableUnits}
            />
            <PledgeBox />
            <div className="flex justify-center">
              <div className="justify-items-center">
                <Button
                  variant="ghost"
                  className="underline md:float-right flex gap-1 items-center text-text-400 hover:text-text-600"
                  size="sm"
                  onClick={handleOpenModal}
                >
                  <Flag className="h-4 w-4" />
                  Report this listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y border-t">
        <div className="py-8">
          <WhereYoullBeDescription location={property?.location} />
        </div>
        <div className="py-8">
          <RatingSummary
            ratings={ratingSummary.ratings}
            reviews={ratingSummary.reviews}
            categories={ratingSummary.categories}
          />
        </div>
        <div className="py-8">
          <UserReviews reviews={property?.reviews} />
        </div>
        <div className="py-8">
          <HostInformation
            hostName={`${offerBy?.offerBy?.guest?.firstName || ""} ${offerBy?.offerBy?.guest?.middleName || ""} ${offerBy?.offerBy?.guest?.lastName || ""}`}
            hostProfilePic={hostDummy.hostProfilePic}
            joinedIn={formattedDate}
            countReviews={0}
            rules={hostDummy.rules}
            responseRate={0}
            responseTime={""}
          />
        </div>
        <div className="py-8">
          <SimilarProperties />
        </div>
      </div>
      <ReportListingModal isOpen={showReportModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default Property

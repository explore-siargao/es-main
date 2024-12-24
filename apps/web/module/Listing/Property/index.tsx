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
import { T_BookableUnitType } from "@repo/contract"
import { format, parseISO } from "date-fns"
import { description, hostDummy, ratingSummary, userReviews } from "../dummy"
import PledgeBox from "../pledge-box"
import HostedBy from "../hosted-by"
import SimilarProperties from "./similar-properties"
import { Typography } from "@/common/components/ui/Typography"
import HostPolicies from "./host-policies"

export const Property = ({ propertyData: data }: { propertyData: any }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedBookableUnit, setSelectedBookableUnit] =
    useState<T_BookableUnitType>()

  const handleSelectBookableUnit = (bookableUnit: T_BookableUnitType) => {
    setSelectedBookableUnit(bookableUnit)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const offerBy = data?.item
  const formattedDate = offerBy?.createdAt
    ? format(parseISO(offerBy.createdAt), "MMMM d, yyyy")
    : ""
  const latitude = data?.item?.location?.latitude
  const longitude = data?.item?.location?.longitude

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      <Hero images={data?.item?.photos} title={data?.item?.title} />

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="pb-6">
              <HostedBy
                name={data?.item?.offerBy?.guest?.firstName}
                language={data?.item?.offerBy?.guest?.language}
                profilePicture={data?.item?.offerBy?.guest?.profilePicture}
                joinDate={data?.item?.offerBy?.createdAt}
              />
            </div>
            <div className="py-6">
              <SummaryInfo
                bookableUnits={data?.item?.bookableUnits}
                location={data?.item?.location}
              />
            </div>
            <div className="py-6">
              <BookingDescription {...description} />
            </div>

            <div className="py-6 ">
              <PlaceOffers
                offers={data?.item?.facilities}
                group={data?.item?.facilities}
              />
            </div>
            <div className="py-6">
              {data?.item?.bookableUnits?.length > 0 ? (
                <AvailableBooking
                  bookableUnits={data?.item?.bookableUnits}
                  propertyType={data?.item?.type}
                  onSelectBookableUnit={handleSelectBookableUnit}
                  selectedBookableUnit={selectedBookableUnit}
                  imagesAvailable={data?.item?.photos}
                />
              ) : (
                <Typography variant="h5" className="text-text-400 italic">No available units for this property</Typography>
              )}
            </div>
            <div className="pt-6">
              <HostPolicies property={data.item} />
            </div>
          </div>
        </div>
        <div className="md:w-[27rem] md:relative">
          <div className="md:sticky md:top-6">
            <CheckoutBox
              selectedBookableUnit={selectedBookableUnit}
              handleSelectBookableUnit={handleSelectBookableUnit}
              units={data?.item?.bookableUnits}
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
          {data?.item?.location &&
            typeof latitude === "number" &&
            typeof longitude === "number" && (
              <WhereYoullBeDescription
                location={data.item.location}
                coordinates={[latitude, longitude]}
                desc={data.item.location.howToGetThere}
                locationDescription={data?.item?.location.howToGetThere}
              />
            )}
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
      <ReportListingModal isOpen={showModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default Property

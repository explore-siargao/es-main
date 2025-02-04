"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import HostInformation from "./host-information"
import About from "./about"
import Hero from "./hero"
import RatingSummary from "../reviews/rating-summary"
import UserReviews from "../reviews/user-reviews"
import CheckoutBox from "./checkout-box"
import PickUpLocation from "./pickup-location"
import { Button } from "@/common/components/ui/Button"
import { Flag } from "lucide-react"
import { useState } from "react"
import ReportListingModal from "./modals/report-listing-modal"
import Requirements from "./requirements"
import Inclusions from "./inclusions"
import SimilarRentals from "./similar-rentals"
import { hostDummy, ratingSummary, userReviews } from "./dummy"
import PledgeBox from "../pledge-box"
import { T_Rental } from "@repo/contract-2/rental"
import HostedBy from "../hosted-by"
import HostPolicies from "./host-policies"
import { T_Reviews } from "@repo/contract-2/review"

export const Rental = ({ rental }: { rental: T_Rental }) => {
  const [showModal, setShowModal] = useState(false)
  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const categories = [
    {
      title: "Cleanliness",
      rating: rental?.averageReviews?.cleanliness,
      isHorizontal: false,
    },
    {
      title: "Accuracy",
      rating: rental?.averageReviews?.accuracy,
      isHorizontal: false,
    },
    {
      title: "Check-in",
      rating: rental?.averageReviews?.checkIn,
      isHorizontal: false,
    },
    {
      title: "Communication",
      rating: rental?.averageReviews?.communication,
      isHorizontal: false,
    },
    {
      title: "Location",
      rating: rental?.averageReviews?.location,
      isHorizontal: false,
    },
    {
      title: "Value",
      rating: rental?.averageReviews?.value,
      isHorizontal: false,
    },
    {
      title: "",
      rating: rental?.averageReviews?.totalReview,
      isHorizontal: false,
    },
    {
      title: "",
      rating: rental?.averageReviews?.averageTotalRates,
      isHorizontal: false,
    },
  ]
  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      <div>
        <Hero
          images={rental.photos}
          title={`${rental?.year ? rental?.year : ""} ${rental?.make ? rental?.make : ""} ${rental?.modelBadge ? rental?.modelBadge : ""}`}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="pb-6">
              <HostedBy
                name={rental?.host?.guest.firstName || "Unknown"}
                language={rental?.host?.guest?.language}
                profilePicture={"2.jpg"}
                joinDate={String(rental?.host?.createdAt) || ""}
              />
            </div>
            <div className="py-6">
              <About rental={rental} />
            </div>
            <div className="py-6 ">
              <Inclusions rental={rental} />
            </div>
            <div className="py-6 ">
              <Requirements rental={rental} />
            </div>
            {rental?.policies && rental?.policies.length > 0 ? (
              <div className="py-6">
                <HostPolicies rental={rental} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:w-[27rem] md:relative">
          <div className="md:sticky md:top-6">
            <CheckoutBox rental={rental} />
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
          <PickUpLocation location={rental.location} />
        </div>

        <div className="py-8">
          <RatingSummary
            ratings={rental?.averageReviews?.averageTotalRates as number}
            reviews={rental?.averageReviews?.totalReview as number}
            categories={categories}
            totalRating={rental?.reviews as T_Reviews}
          />
        </div>
        <div className="py-8">
          <UserReviews
            reviews={rental.reviews as T_Reviews}
            categories={categories}
          />
        </div>
        <div className="py-8">
          <HostInformation {...hostDummy} />
        </div>
        <div className="py-8">
          <SimilarRentals />
        </div>
      </div>
      <ReportListingModal isOpen={showModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default Rental

"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import HostInformation from "./components/HostInformation"
import BookingDescription from "./components/BookingDescription"
import Hero from "./components/hero"
import RatingSummary from "./components/Reviews/RatingSummary"
import UserReviews from "./components/Reviews/UserReviews"
import CheckoutBox from "./components/CheckoutBox"
import PickUpLocation from "./components/PickUpLocation"
import { Button } from "@/common/components/ui/Button"
import { Flag, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import ListingMark from "@/module/Listing/Property/Checkout/ListingMark"
import ReportListingModal from "./components/modals/ReportListingModal"
import Requirements from "./components/Requirements"
import Inclusions from "./components/Inclusions"
import SimilarRentals from "./components/SimilarRentals"
import { useParams } from "next/navigation"
import { T_BookingAboutDescriptionProps } from "./types/BookingAboutDescription"
import { hostDummy, ratingSummary, userReviews } from "./dummy"

type T_AboutData = T_BookingAboutDescriptionProps["aboutData"]
type T_RequirementData = {
  haveDriverLicense: string | null
  requiredDeposit: number | null
}

export const Rental = ({ rentalData: data }: { rentalData: any }) => {
  const [showModal, setShowModal] = useState(false)
  const params = useParams<{ rentalId: string }>()
  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const [requirementData, setRequirementData] = useState<T_RequirementData>({
    haveDriverLicense: "",
    requiredDeposit: 0,
  })
  const [aboutData, setAboutData] = useState<T_AboutData | null>(null)

  useEffect(() => {
    if (data?.item) {
      setAboutData({
        category: data?.item?.category,
        bodyType: data?.item?.bodyType,
        transmission: data?.item?.transmission,
        fuel: data?.item?.fuel || "hello",
        engineCapacityLiter: data?.item?.details?.engineCapacityLiter,
        engineCapacityCc: data?.item?.details?.engineCapacityCc,
        condition: data?.item?.details?.condition,
        exteriorColor: data?.item?.details?.exteriorColor,
        interiorColor: data?.item?.details?.interiorColor,
        seatingCapacity: data?.item?.details?.seatingCapacity,
        isRegistered: data?.item?.details?.isRegistered,
        weightCapacityKg: data?.item?.details?.weightCapacityKg,
      })

      setRequirementData({
        haveDriverLicense: data?.item?.details?.haveDriverLicense,
        requiredDeposit: data?.item?.pricing?.requiredDeposit,
      })
      const date = new Date(data?.item?.host?.createdAt)
      hostDummy.hostName = data?.item?.host?.guest?.firstName
      hostDummy.joinedIn = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }, [data])

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      <div>
        <Hero
          images={data?.item?.photos}
          title={`${data?.item?.year ? data?.item?.year : ""} ${data?.item?.make ? data?.item?.make : ""} ${data?.item?.modelBadge ? data?.item?.modelBadge : ""}`}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="py-6">
              <BookingDescription aboutData={aboutData} />
            </div>
            <div className="py-6 ">
              <Inclusions rentalData={data?.item?.addOns} />
            </div>
            <div className="py-6 ">
              <Requirements requirementData={requirementData} />
            </div>
          </div>
        </div>

        <div className="md:w-96 md:relative">
          <div className="md:sticky md:top-6">
            <CheckoutBox
              checkoutDesc={{
                serviceFee: data?.item?.pricing?.dayRate,
                durationCost: 1500,
                descTotalBeforeTaxes: data?.item?.pricing?.dayRate,
                totalBeforeTaxes: 1800,
                titlePrice: data?.item?.pricing?.dayRate,
                downPayment: data?.item?.pricing?.requiredDeposit,
              }}
            />
            <div>
              <ListingMark
                icon={<Tag />}
                title="Lower Price"
                desc="Your dates are ₱1,494 less than the avg. nightly rate of the last 60 days."
              />
            </div>

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
          <PickUpLocation mapData={data?.item?.location} />
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

"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import ThingsToKnow from "./components/ThingsToKnow"
import HostInformation from "./components/HostInformation"
import BookingDescription from "./components/BookingDescription"
import Hero from "./components/hero"
import SummaryInfo from "./components/summary-info"
import RatingSummary from "./components/Reviews/RatingSummary"
import UserReviews from "./components/Reviews/UserReviews"
import CheckoutBox from "./components/CheckoutBox"
import PlaceOffers from "./components/PlaceOffers"
import WhereYoullBeDescription from "./components/Map"
import { Button } from "@/common/components/ui/Button"
import { Flag, LucideHeartHandshake } from "lucide-react"
import { useState } from "react"
import ReportListingModal from "./components/modals/ReportListingModal"
import AvailableBooking from "./components/available-booking"
import { T_BookableUnitType } from "@repo/contract"
import { format, parseISO } from "date-fns"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/formatCurrency"
import Link from "next/link"
import { description, hostDummy, ratingSummary, userReviews } from "./dummy"

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

  const bookableUnit =
    selectedBookableUnit ||
    (data?.item?.bookableUnits?.length > 0 && data?.item?.bookableUnits[0])
  const latitude = data?.item?.location?.latitude
  const longitude = data?.item?.location?.longitude

  const current = 450000
  const goal = 1000000
  const percentage = Math.min((current / goal) * 100, 100).toFixed(2)

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      <Hero images={data?.item?.photos} title={data?.item?.title} />

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="pb-6">
              <SummaryInfo
                bookableUnits={data?.item?.bookableUnits}
                reviews={data?.item?.reviews}
                stars={data?.item?.stars}
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
                <p>No data available for bookable units.</p>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-[27rem] md:relative">
          <div className="md:sticky md:top-6">
            {bookableUnit && (
              <CheckoutBox
                checkoutDesc={{
                  pricePerAdditionalPerson:
                    bookableUnit.unitPrice?.pricePerAdditionalPerson || 0,
                  serviceFee: bookableUnit ? 1000 : 0,
                  durationCost: bookableUnit
                    ? bookableUnit.unitPrice?.baseRate * 5
                    : 0,
                  descTotalBeforeTaxes: 3000,
                  totalBeforeTaxes: 126000,
                  titlePrice: bookableUnit.unitPrice?.baseRate || 0,
                }}
                isSelectedBookableUnit={bookableUnit ? true : false}
                unit={bookableUnit}
              />
            )}
            <div>
              <div className="border border-gray-300 rounded-xl p-4 mb-2 flex gap-4">
                <div className="mt-1">
                  <LucideHeartHandshake />
                </div>
                <div>
                  <h3 className="font-semibold">
                    Pledged to LokalLab by ExploreSiargao
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <Typography
                    variant="h6"
                    className="text-justify mt-1 text-text-400"
                  >
                    {formatCurrency(current)} of {formatCurrency(goal)}
                  </Typography>

                  <Typography variant="h5" className="mt-1">
                    Your stay contributes to Siargao's community growth.{" "}
                    <Link
                      href="/read-more"
                      className="underline text-primary-600"
                    >
                      Find out more here
                    </Link>
                  </Typography>
                </div>
              </div>
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
        <div className="pt-8">
          <ThingsToKnow />
        </div>
      </div>
      <ReportListingModal isOpen={showModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default Property
export { ratingSummary, userReviews }

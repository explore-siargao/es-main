"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import HostInformation from "./components/HostInformation"
import BookingDescription from "./components/BookingDescription"
import SectionInfo from "./components/SectionInfo"
import RatingSummary from "./components/Reviews/RatingSummary"
import UserReviews from "./components/Reviews/UserReviews"
import CheckoutBox from "./components/CheckoutBox"
import WhereYoullBeDescription from "./components/Map"
import { Button } from "@/common/components/ui/Button"
import { Flag, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import ListingMark from "@/module/Accommodation/Checkout/ListingMark"
import ReportListingModal from "./components/modals/ReportListingModal"
import Requirements from "./components/Requirements"
import Inclusions from "./components/Inclusions"
import SimilarRentals from "./components/SimilarRentals"
import useGetRentalById from "@/module/Admin/Listings/hooks/useGetRentalById"
import { notFound, useParams } from "next/navigation"
import { Spinner } from "@/common/components/ui/Spinner"
import { T_BookingAboutDescriptionProps } from "./types/BookingAboutDescription"

export const ratingSummary = {
  ratings: 5,
  reviews: 3,
  categories: [
    {
      title: "Cleanliness",
      rating: "4.8",
      isHorizontal: false,
    },
    {
      title: "Accuracy",
      rating: "4.8",
      isHorizontal: false,
    },
    {
      title: "Check-in",
      rating: "5.0",
      isHorizontal: false,
    },
    {
      title: "Communication",
      rating: "4.0",
      isHorizontal: false,
    },
    {
      title: "Location",
      rating: "4.0",
      isHorizontal: false,
    },
    {
      title: "Value",
      rating: "4.0",
      isHorizontal: false,
    },
  ],
}

const hostDummy = {
  hostName: "Jose Rizal",
  hostProfilePic: "1.jpg",
  joinedIn: "July 20, 2020",
  countReviews: 4,
  rules: [
    {
      id: 1,
      title: "During your stay",
      description:
        "For our Guests’ convenience, complimentary cleaning service and support of the management team is provided throughout the entire stay. The property offers also assistance in bike/car rental, island hoping and airport shuttle service bookings.",
    },
  ],
  responseRate: 70,
  responseTime: "Reply after 4 Hours",
}

export const userReviews = [
  {
    imageSrc: "1.jpg",
    name: "Bradford",
    origin: "Canada",
    rate: 5,
    date: "January 1, 1889",
    review:
      "Beautiful, quiet and private! This place offers solitude to everyone who wants to disappear from chaotic crowd once in a while. Place is romantic and cozy. It is the same as the pictures. We love the comfortable king size bed, outdoor shower, pool and kitchen! It is complete of amenities. Host are friendly and give us recommendations. Highly recommended. Will definitely come back again. Thank you!",
    showMore: false,
  },
  {
    imageSrc: "2.jpg",
    name: "Maygan",
    origin: "California, United States",
    rate: 4,
    date: "February 15, 1890",
    review:
      "The villa is exactly as seen in the photos, such an absolute dream to stay in! We were there during rainy season, so it’s a bit of an adventure to leave the villa on the beaten path. If it’s rainy, there are massive puddles to get through and only certain drivers will go through it (which the host help to arrange!).",
    showMore: true,
  },
  {
    imageSrc: "1.jpg",
    name: "Sami",
    origin: "Helsinki, Finland",
    rate: 5,
    date: "January 1, 1889",
    review:
      "The villa is extremely clean, cozy, beautiful, and right next to a quite and one of the most beautiful beaches on the island! We had an amazing stay all in all. Claire the caretaker was super responsive and took care of every need that we had during our 7 day stay.",
    showMore: true,
  },
  {
    imageSrc: "2.jpg",
    name: "Anna",
    origin: "Toronto, Canada",
    rate: 4,
    date: "February 15, 1890",
    review:
      "We loved our stay at Simon’s place. Beautifully designed and with lots of amenities (bathrobes were a nice touch!). We made full use of the beautiful outdoor shower, bathtub and pool! And I just loved having a chance to play a little on the electric piano! The villa was peaceful and secluded and the caretaker was lovely. We also really enjoyed walking out onto a pristine empty beach.",
    showMore: false,
  },
]

type T_AboutData = T_BookingAboutDescriptionProps["aboutData"]
type T_RequirementData = {
  haveDriverLicense: string | null
  requiredDeposit: number | null
}
export const RentalSingleView = () => {
  const [showModal, setShowModal] = useState(false)
  const params = useParams<{ rentalId: string }>()
  const rentalId = String(params.rentalId)
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

  const { data, isPending } = useGetRentalById(rentalId)

  if ((!isPending && !data) || (!isPending && !data.item)) {
    notFound()
  }

  useEffect(() => {
    if (!isPending && data?.item) {
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
  }, [data, isPending])

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      {isPending ? (
        <></>
      ) : (
        <>
          <div>
            <SectionInfo
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
              <WhereYoullBeDescription mapData={data?.item?.location} />
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
        </>
      )}
    </WidthWrapper>
  )
}
export default RentalSingleView

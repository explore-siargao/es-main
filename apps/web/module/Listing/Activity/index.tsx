"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Button } from "@/common/components/ui/Button"
import { Flag } from "lucide-react"
import { useState } from "react"
import AvatarTitleDescription from "@/module/Listing/Property/components/AvatarTitleDescription"
import HostInformation from "@/module/Listing/Property/components/HostInformation"
import RatingSummary from "@/module/Listing/Property/components/Reviews/RatingSummary"
import ReportListingModal from "@/module/Listing/Property/components/modals/ReportListingModal"
import UserReviews from "../../Hosting/Listings/Properties/Property/Reviews/UserReviews"
import SectionInfo from "./SectionInfo"
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
import { notFound, useParams } from "next/navigation"
import useGetActivityById from "@/module/Admin/Activity/hooks/useGetActivitiesById"
import { Spinner } from "@/common/components/ui/Spinner"

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

const whereYouWillBeDesc = {
  location: "General Luna, Caraga, Philippines",
  coordinates: [9.8015, 126.1635] as [number, number],
  desc: "Mantaray Siargao is located in Purok 1, General Luna. A quiet residential area close to the heart of town. The property is nestled between the beach and the main road, allowing guests like you to easily drive or hail a tricycle to town.",
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

export const value = {
  host: "66622c6d14e35b280af399fa",
  title: "Island Hopping Adventure",
  description:
    "Join us for an exciting island hopping adventure in Siargao. Explore pristine beaches, crystal-clear waters, and vibrant marine life.",
  highLights: [
    "Visit three beautiful islands: Naked Island, Daku Island, and Guyam Island",
    "Snorkeling in crystal-clear waters",
    "Delicious lunch on Daku Island",
    "Professional guide with local knowledge",
  ],
  durationHour: 6,
  durationMinute: 30,
  languages: ["English", "Filipino"],
  isFoodIncluded: true,
  isNonAlcoholicDrinkIncluded: true,
  isAlcoholicDrinkIncluded: false,
  otherInclusion: [
    "Snorkeling gear",
    "Island entrance fees",
    "Round-trip transportation from the meeting point",
  ],
  notIncluded: ["Personal expenses", "Gratuities"],
  whatToBrings: [
    "Sunscreen",
    "Swimwear",
    "Towel",
    "Camera",
    "Extra cash for souvenirs",
  ],
  cancellationDays: 3,
  notAllowed: ["Pets", "Smoking", "Littering"],
  policies: [
    "Respect marine life and local culture",
    "Follow the guide’s instructions at all times",
    "No littering on the islands or in the water",
    "Wear a life jacket while snorkeling for safety",
    "Be punctual at the meeting point to ensure timely departure",
    "Respect marine life and local culture",
    "Follow the guide’s instructions at all times",
    "No littering on the islands or in the water",
    "Wear a life jacket while snorkeling for safety",
    "Be punctual at the meeting point to ensure timely departure",
  ],
  cancellationPolicies: [
    "Full refund if canceled at least 3 days before the activity",
    "No refund if canceled within 3 days of the activity",
  ],
  photos: [
    {
      _id: "66684a5db5c3e8b967c89853",
      rentalId: "66658c520c9477ca42bad2c7",
      key: "1.jpg",
      thumbKey: "eed38095-0a20-4a10-aece-73558e34b497",
      isMain: false,
      description: "Mio kia car",
      tags: "",
      createdAt: "2024-06-11T12:58:22.123Z",
      __v: 0,
      updatedAt: "2024-06-11T23:32:37.833Z",
    },
    {
      _id: "66684a5db5c3e8b967c89856",
      rentalId: "66658c520c9477ca42bad2c7",
      key: "2.jpg",
      thumbKey: "1401dc9c-2414-4261-a5fe-eccd781d3ac3",
      isMain: false,
      description: "",
      tags: "",
      createdAt: "2024-06-11T12:58:22.123Z",
      __v: 0,
      updatedAt: "2024-06-11T23:32:37.823Z",
    },
    {
      _id: "66684a5db5c3e8b967c89858",
      rentalId: "66658c520c9477ca42bad2c7",
      key: "3.jpg",
      thumbKey: "f6dc04db-237f-46da-8e6a-d1c0e219a518",
      isMain: false,
      description: "Test baby",
      tags: "",
      createdAt: "2024-06-11T12:58:22.123Z",
      __v: 0,
      updatedAt: "2024-06-11T23:32:37.838Z",
    },
    {
      _id: "66684a5eb5c3e8b967c8985c",
      rentalId: "66658c520c9477ca42bad2c7",
      key: "4.jpg",
      thumbKey: "963669f9-d5eb-405d-8a7a-9c9cee49af56",
      isMain: true,
      description: "",
      tags: "",
      createdAt: "2024-06-11T12:58:22.123Z",
      __v: 0,
      updatedAt: "2024-06-11T23:32:37.832Z",
    },
    {
      _id: "66684a5eb5c3e8b967c8985f",
      rentalId: "66658c520c9477ca42bad2c7",
      key: "5.jpg",
      thumbKey: "1e5d5cb5-3a63-43a3-a1d3-3476df3526d8",
      isMain: false,
      description: "Baby love",
      tags: "",
      createdAt: "2024-06-11T12:58:22.123Z",
      __v: 0,
      updatedAt: "2024-06-11T23:42:21.255Z",
    },
  ],
  isSegmentBuilderEnabled: true,
  segments: [
    {
      index: 1,
      activities: ["Safety briefing", "Scenic views", "Camp activities"],
      durationHour: 2,
      durationMinute: 4,
      location: "Test test location yes",
      longitude: 126.11343553773443,
      latitude: 9.884304859312676,
      optional: true,
      hasAdditionalFee: true,
      transfer: null,
      _id: {
        $oid: "666cfa8f600be3ff237e9b29",
      },
    },
    {
      index: 2,
      activities: [],
      durationHour: 1,
      durationMinute: 0,
      optional: true,
      hasAdditionalFee: true,
      transfer: "Motorbike",
      _id: {
        $oid: "666cfa8f600be3ff237e9b2a",
      },
    },
    {
      index: 3,
      activities: [],
      durationHour: 1,
      durationMinute: 1,
      optional: false,
      hasAdditionalFee: false,
      transfer: "Local pump boat",
      _id: {
        $oid: "666cfb4b600be3ff237e9bb5",
      },
    },
  ],
  meetingPoint:
    "General Luna Pier, General Luna, Siargao Island, Surigao del Norte, Philippines",
  status: "Incomplete",
  location: {
    city: "General Luna",
    streetAddress: "Purok 1, Tourism Road",
    barangay: "Catangnan",
    longitude: 126.1174,
    latitude: 9.8432,
    howToGetThere:
      "From General Luna, head north on Tourism Road towards Cloud 9. The location is a 10-minute drive from the town center.",
    createdAt: "2024-06-11T12:58:22.123Z",
  },
  price: {
    baseRate: 500,
    pricePerAdditionalPerson: 100,
  },
  timeSlots: [
    {
      date: "Tue Jul 19 2024 GMT+0800 (Philippine Standard Time)",
      slots: [
        { id: "1", bookType: "", time: "09:00 AM", maxCapacity: 8 },
        { id: "2", bookType: "", time: "10:00 AM", maxCapacity: 12 },
        { id: "3", bookType: "Private", time: "3:00 PM", maxCapacity: 15 },
        {
          id: "4",
          bookType: "joiners",
          time: "4:00 PM",
          maxCapacity: 6,
          availableSlotPerson: 2,
        },
        { id: "5", bookType: "", time: "4:00 PM", maxCapacity: 8 },
      ],
    },
    {
      date: "Tue Jul 20 2024 GMT+0800 (Philippine Standard Time)",
      slots: [
        { id: "1", bookType: "Private", time: "11:00 AM", maxCapacity: 20 },
        {
          id: "2",
          bookType: "joiners",
          time: "12:00 PM",
          maxCapacity: 15,
          availableSlotPerson: 0,
        },
      ],
    },
    {
      date: "Tue Jul 21 2024 GMT+0800 (Philippine Standard Time)",
      slots: [
        { id: "1", bookType: "", time: "01:00 PM", maxCapacity: 10 },
        { id: "2", bookType: "", time: "02:00 PM", maxCapacity: 7 },
      ],
    },
  ],
}

export const ActivitySingleView = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const params = useParams<{ rentalId: string }>()
  const rentalId = String(params.rentalId)
  const { data, isPending } = useGetActivityById(rentalId)

  const hostingSince = new Date(data?.item?.host?.guest?.createdAt)
  const monthsDifference =
    (new Date().getFullYear() - hostingSince.getFullYear()) * 12 +
    (new Date().getMonth() - hostingSince.getMonth())

  const subTitle = `${monthsDifference} ${monthsDifference === 1 ? "month" : "months"} hosting`

  if ((!isPending && !data) || (!isPending && !data.item)) {
    notFound()
  }

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      {isPending ? (
        <></>
      ) : (
        <>
          {data && (
            <SectionInfo
              images={data?.item?.photos}
              title={data?.item?.title}
            />
          )}

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
                    <ActivityDescription
                      description={data?.item?.description}
                    />
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
                  {data && (
                    <WhatToBrings whatToBrings={data?.item?.whatToBring} />
                  )}
                </div>

                <div className="py-6">
                  {data && <NotAllowed notAllowed={data?.item?.notAllowed} />}
                </div>
              </div>
            </div>

            <div className="md:w-96 md:relative">
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
                  titlePrice: value.price.baseRate,
                  pricePerAdditionalPerson:
                    value.price.pricePerAdditionalPerson,
                }}
                timeSlot={value.timeSlots}
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
        </>
      )}
    </WidthWrapper>
  )
}
export default ActivitySingleView

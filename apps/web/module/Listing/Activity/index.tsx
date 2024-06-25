"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { Button } from "@/common/components/ui/Button"
import { Check, Flag, Tag } from "lucide-react"
import { useState } from "react"
import ListingMark from "@/module/Accommodation/Checkout/ListingMark"
import AvatarTitleDescription from "@/module/Accommodation/components/AvatarTitleDescription"
import BookingDescription from "@/module/Accommodation/components/BookingDescription"
import HostInformation from "@/module/Accommodation/components/HostInformation"
import ListingDateRangePicker from "@/module/Accommodation/components/ListingDateRangePicker"
import WhereYoullBeDescription from "@/module/Accommodation/components/Map"
import RatingSummary from "@/module/Accommodation/components/Reviews/RatingSummary"
import ReportListingModal from "@/module/Accommodation/components/modals/ReportListingModal"
import UserReviews from "../../Hosting/Listings/Properties/Property/Reviews/UserReviews"
import SectionInfo from "./SectionInfo"
import PlaceOffers from "./PlaceOffers"
import Languages from "./Languages"
import Duration from "./Duration"
import Highlights from "./Highlights"
import ActivityDescription from "./ActivityDescription"
import WhatToBrings from "./WhatToBrings"
import NotAllowed from "./NotAllowed"
import PoliciesModal from "../components/modals/PoliciesModal"
import ThingsToKnow from "./ThingsToKnow"
import MeetingPoint from "./MeetingPoint"
import CheckoutBox from "./CheckoutBox"

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

const value = {
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
  segments: [],
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
}

export const ActivitySingleView = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <WidthWrapper width="small" className="mt-10">
      <SectionInfo images={value.photos} title={value.title} />
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="py-6">
              <AvatarTitleDescription
                avatarKey="2.jpg"
                title="Hosted by Simon"
                subTitle="4 months hosting"
              />
            </div>
            <div className="py-6">
              <ActivityDescription
                description={
                  "Embark on a thrilling Island Hopping Adventure in the tropical paradise of Siargao! This full-day tour is perfect for those seeking to explore the natural beauty and vibrant marine life of the Philippines. Our journey will take you to three of the most picturesque islands: Naked Island, Daku Island, and Guyam Island."
                }
              />
            </div>
            <div className="py-6">
              <Highlights highlights={value.highLights} />
            </div>
            <div className="py-6 ">
              <PlaceOffers
                isFoodIncluded={value.isFoodIncluded}
                isNonAlcoholicDrinkIncluded={value.isNonAlcoholicDrinkIncluded}
                isAlcoholicDrinkIncluded={value.isAlcoholicDrinkIncluded}
                otherInclusion={value.otherInclusion}
                notIncluded={value.notIncluded}
              />
            </div>
            <div className="py-6 ">
              <Languages languages={value.languages} />
            </div>
            <div className="py-6 ">
              <Duration
                durationHour={value.durationHour}
                durationMinute={value.durationMinute}
              />
            </div>
            <div className="py-6">
              <WhatToBrings whatToBrings={value.whatToBrings} />
            </div>
            <div className="py-6">
              <NotAllowed notAllowed={value.notAllowed} />
            </div>
          </div>
        </div>
        <div className="md:w-96 md:relative">
          <div className="md:sticky md:top-6">
            <CheckoutBox
              checkoutDesc={{
                serviceFee: 1000,
                durationCost: 125000,
                descTotalBeforeTaxes: 3000,
                totalBeforeTaxes: 2000,
                titlePrice: 1000,
              }}
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
          <MeetingPoint
            location={`${value.location.streetAddress}, ${value.location.barangay}, ${value.location.city}`}
            coordinates={[value.location.latitude, value.location.longitude]}
            desc={value.location.howToGetThere}
          />
        </div>
        <div className="py-8">
          <HostInformation {...hostDummy} />
        </div>
        <div className="pt-8">
          <ThingsToKnow
            otherPolicies={value.policies}
            otherPoliciesModalData={value.policies}
            cancellationPolicies={value.cancellationPolicies}
            cancellationModalData={value.cancellationPolicies}
          />
        </div>
      </div>
      <ReportListingModal isOpen={showModal} onClose={handleCloseModal} />
    </WidthWrapper>
  )
}
export default ActivitySingleView

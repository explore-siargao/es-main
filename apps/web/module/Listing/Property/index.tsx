"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import ThingsToKnow from "./components/ThingsToKnow"
import HostInformation from "./components/HostInformation"
import BookingDescription from "./components/BookingDescription"
import SectionInfo from "./components/SectionInfo"
import SummaryInfo from "./components/SummaryInfo"
import RatingSummary from "./components/Reviews/RatingSummary"
import UserReviews from "./components/Reviews/UserReviews"
import CheckoutBox from "./components/CheckoutBox"
import PlaceOffers from "./components/PlaceOffers"
import WhereYoullBeDescription from "./components/Map"
import { Button } from "@/common/components/ui/Button"
import { Flag, Tag } from "lucide-react"
import { useState } from "react"
import ListingMark from "@/module/Listing/Property/Checkout/ListingMark"
import ReportListingModal from "./components/modals/ReportListingModal"
import AvailableBooking from "./components/AvailableBooking"
import { T_BookableUnitType } from "@repo/contract"
import { useParams } from "next/navigation"
import { format, parseISO } from "date-fns"

export const imageGallery = [
  {
    fileKey: "1.jpg",
    alt: "Image 1",
  },
  {
    fileKey: "2.jpg",
    alt: "Image 2",
  },
  {
    fileKey: "3.jpg",
    alt: "Image 3",
  },
  {
    fileKey: "4.jpg",
    alt: "Image 4",
  },
  {
    fileKey: "5.jpg",
    alt: "Image 5",
  },
]

const description = {
  generalDescription:
    "Welcome to this stunning private villa located just near one of the most beautiful  beaches of Siargao. Enjoy scenic private outdoor pool views & stylishly furnished spacious  indoor  with a touch of local art. All hidden in 800 m2 tropical garden.",
  aboutSpace:
    "Welcome to this stunning private villa located just near one of the most beautiful beaches of Siargao. Enjoy scenic private outdoor pool views & stylishly furnished spacious indoor with a touch of local art. All hidden in 800 m2 tropical garden. The unique mixture of modern design & tropical nature provides comfort and privacy whilst offering unique experience of luxurious getaway in a jungle paradise.",
  aboutGuestAccess:
    "This spacious 1-bedroom villa is for full and exclusive use of our guests, which have 24h access to the property provided during their stay. To keep our Guests' privacy and safety the building is fenced and can be locked from inside and outside. The guests have unlimited access to private outdoor pool and bath tube with hot water. Free access to WiFi connection is provided.",
  otherThingsNote:
    "We recommend to our guests to have a motorbike or scooter to reach the house or get there by van from the airport (we can arrange this for you). Please be aware that the last part of the road to the villa is through a dirt road, that usually gets muddy during heavy rains, which occur between December and February. Please make sure you are comfortable driving a scooter/motorbike on a dirt road or rent a trike from General Luna.",
}

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

export const value = {
  host: "66622c6d14e35b280af399fa",
  title: "Villa Manao · Private Pool | Bathtub | Sky shower",
  type: "Hostel",
  description:
    "Join us for an exciting island hopping adventure in Siargao. Explore pristine beaches, crystal-clear waters, and vibrant marine life.",
  highLights: [
    "Visit three beautiful islands: Naked Island, Daku Island, and Guyam Island",
    "Snorkeling in crystal-clear waters",
    "Delicious lunch on Daku Island",
    "Professional guide with local knowledge",
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
  bookableUnits: [
    {
      _id: {
        $oid: "668398cc18ec71fe8081105a",
      },
      category: "Room",
      title: "Double Room",
      description: "Short description sample",
      totalSize: 5,
      photos: [
        {
          _id: "66684a5db5c3e8b967c89853",
          rentalId: "66658c520c9477ca42bad2c7",
          key: "1.jpg",
          thumbKey: "eed38095-0a20-4a10-aece-73558e34b497",
          isMain: false,
          description: "Mio kia car",
          tags: "",
        },
      ],
      isPrivate: false,
      maxGuests: 8,
      adultsIncluded: 0,
      childrenIncluded: 0,
      isMultiRoomUnit: false,
      bedConfigs: [],
      qty: 3,
      bed: "1 Queen Bed",
      unitPrice: {
        _id: {
          $oid: "6672818bf2b99ad949c9cf5e",
        },
        baseRate: 1800,
        baseRateMaxCapacity: 10,
        maximumCapacity: 15,
        pricePerAdditionalPerson: 50,
        discountedWeeklyRate: 10,
        discountedMonthlyRate: 10,
      },
    },
    {
      _id: {
        $oid: "667cb18c28b343835a128ca7",
      },
      category: "Bed",
      title: "Bed in 8-Bed Mixed Dorm",
      description: "Single Bunk Bed",
      totalSize: null,
      amenities: [],
      photos: [
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
      ],
      isPrivate: false,
      maxGuests: 3,
      adultsIncluded: 0,
      childrenIncluded: 0,
      isMultiRoomUnit: false,
      bedConfigs: [],
      qty: 1,
      unitPrice: {
        _id: {
          $oid: "6672818bf2b99ad949c9cf5e",
        },
        baseRate: 800,
        baseRateMaxCapacity: 10,
        maximumCapacity: 15,
        pricePerAdditionalPerson: 20,
        discountedWeeklyRate: 10,
        discountedMonthlyRate: 10,
      },
    },
    {
      _id: {
        $oid: "667bd82c1b32c84d421c6d26",
      },
      category: "Whole-Place",
      title: "Double Room",
      description: "",
      totalSize: 25,
      amenities: [],
      photos: [
        {
          _id: "66684a5db5c3e8b967c89858",
          rentalId: "66658c520c9477ca42bad2c7",
          key: "3.jpg",
          thumbKey: "f6dc04db-237f-46da-8e6a-d1c0e219a518",
          isMain: false,
          description: "Test baby",
          tags: "",
          __v: 0,
        },
      ],
      isPrivate: false,
      maxGuests: 50,
      adultsIncluded: 0,
      childrenIncluded: 0,
      isMultiRoomUnit: false,
      numBedRooms: "2",
      numBathRooms: "2",
      bedConfigs: [],
      qty: 2,
      unitPrice: {
        _id: {
          $oid: "6672818bf2b99ad949c9cf5e",
        },
        baseRate: 15000,
        baseRateMaxCapacity: 10,
        maximumCapacity: 15,
        pricePerAdditionalPerson: 100,
        discountedWeeklyRate: 10,
        discountedMonthlyRate: 10,
      },
    },
  ],
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

export const Property = ({ propertyData: data }: { propertyData: any }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedBookableUnit, setSelectedBookableUnit] =
    useState<T_BookableUnitType>()
  const params = useParams<{ propertyId: string }>()
  const propertyId = String(params.propertyId)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectBookableUnit = (bookableUnit: T_BookableUnitType) => {
    setSelectedBookableUnit(bookableUnit)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBookableUnit(null)
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

  return (
    <WidthWrapper width="medium" className="mt-4 lg:mt-8">
      <SectionInfo images={data?.item?.photos} title={data?.item?.title} />

      <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-12">
        <div className="flex-1 md:w-1/2 2xl:w-full">
          <div className="divide-y">
            <div className="pb-6">
              <SummaryInfo />
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
        <div className="md:w-96 md:relative">
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
                isSelectedBookableUnit={bookableUnit}
              />
            )}
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

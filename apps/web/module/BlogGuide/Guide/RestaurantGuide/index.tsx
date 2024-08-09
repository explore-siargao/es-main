"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { StarIcon } from "lucide-react"
import BookingDescription from "@/module/Accommodation/components/BookingDescription"
import PlaceOffers from "@/module/Accommodation/components/PlaceOffers"
import UserReviews from "@/module/Accommodation/components/Reviews/UserReviews"
import SectionInfo from "./SectionInfo"
import RestaurantLocation from "./RestaurantLocation"
import Image from "next/image"
import { Separator } from "@/common/components/ui/Separator"
import { Typography } from "@/common/components/ui/Typography"
import OpeningHours from "./components/OpeningHours"
import SocialMediaContacts from "./components/Contacts"
import PriceLevel from "./components/PriceLevel"
import OffersCuisine from "./components/OffersCuisine"
import ListingReviews from "@/module/Hosting/Listings/Properties/Property/Reviews"
import ChefsNote from "./components/ChefsNote"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Spinner } from "@/common/components/ui/Spinner"

const imageGallery = [
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

const offers = [
  {
    icon: "check",
    description: "WiFi",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "Free street parking",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "No smoking",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "Smoke alarm",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "Bed",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "Angry people",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "Alarm clock",
    isNotIncluded: false,
  },
  {
    icon: "check",
    description: "No bugs",
    isNotIncluded: false,
  },
]

const group = [
  {
    title: "Entertainment",
    offers: [
      { description: "WiFi", icon: "wifi", isNotIncluded: false },
      {
        description: "Free street parking",
        icon: "wifi",
        isNotIncluded: false,
      },
    ],
  },
  {
    title: "Bedroom and laundry",
    offers: [
      { description: "Bed", icon: "wifi", isNotIncluded: false },
      { description: "Angry people", icon: "wifi", isNotIncluded: false },
    ],
  },
  {
    title: "Family",
    offers: [
      { description: "Alarm", icon: "wifi", isNotIncluded: false },
      { description: "Smoke alarm", icon: "wifi", isNotIncluded: false },
    ],
  },
  {
    title: "Not Included",
    offers: [
      { description: "Bug", icon: "wifi", isNotIncluded: true },
      {
        description: "Cigarette off",
        icon: "wifi",
        isNotIncluded: true,
      },
    ],
  },
]

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

const coordinates = [9.802, 126.1366]

const sampleSchedules = [
  { day: "Monday", open: "09:00 AM", close: "06:00 PM" },
  { day: "Tuesday", open: "09:00 AM", close: "06:00 PM" },
  { day: "Wednesday", open: "09:00 AM", close: "06:00 PM" },
  { day: "Thursday", open: "09:00 AM", close: "06:00 PM" },
  { day: "Friday", open: "09:00 AM", close: "08:00 PM" },
  { day: "Saturday", open: "10:00 AM", close: "08:00 PM" },
  { day: "Sunday", open: "10:00 AM", close: "06:00 PM" },
]

const sampleSocialMediaData = [
  {
    icon: "facebook",
    description: "Facebook",
    isNotIncluded: false,
    link: "https://facebook.com",
  },
  {
    icon: "twitter",
    description: "Twitter",
    isNotIncluded: false,
    link: "https://twitter.com",
  },
  {
    icon: "instagram",
    description: "Instagram",
    isNotIncluded: false,
    link: "https://instagram.com",
  },
]

const priceLevel = [
  { level: 2, product: "Matcha Latte" },
  { level: 4, product: "Mocha Latte" },
  { level: 1, product: "Espresso" },
  { level: 3, product: "Cappuccino" },
  { level: 2, product: "Americano" },
  { level: 4, product: "Flat White" },
]

const offersCuisine = [
  { icon: "check", description: "Vegetarian options", isNotIncluded: false },
  { icon: "check", description: "Vegan options", isNotIncluded: false },
  { icon: "check", description: "Gluten-free options", isNotIncluded: false },
  { icon: "check", description: "Dairy-free options", isNotIncluded: false },
  { icon: "check", description: "Halal options", isNotIncluded: false },
  { icon: "check", description: "Kosher options", isNotIncluded: false },
]

export const RestaurantGuide = () => {
  const params = useParams()
  const guideName = params.guideName

  const [guideData, setGuideData] = useState<any>([])
  const [guideDataLoading, setGuideDataLoading] = useState(true)

  const getGuideData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/restaurants/guide/${guideName}`
      )

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      const data = await res.json()
      setGuideData(data.docs[0])
      setGuideDataLoading(false)
    } catch (err) {
      console.log(err)
      setGuideDataLoading(false)
    }
  }

  useEffect(() => {
    getGuideData()
  }, [])

  useEffect(() => {
    console.log(guideData)
  }, [guideData])

  return (
    <WidthWrapper width="small" className="mt-10">
      {guideDataLoading ? (
        <Spinner variant="primary" middle />
      ) : guideData && !guideDataLoading ? (
        <>
          <h1 className="text-2xl font-bold mb-4">RESTAURANT GUIDE</h1>
          <SectionInfo images={guideData.hero.images} title={guideData.title} />
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-12">
            <div className="flex-1 md:w-1/2 2xl:w-full">
              <div>
                <div className="pb-6 flex flex-col gap-8">
                  <h1 className="text-2xl font-bold">ABOUT</h1>
                  <div>
                    <BookingDescription
                      generalDescription={
                        guideData.about.aboutPlace[0].children[0].text
                      }
                      aboutSpace={
                        guideData.about.aboutSpace[0].children[0].text
                      }
                      aboutGuestAccess={
                        guideData.about.aboutGuestAccess[0].children[0].text
                      }
                      otherThingsNote={
                        guideData.about.otherThings[0].children[0].text
                      }
                    />
                  </div>
                </div>
                <Separator orientation="horizontal" className="bg-gray-300" />
                <div className="py-6 ">
                  <PlaceOffers offers={offers} group={group} />
                </div>
                <Separator orientation="horizontal" className="bg-gray-300" />
                <div className="py-6 ">
                  <PriceLevel priceLevel={guideData.content.priceLevels} />
                </div>
                <Separator orientation="horizontal" className="bg-gray-300" />
                <div className="py-6 ">
                  <SocialMediaContacts contacts={sampleSocialMediaData} />
                </div>
                <Separator orientation="horizontal" className="bg-gray-300" />
                <div className="py-6 ">
                  <OpeningHours schedules={sampleSchedules} />
                </div>
                <Separator orientation="horizontal" className="bg-gray-300" />
                <div className="py-6 ">
                  <OffersCuisine offers={offersCuisine} />
                </div>
              </div>
            </div>
            <div className="md:w-96 md:relative">
              <div className="md:sticky md:top-6">
                <RestaurantLocation
                  coordinates={[
                    guideData.locations.location[1],
                    guideData.locations.location[0],
                  ]}
                  address={guideData.locations.address}
                  phoneNumber={guideData.locations.phoneNumber}
                  emailAddress={guideData.locations.emailAddress}
                />
              </div>
            </div>
          </div>

          <Separator orientation="horizontal" className="bg-gray-300" />
          <ListingReviews />

          <Separator orientation="horizontal" className="bg-gray-300" />
          <ChefsNote note={guideData.content.chefNote} />

          <Separator orientation="horizontal" className="bg-gray-300" />
          <div>
            <div className="py-8">
              <h1 className="text-2xl font-bold">ACCOMMODATION NEARBY</h1>
              <div className="w-full flex gap-8 mt-8">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full bg-gray-200 h-80 flex items-center justify-center rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer">
                    <Image
                      src={"/assets/1.jpg"}
                      className="h-full w-full object-cover"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </div>
                  <Typography variant="h3" fontWeight="semibold">
                    BLISS Restaurant Siargao
                  </Typography>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full bg-gray-200 h-80 flex items-center justify-center rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer">
                    <Image
                      src={"/assets/1.jpg"}
                      className="h-full w-full object-cover"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </div>
                  <Typography variant="h3" fontWeight="semibold">
                    Abukay
                  </Typography>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full bg-gray-200 h-80 flex items-center justify-center rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer">
                    <Image
                      src={"/assets/1.jpg"}
                      className="h-full w-full object-cover"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </div>
                  <Typography variant="h3" fontWeight="semibold">
                    Ocean 101 Beach Resort Restaurant
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Typography>No data was found.</Typography>
      )}
    </WidthWrapper>
  )
}
export default RestaurantGuide

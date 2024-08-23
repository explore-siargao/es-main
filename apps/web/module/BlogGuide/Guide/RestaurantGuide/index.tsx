"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import SectionInfo from "./SectionInfo"
import RestaurantLocation from "./RestaurantLocation"
import { Separator } from "@/common/components/ui/Separator"
import { Typography } from "@/common/components/ui/Typography"
import ListingReviews from "@/module/Hosting/Listings/Properties/Property/Reviews"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Spinner } from "@/common/components/ui/Spinner"
import NearbyAccommodation from "./components/NearbyAccommodation"
import ChefsNote from "./components/ChefsNote"
import AmenityList from "./components/AmenityList"

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

export const RestaurantGuide = () => {
  const params = useParams()
  const guideName = params.guideName

  const [guideData, setGuideData] = useState<any>([])
  const [guideDataLoading, setGuideDataLoading] = useState(true)

  const getGuideData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/cms/api/restaurants/guide/${guideName}`
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

  return (
    <WidthWrapper width="small" className="mt-10">
      {guideDataLoading && <Spinner variant="primary" middle />}
      {!guideDataLoading && guideData && (
        <>
          <SectionInfo
            images={guideData.hero.images}
            title={guideData.title}
            ratings={ratingSummary.ratings}
            reviews={ratingSummary.reviews}
            priceRangeLow={guideData.hero.priceRangeLow}
            priceRangeHigh={guideData.hero.priceRangeHigh}
            location={guideData.locations.address}
            cuisine={guideData.hero.cuisine}
            menus={guideData.hero.menus}
            events={guideData.hero.specialAndEvents}
          />
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-12 mt-[11px]">
            <div className="flex-1 md:w-1/2 2xl:w-full">
              <div>
                <ChefsNote chefNote={guideData.content.chefNote} />
                <Separator orientation="horizontal" className="bg-gray-300" />
                <div className="py-8">
                  <AmenityList amenities={guideData.content.amenities} />
                </div>
              </div>
            </div>
            <div className="md:w-96 md:relative" id="location">
              <div className="md:sticky md:top-6">
                <RestaurantLocation
                  coordinates={[
                    guideData.locations.location[1],
                    guideData.locations.location[0],
                  ]}
                  address={guideData.locations.address}
                  phoneNumber={guideData.locations.phoneNumber}
                  emailAddress={guideData.locations.emailAddress}
                  businessHours={guideData.locations.businessHours}
                  facebookLink={guideData.locations.facebookLink}
                  instagramLink={guideData.locations.instagramLink}
                />
              </div>
            </div>
          </div>
          <Separator
            orientation="horizontal"
            className="bg-gray-300"
            id="#reviews"
          />
          <ListingReviews customMargin="mt-[31px]" fontWeight="bold" />
          <Separator orientation="horizontal" className="bg-gray-300" />
          <div>
            <div className="py-8">
              <h1 className="text-2xl font-bold">Accommodation Nearby</h1>
              <div className="w-full flex gap-8 mt-8">
                {guideData.content.nearbyAccommodations.map(
                  (data: any, index: number) => (
                    <NearbyAccommodation
                      key={"accommodation-" + index}
                      name={data.accommodationName}
                      image={data.accommodationImage.url}
                      url={data.accommodationLink}
                      index={index}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {!guideDataLoading && !guideData && (
        <Typography>No data was found.</Typography>
      )}
    </WidthWrapper>
  )
}
export default RestaurantGuide

"use client"
import React, { useEffect } from "react"
import ListingItems from "./components/ListingItems"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import ListingsMap from "./components/map/index"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetRentalListings from "./components/map/hooks/use-get-rental-listings"
import { E_Listing_Category } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"

const RentalsFilter = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const type = searchParams.get("vehicleType")
  const transmission = searchParams.get("transmissionType")
  const seats = searchParams.get("seatCount")
  const priceFrom = searchParams.get("priceFrom")
  const priceTo = searchParams.get("priceTo")
  const stars = searchParams.get("starRating")

  const { data: rentalUnits, isLoading, isRefetching, refetch: refetchRentalUnits } = useGetRentalListings(
    location,
    type,
    transmission,
    seats,
    priceFrom,
    priceTo,
    stars)

  useEffect(() => {
    refetchRentalUnits();
  }, [location, type, transmission, seats, priceFrom, priceTo, stars]);


  const bookableUnits = rentalUnits?.items?.map(item => ({
    ...item,
    title: item.make,
    location: item.location,
    listingId: item._id,
    currency: "PHP",
    price: item.pricing.dayRate,
    photos: item.photos.map((photo: { key: string }) => ({
      fileKey: photo.key,
    })),
    ratings: item.average
  }));

  const markers = bookableUnits?.map((rental) => {
    const marker = {
      ...rental.location,
      name: rental.title,
      _id: rental.listingId,
      currency: rental.currency,
      price: rental.price,
      photos: rental.photos[0] as { fileKey: string; alt: string },
    }
    return marker
  })

  if(isLoading) {
    return (
      <WidthWrapper width="medium">
        <div className="h-screen mt-16 flex justify-center">
          <Spinner variant="primary" />
        </div>
      </WidthWrapper>
    )
  }

  return (
    <WidthWrapper width="medium">
      <div className="flex gap-7 mt-16">
        {/* Listings section */}
        <div className="flex w-full">
          <div>
            {isRefetching ? (
              <Spinner variant="primary" />
            ): null}

            {!isLoading && !isRefetching && bookableUnits && bookableUnits?.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {bookableUnits?.map((item: any) => (
                  <div key={item._id}>
                    <ListingItems {...item} category={E_Listing_Category.Rental} />
                  </div>
                ))}
              </div>
            ) : null}

            {!isLoading && !isRefetching && bookableUnits && bookableUnits?.length === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                 No rentals found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative">
          <div className="sticky top-[20rem]">
            {bookableUnits && markers ? <ListingsMap markers={markers} iconMarker="island" /> : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default RentalsFilter

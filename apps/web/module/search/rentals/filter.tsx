"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import Map from "./map"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetRentalListings from "./hooks/use-get-listings"
import { E_Rental_Category } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"
import RentalCard from "./card"
import getNumberOrAny from "@/common/helpers/getNumberOrAny"
import { E_Location } from "@repo/contract-2/search-filters"

const RentalsFilter = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
  const location = searchParams.get("location") || "any";
  const vehicleTypes = searchParams.get("vehicleTypes") || "any";
  const transmissionTypes = searchParams.get("transmissionTypes") || "any";
  const seatCount = getNumberOrAny(searchParams.get("seatCount"))
  const priceFrom = getNumberOrAny(searchParams.get("priceFrom"))
  const priceTo = getNumberOrAny(searchParams.get("priceTo"))
  const starRating = getNumberOrAny(searchParams.get("starRating"))
  const pickUpDate = searchParams.get("pickUpDate") || "any";
  const dropOffDate = searchParams.get("dropOffDate") || "any";

  const {
    data: rentalUnits,
    isLoading,
    isRefetching,
    refetch: refetchRentalUnits,
  } = useGetRentalListings({
    page,
    location: location as E_Location,
    vehicleTypes,
    transmissionTypes,
    seatCount,
    priceFrom,
    priceTo,
    starRating,
    pickUpDate,
    dropOffDate
  })

  useEffect(() => {
    refetchRentalUnits()
  }, [page, location, vehicleTypes, transmissionTypes, seatCount, priceFrom, priceTo, starRating, pickUpDate, dropOffDate])

  const rentals = (rentalUnits?.items as any)?.map((item: any) => { // TODO: fix types
    const category: E_Rental_Category = item.category
    const titleMap = {
      [E_Rental_Category.Motorbike]: `${item.make} ${item.modelBadge}`,
      [E_Rental_Category.Car]: `${item.year} ${item.make} ${item.modelBadge}`,
      [E_Rental_Category.Bicycle]: item.make,
    }
    return {
      title: titleMap[category],
      location: item.location,
      listingId: item._id,
      price: item.pricing.dayRate,
      photos: item.photos.map((photo: { key: string }) => ({
        key: photo.key,
      })),
      category,
      average: item.average,
      reviewsCount: item.reviewsCount,
      transmission: item.transmission,
      fuel: item.fuel,
    }
  })

  if (isLoading) {
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
            {isRefetching ? <Spinner variant="primary" /> : null}
            {!isLoading && !isRefetching && rentals && rentals?.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {rentals?.map((item: any) => ( // TODO: fix types
                  <div key={item.listingId}>
                    <RentalCard {...item} />
                  </div>
                ))}
              </div>
            ) : null}

            {!isLoading && !isRefetching && rentals && rentals?.length === 0 ? (
              <Typography variant="h4" className="text-gray-500 italic">
                No rentals found for the search and filters values
              </Typography>
            ) : null}
          </div>
        </div>

        <div className="w-2/3 relative">
          <div className="sticky top-[20rem]">
            {rentals ? (
              <Map rentals={rentals} location={location as E_Location} />
            ) : null}
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default RentalsFilter

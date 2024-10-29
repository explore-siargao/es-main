"use client"
import React, { useEffect } from "react"
import ListingItems from "./components/ListingItems"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import ListingsMap from "./components/map/index"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import useGetActivityListings from "./components/map/hooks/use-get-activity-listings"

const ActivitiesFilter = () => {
    const searchParams = useSearchParams()
    const type = searchParams.get("activityType")
    const activityType = searchParams.get("experienceType")
    const duration = searchParams.get("duration")
    const priceFrom = searchParams.get("priceFrom")
    const priceTo = searchParams.get("priceTo")
    const stars = searchParams.get("starRating")
  
    const { data: activityUnits, refetch: refetchActivityUnits } = useGetActivityListings(  
        "any",
        type, 
        activityType,
        priceFrom,
        priceTo,
        duration,
        stars)

      useEffect(() => {
        refetchActivityUnits();
      }, [  type, activityType, priceFrom,priceTo, duration, stars]);
      
      console.log(activityUnits)
      const bookableUnits = activityUnits?.items?.map(item=> ({
        ...item,
        title: item.make,
        location: item.location,
        _id: item._id,
        currency: "PHP",
        price: item.pricing.dayRate,
        photos: item.photos.map((photo: { key: string }) => ({
          fileKey: photo.key,
        })),
      }));

    const markers = bookableUnits?.map((rental) => {
      const marker = {
        ...rental.location,
        name: rental.title,
        _id: rental._id,
        currency: rental.currency,
        price: rental.price,
        photos: rental.photos[0] as { fileKey: string; alt: string },
      }
      return marker
    })
  
    return (
        <WidthWrapper width="medium" className="-mt-4">
        <div className="flex gap-12 mt-16">
          {/* Listings section */}
          <div className="flex w-7/12">
            <div>
              {bookableUnits && bookableUnits?.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                  {bookableUnits?.map((item: any) => (
                    <div key={item._id}>
                      <ListingItems {...item} />
                    </div>
                  ))}
                </div>
              ) : (
                <Typography variant="h4" className="text-center mt-20">
                  No Data Found
                </Typography>
              )}
            </div>
          </div>
  
          <div className="w-5/12 relative">
            <div className="sticky top-[19rem]">
              {markers ?   <ListingsMap markers={markers} iconMarker="island" /> : null}
             
            </div>
          </div>
        </div>
        </WidthWrapper>
    )
  }
  
  export default ActivitiesFilter
  
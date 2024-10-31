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
    const location = searchParams.get("location")
    const type = searchParams.get("experienceType")
    const activityType = searchParams.get("activityType")
    const duration = searchParams.get("duration")
    const priceFrom = searchParams.get("priceFrom")
    const priceTo = searchParams.get("priceTo")
    const stars = searchParams.get("starRating")
  
    const { data: activityUnits, refetch: refetchActivityUnits } = useGetActivityListings(  
        location,
        activityType,
        type, 
        priceFrom,
        priceTo,
        duration,
        stars)

      useEffect(() => {
        refetchActivityUnits();
      }, [ location, type, activityType, priceFrom,priceTo, duration, stars]);
      
      
      const bookableUnits = activityUnits?.items?.map(item=> ({
        ...item,
        title: item.title,
        location: item.meetingPoint,
        _id: item._id,
        currency: "PHP",
        price: item.pricePerPerson ?? item.pricePerSlot,
        photos: item.photos.map((photo: { key: string }) => ({
          fileKey: photo.key,
        })),
        ratings: item.average
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
           {bookableUnits && bookableUnits?.length > 0 ? (
        <div className="flex gap-12 mt-16">
          {/* Listings section */}
          <div className="flex w-7/12">
            <div>
             
                <div className="grid grid-cols-3 gap-6">
                  {bookableUnits?.map((item: any) => (
                    <div key={item._id}>
                      <ListingItems {...item} />
                    </div>
                  ))}
                </div>
            
            </div>
          </div>
  
          <div className="w-5/12 relative">
            <div className="sticky top-[19rem]">
              {markers ?   <ListingsMap markers={markers} iconMarker="island" /> : null}
             
            </div>
          </div>
        </div>
          ) : (
            <div className="h-screen">
            <Typography variant="h4" className=" text-gray-500 pt-1 italic mt-16"> 
              No Activities Found
            </Typography>
            </div>
          )}
        </WidthWrapper>
    )
  }
  
  export default ActivitiesFilter
  
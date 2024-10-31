"use client"
import React, { useEffect } from "react"
import ListingItems from "./components/ListingItems"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import ListingsMap from "./components/map/index"
import useGetPropertyListings from "./components/map/hooks/use-get-property-listings"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"

type TPhoto = {
  key: string;
};

type TBookableUnitType = {
  _id: string;
  photos: TPhoto[];
  unitPrice: { baseRate: number }; 
  average: string;
};

const PropertiesFilter = () => {
    const searchParams = useSearchParams()
    const location = searchParams.get("location")
    const type = searchParams.get("propertyType")
    const priceFrom = searchParams.get("priceFrom")
    const priceTo = searchParams.get("priceTo")
    const bedrooms = searchParams.get("bedroomCount")
    const beds = searchParams.get("bedCount")
    const bathrooms = searchParams.get("bathroomCount")
    const facilities = searchParams.get("facilities")
    const amenities = searchParams.get("amenities")
    const starRating = searchParams.get("starRating")
  
    const { data: propertyUnits, refetch: refetchPropertyUnits } = useGetPropertyListings(  
      location,
      type,
      facilities,
      amenities,
      priceFrom,
      priceTo,
      beds,
      bathrooms,
      bedrooms,
      starRating)

      useEffect(() => {
        refetchPropertyUnits();
      }, [location, type, facilities, amenities, priceFrom, priceTo, beds, bathrooms, bedrooms, starRating]);
  
    const bookableUnits = propertyUnits?.items
    ?.flatMap(item => 
      item.bookableUnits.map((unit: TBookableUnitType) => ({
        listingId: unit._id,
        photos: unit.photos.map((photo) => ({
          fileKey: photo.key, 
        })),
        offerBy: item.offerBy,
        location: item.location,
        title: item.title,
        price: unit.unitPrice.baseRate,
        dayTime: "per night",
        ratings: unit.average
      }))
    );

    const markers = bookableUnits?.map((property) => {
      const marker = {
        ...property.location,
        name: property.title,
        _id: property._id,
        currency: property.currency,
        price: property.price,
        photos: property.photos[0] as { fileKey: string; alt: string },
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
              {bookableUnits && markers ?   <ListingsMap markers={markers} iconMarker="island" /> : null}
             
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen">
        <Typography variant="h4" className=" text-gray-500 pt-1 italic mt-16"> 
          No Properties Found
        </Typography>
        </div>
      )}
        </WidthWrapper>
    )
  }
  
  export default PropertiesFilter
  
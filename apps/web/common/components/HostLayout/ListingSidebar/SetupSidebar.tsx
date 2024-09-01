"use client"
import React from 'react'
import Link from "next/link"
import { Typography } from "@/common/components/ui/Typography"
import { getActivityLinks, getPropertyLinks, getRentalLinks } from "./links/setup"
import { E_Listing_Category } from "@repo/contract"
import useGetFinishedSections from '@/module/Hosting/Listings/hooks/useGetFinishedSections'
import NewListingEditIndicator from "./NewListingEditIndicator"

const SetupSidebar = ({ category, listingId }: { category: E_Listing_Category, listingId: string }) => {
  const { data } = useGetFinishedSections({ listingId, category })
  const finishedSections = data?.item?.finishedSections || []
  const links = {
    [E_Listing_Category.Property]: getPropertyLinks(listingId),
    [E_Listing_Category.Activity]: getActivityLinks(listingId),
    [E_Listing_Category.Rental]: getRentalLinks(listingId),
  }
  const SECTION_LINKS = links[category]
  return (
    <>
      {SECTION_LINKS.map((item, index) => {
        const isSectionFinished = finishedSections.includes(item.id)
        return (
          <li key={item.title}>
            {isSectionFinished ||
              finishedSections.length + 1 === index + 1 ? (
              <Link
                href={item.link}
                passHref={true}
                className="text-text-400 hover:text-text-700 hover:underline group flex items-center gap-x-2 rounded-md text-sm leading-6 font-semibold"
              >
                {isSectionFinished ? (
                  <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
                    {item.icon}
                  </div>
                ) : (
                  <div className="h-8 w-8 bg-gray-100 text-text-300 flex items-center justify-center rounded-full">
                    {item.icon}
                  </div>
                )}
                <Typography
                  variant="p"
                  fontWeight="semibold"
                  className="flex items-center gap-2 justify-center"
                >
                  {item.title}{" "}
                  <NewListingEditIndicator basePath={item.basePath} />
                </Typography>
              </Link>
            ) : (
              <div className="text-text-400 group flex items-center gap-x-2 rounded-md text-sm leading-6 font-semibold hover:cursor-not-allowed">
                {isSectionFinished ? (
                  <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
                    {item.icon}
                  </div>
                ) : (
                  <div className="h-8 w-8 bg-gray-100 text-text-300 flex items-center justify-center rounded-full">
                    {item.icon}
                  </div>
                )}
                <Typography
                  variant="p"
                  fontWeight="semibold"
                  className="flex items-center gap-2 justify-center"
                >
                  {item.title}{" "}
                  <NewListingEditIndicator basePath={item.basePath} />
                </Typography>
              </div>
            )}
            {isSectionFinished &&
              finishedSections.length < SECTION_LINKS.length ? (
              <div className="ml-4 w-[2px] h-6 bg-primary-600 mt-2"></div>
            ) : finishedSections.length < SECTION_LINKS.length &&
              SECTION_LINKS.length > index + 1 ? (
              <div className="ml-4 w-[2px] h-6 bg-gray-200 mt-2"></div>
            ) : SECTION_LINKS.length > index + 1 ? (
              <div className="ml-4 w-[2px] h-6 bg-primary-600 mt-2"></div>
            ) : null}
          </li>
        )
      })}
    </>
  )
}

export default SetupSidebar
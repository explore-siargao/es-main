"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import { Typography } from "@/common/components/ui/Typography"
import {
  getActivityLinks,
  getPropertyLinks,
  getRentalLinks,
} from "./links/setup"
import { E_Listing_Category } from "@repo/contract"
import useGetFinishedSections from "@/module/Hosting/Listings/hooks/useGetFinishedSections"
import NewListingEditIndicator from "./NewListingEditIndicator"
import useGetPropertyById from "@/module/Hosting/Listings/Properties/hooks/useGetPropertyById"
import useGetActivityById from "@/module/Admin/Activity/hooks/useGetActivitiesById"
import useGetRentalById from "@/module/Admin/Listings/hooks/useGetRentalById"

const SetupSidebar = ({
  category,
  listingId,
}: {
  category: E_Listing_Category
  listingId: string
}) => {
  const { data: finishedData } = useGetFinishedSections({ listingId, category })

  useEffect(() => {
    console.log("Category:", category)
  }, [category])

  const getLinks = (
    category: E_Listing_Category,
    listingId: string,
    type?: string
  ) => {
    const links = {
      [E_Listing_Category.Property]: getPropertyLinks(listingId, type ?? ""),
      [E_Listing_Category.Activity]: getActivityLinks(listingId),
      [E_Listing_Category.Rental]: getRentalLinks(listingId),
    }
    return links[category]
  }

  const { data: categoryData } =
    category === E_Listing_Category.Property
      ? useGetPropertyById(listingId)
      : category === E_Listing_Category.Activity
        ? useGetActivityById(listingId)
        : useGetRentalById(listingId)

  const finishedSections = finishedData?.item?.finishedSections || []
  const SECTION_LINKS = getLinks(category, listingId, categoryData?.item?.type)

  const renderLink = (item: any, index: number) => {
    const isSectionFinished = finishedSections.includes(item.id)
    const isLinkEnabled =
      isSectionFinished || finishedSections.length + 1 === index + 1

    const Icon = (
      <div
        className={`h-10 w-10 flex items-center justify-center rounded-full mb-4 ${
          isSectionFinished
            ? "bg-primary-100 text-primary-600"
            : "bg-gray-100 text-text-300"
        }`}
      >
        {item.icon}
      </div>
    )

    return (
      <li key={item.title} className="relative mb-4">
        {isLinkEnabled ? (
          <Link
            href={item.link}
            passHref={true}
            className="text-text-400 hover:text-text-700 hover:underline group flex items-center gap-x-3 rounded-md text-sm leading-6 font-semibold"
          >
            {Icon}
            <Typography
              variant="p"
              fontWeight="semibold"
              className="flex items-center gap-2 justify-center"
            >
              {item.title} <NewListingEditIndicator basePath={item.basePath} />
            </Typography>
          </Link>
        ) : (
          <div className="text-text-400 group flex items-center gap-x-3 rounded-md text-sm leading-6 font-semibold hover:cursor-not-allowed">
            {Icon}
            <Typography
              variant="p"
              fontWeight="semibold"
              className="flex items-center gap-2 justify-center"
            >
              {item.title} <NewListingEditIndicator basePath={item.basePath} />
            </Typography>
          </div>
        )}

        {index + 1 !== SECTION_LINKS.length && (
          <div
            className={`absolute left-[1.25rem] top-[3rem] w-[2px] h-[30px] ${
              isSectionFinished ? "bg-primary-600" : "bg-gray-200"
            }`}
          />
        )}
      </li>
    )
  }

  return <ul className="relative">{SECTION_LINKS.map(renderLink)}</ul>
}

export default SetupSidebar

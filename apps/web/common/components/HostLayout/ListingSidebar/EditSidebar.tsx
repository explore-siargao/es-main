import React from 'react'
import Link from "next/link"
import { Typography } from "../../ui/Typography"
import LinkIndicator from "../LinkIndicator"
import { getActivityLinks, getPropertyLinks, getRentalLinks } from "./links/edit"
import { E_Listing_Category } from "@repo/contract"

const EditSidebar = ({ category, listingId }: { category: E_Listing_Category, listingId: string }) => {
  const links = {
    [E_Listing_Category.Property]: getPropertyLinks(listingId),
    [E_Listing_Category.Activity]: getActivityLinks(listingId),
    [E_Listing_Category.Rental]: getRentalLinks(listingId),
  }
  return (
    <>
      {links[category].map((item) => (
        <li key={item.title}>
          <LinkIndicator basePath={item.basePath} />
          <Link
            href={item.link}
            passHref={true}
            className="text-gray-600 hover:text-black hover:bg-primary-100 group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold"
          >
            {item.icon}
            <Typography variant="p" fontWeight="semibold">
              {item.title}
            </Typography>
          </Link>
        </li>
      ))}
    </>
  )
}

export default EditSidebar
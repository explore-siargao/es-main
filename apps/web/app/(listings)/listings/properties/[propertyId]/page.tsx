import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import { PROPERTY } from "@/common/constants"
import { notFound } from "next/navigation"
import Property from "@/module/Listing/Property"
import { getRequest } from "@/common/helpers/getRequest"

export const metadata: Metadata = {
  title: `${PROPERTY} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

type T_Props = {
  params: {
    propertyId: string
  }
}

const PropertyPublicPage = async ({ params: { propertyId } }: T_Props) => {
  const listing = await getRequest(`/properties/public/${propertyId}`)

  if (listing && listing.status === 404) {
    notFound()
  }

  if ((listing && listing.status === 500) || !listing) {
    throw new Error("Internal Server Error")
  }

  return <Property propertyData={listing} />
}

export default PropertyPublicPage
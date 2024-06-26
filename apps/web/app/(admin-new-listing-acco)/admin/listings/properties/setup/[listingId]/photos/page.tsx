import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import ListingPhotos from "@/module/Admin/Listings/ForReview/Property/Photos"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const ListingPhotosPage = () => {
  return (
    <AuthGuard>
      <ListingPhotos pageType="setup" />
    </AuthGuard>
  )
}

export default ListingPhotosPage

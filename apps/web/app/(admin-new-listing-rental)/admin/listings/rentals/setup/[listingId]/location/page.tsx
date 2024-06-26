import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import RentalLocation from "@/module/Admin/Listings/Declined/Rental/Location"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const ListingBasicInfoPage = () => {
  return (
    <AuthGuard>
      <RentalLocation pageType="setup" />
    </AuthGuard>
  )
}

export default ListingBasicInfoPage

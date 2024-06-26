import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import Details from "@/module/Admin/Listings/Declined/Rental/Details"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const RentalDetailsPage = () => {
  return (
    <AuthGuard>
      <Details pageType="setup" />
    </AuthGuard>
  )
}

export default RentalDetailsPage

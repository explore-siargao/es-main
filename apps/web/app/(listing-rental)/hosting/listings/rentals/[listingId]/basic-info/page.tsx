import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import BasicInfo from "@/module/Hosting/Listings/Rentals/Rental/BasicInfo"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const RentalBasicInfoPage = () => {
  return (
    <AuthGuard>
      <BasicInfo pageType="edit" />
    </AuthGuard>
  )
}

export default RentalBasicInfoPage
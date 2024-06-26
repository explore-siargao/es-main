import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import BasicInfo from "@/module/Admin/Listings/Declined/Rental/BasicInfo"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const RentalBasicInfoPage = () => {
  return (
    <AuthGuard>
      <BasicInfo pageType="setup" />
    </AuthGuard>
  )
}

export default RentalBasicInfoPage

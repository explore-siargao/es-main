import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import Inclusions from "@/module/Hosting/Listings/Activities/Activity/Inclusions"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const RentalBasicInfoPage = () => {
  return (
    <AuthGuard>
      <Inclusions pageType="edit" />
    </AuthGuard>
  )
}

export default RentalBasicInfoPage

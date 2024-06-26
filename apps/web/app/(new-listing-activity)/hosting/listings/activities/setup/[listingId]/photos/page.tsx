import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AuthGuard from "@/common/components/AuthGuard"
import ActivityPhotos from "@/module/Hosting/Listings/Activities/Activity/Photos"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const ActivityPhotosPage = () => {
  return (
    <AuthGuard>
      <ActivityPhotos pageType="setup" />
    </AuthGuard>
  )
}

export default ActivityPhotosPage

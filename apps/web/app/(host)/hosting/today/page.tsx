import { HOST } from "@/common/constants"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import HostingToday from "@/module/Hosting/Today"
import AuthGuard from "@/common/components/AuthGuard"

export const metadata: Metadata = {
  title: `${HOST} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const HostingTodayPage = () => {
  return (
    <AuthGuard>
      <HostingToday />
    </AuthGuard>
  )
}

export default HostingTodayPage

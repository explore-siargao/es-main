"use client"
import useGetNotifications from "./hooks/useGetNotifications"
import Notifications, { NotificationContent } from "./components/Notification"
const NotificationUI = () => {
  const { data, isPending } = useGetNotifications(1)
  return (
    <div>
      {!isPending && (
        <Notifications content={data?.items as NotificationContent[]} />
      )}
    </div>
  )
}
export default NotificationUI

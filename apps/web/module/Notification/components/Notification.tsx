import { WidthWrapper } from "@/common/components/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import {
  differenceInDays,
  differenceInHours,
  formatDistance,
  subDays,
} from "date-fns"
import React from "react"

export interface NotificationContent {
  id: number
  profilePicture: string
  name: string
  listing: {
    hostId: number
    title: string
  }
  type: string
  days?: number
  createdAt: string
}
interface NotificationProps {
  content?: NotificationContent[]
  size?: "sm" | "md"
}

const Notifications = ({ content, size }: NotificationProps) => {
  return (
    <div className="mx-auto">
      <WidthWrapper className="my-24 lg:my-32">
        <Typography variant="h2" fontWeight="semibold" className="mb-4">
          Activity
        </Typography>
        {content?.map((item: NotificationContent) => {
          const now = new Date()
          const createdAt = new Date(item.createdAt)
          const timeDifferenceInDays = differenceInDays(now, createdAt)

          const twoDaysAgo = subDays(new Date(), timeDifferenceInDays)
          const formattedDistance = formatDistance(twoDaysAgo, new Date(), {
            addSuffix: true,
          })

          return (
            <div key={item.id} className="notification">
              <div className="flex items-start right-0 border-b">
                <div className="py-4 pr-2">
                  <div
                    className={cn(
                      `rounded-full`,
                      size === "sm" ? "h-2 w-2" : "h-12 w-12"
                    )}
                  >
                    <img
                      src={`/assets/${item.profilePicture}`}
                      width={0.5}
                      height={0.5}
                      alt="Avatar"
                      className="object-cover h-full w-full rounded-full"
                    />
                  </div>
                </div>
                <div className="py-4 pl-2 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <Typography variant="p" fontWeight="semibold">
                        {item.name}
                      </Typography>
                      {item.type === "Booking" ? (
                        <p>
                          Booked your listing
                          <span className="font-semibold">
                            {" "}
                            {item.listing.title}{" "}
                          </span>
                          for
                          <span className="font-semibold">
                            {" "}
                            {item.days} days
                          </span>
                        </p>
                      ) : (
                        <p>
                          Added a review to your listing{" "}
                          <span className="font-semibold">
                            {item.listing.title}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="pl-2">
                      <Typography variant="p">{formattedDistance}</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </WidthWrapper>
    </div>
  )
}
export default Notifications

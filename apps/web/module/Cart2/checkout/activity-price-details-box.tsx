"use client"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import Image from "@/common/components/ui/image"
import CheckoutMoreInfoModal from "@/module/Listing/property/modals/checkout-more-info-modal"
import { T_Cart_Item } from "@repo/contract-2/cart"
import formatCurrency from "@/common/helpers/format-currency"
import { E_Activity_Experience_Type } from "@repo/contract"

type T_Activity_Price_Details_Box = {
  items: T_Cart_Item[]
}

const ActivityPriceDetailsBox = ({ items }: T_Activity_Price_Details_Box) => {
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)

  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto sticky">
      <Typography variant="h2" fontWeight="semibold">
        Activities
      </Typography>
      <div className="mt-4">
        {items.map((item, index) => {
          let activityBasePrice = 0
          const activity = item.activityIds?.activityId
          if (activity?.experienceType === E_Activity_Experience_Type.Joiner) {
            activityBasePrice = activity?.pricePerPerson || 0
          } else if (
            activity?.experienceType === E_Activity_Experience_Type.Private
          ) {
            activityBasePrice = activity?.pricePerSlot || 0
          }
          return (
            <div key={index}>
              {item.activityIds?.activityId && (
                <div className="flex gap-x-4 items-center">
                  <div className="flex h-20 w-24 items-center justify-center rounded-md">
                    <Image
                      width={300}
                      height={300}
                      src={`/assets/${item.activityIds.activityId.photos?.[0]?.key}`}
                      alt="Rental"
                      className="block h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant={"h3"} fontWeight="semibold">
                      {item.activityIds.activityId.title}
                    </Typography>
                    <Typography variant="p" className="text-text-400">
                      {item.activityIds.activityId?.meetingPoint
                        ?.streetAddress &&
                        `${item.activityIds.activityId?.meetingPoint?.streetAddress}, `}
                      {item.activityIds.activityId?.meetingPoint?.barangay &&
                        `${item.activityIds.activityId?.meetingPoint?.barangay}, `}
                      {item.activityIds.activityId?.meetingPoint?.city &&
                        `${item.activityIds.activityId?.meetingPoint?.city}`}
                    </Typography>
                  </div>
                </div>
              )}
              <hr className="mt-4" />
              <div className="flex flex-col mt-3">
                <div className="flex w-full justify-between items-center">
                  <Typography className="text-sm text-text-400">
                    {formatCurrency(activityBasePrice)} x{" "}
                    {item.guestCount || "1"} guest
                    {item.guestCount && item.guestCount > 1 ? "s" : ""}
                  </Typography>
                  <Typography className="text-sm text-text-400">
                    {formatCurrency(item.price)}
                  </Typography>
                </div>
                <div className="flex w-full justify-between items-center">
                  <Typography className="text-sm text-text-400">
                    Service fee
                  </Typography>
                  <Typography className="text-sm text-text-400">
                    {formatCurrency(item.guestComission)}
                  </Typography>
                </div>
              </div>
              <hr className="mt-3" />
              <div className="flex w-full justify-between mt-2">
                <Typography fontWeight="semibold">
                  Total before taxes
                </Typography>
                <Typography fontWeight="semibold">
                  {formatCurrency(item.price + item.guestComission)}
                </Typography>
              </div>
            </div>
          )
        })}
      </div>
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
    </div>
  )
}

export default ActivityPriceDetailsBox

"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import { APP_NAME } from "@repo/constants"
import Image from "@/common/components/ui/image"
import CheckoutMoreInfoModal from "@/module/Listing/Property/components/modals/CheckoutMoreInfoModal"
import { T_Cart_Item } from "@repo/contract-2/cart"
import formatCurrency from "@/common/helpers/formatCurrency"
import { GUEST_COMMISSION_TITLE } from "@/common/constants"

type T_Activity_Price_Details_Box = {
  items: T_Cart_Item[]
}

const ActivityPriceDetailsBox = ({ items }: T_Activity_Price_Details_Box) => {
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)

  const calculateTotalPrice =
    items.length > 0
      ? items.reduce((accumulator, item) => accumulator + (item.price || 0), 0)
      : 0

  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto sticky">
      <Typography variant="h2" fontWeight="semibold">Rentals</Typography>
      <div className="mt-4">
        {items.map((item, index) => (
          <div key={index}>
            {item.rentalIds?.rentalId && (
              <div className="flex gap-x-4 items-center">
                <div className="flex h-20 w-24 items-center justify-center rounded-md">
                  <Image
                    width={300}
                    height={300}
                    src={`/assets/${item.rentalIds.rentalId.photos?.[0]?.key}`}
                    alt="Rental"
                    className="block h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <Typography variant={"h3"} fontWeight="semibold">
                    {item.rentalIds.rentalId.make} {item.rentalIds.rentalId.modelBadge}
                  </Typography>
                  <Typography variant="p" className="text-gray-500">
                    {item.rentalIds.rentalId?.location?.streetAddress &&
                      `${item.rentalIds.rentalId?.location?.streetAddress}, `}
                    {item.rentalIds.rentalId?.location?.barangay &&
                      `${item.rentalIds.rentalId?.location?.barangay}, `}
                    {item.rentalIds.rentalId?.location?.city &&
                      `${item.rentalIds.rentalId?.location?.city}`}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr className="mt-6" />
      <div className="flex flex-col mt-4">
        <Typography fontWeight="semibold" variant="h3">
          Price details
        </Typography>
        <div className="flex w-full justify-between items-center mt-4">
          <Typography className="text-sm">₱25,000.00 x 5 days</Typography>
          <Typography className="text-sm">₱125,000.00</Typography>
        </div>
        <div className="flex w-full justify-between items-center">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() => setIsMoreInfoModalOpen(true)}
          >
            {GUEST_COMMISSION_TITLE}
          </Button>
          <Typography className="text-sm">₱1,000.00</Typography>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="flex w-full justify-between mt-6">
        <Typography fontWeight="semibold">Total</Typography>
        <Typography fontWeight="semibold">{formatCurrency(calculateTotalPrice)}</Typography>
      </div>
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
    </div>
  )
}

export default ActivityPriceDetailsBox

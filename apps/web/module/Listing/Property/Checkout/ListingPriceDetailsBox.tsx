"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import { APP_NAME } from "@repo/constants"
import Image from "next/image"
import CheckoutMoreInfoModal from "@/module/Listing/Property/components/modals/CheckoutMoreInfoModal"
import { LucideStar } from "lucide-react"

const ListingPriceDetailsBox = () => {
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  return (
    <div className="flex">
      <div className="border p-6 rounded-xl flex flex-col">
        <div className="flex gap-x-4 items-center">
          <div className="flex h-20 w-24 items-center justify-center rounded-md">
            <Image
              width={300}
              height={300}
              src={`/assets/1.jpg`}
              alt="Listing"
              className="block h-full w-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Typography fontWeight="semibold">
              Villa Manao · Private Pool | Bathtub | Sky shower
            </Typography>
            <div className="flex">
              <LucideStar height={15} />
              <Typography variant="h5">0 (0 review)</Typography>
            </div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col">
          <Typography fontWeight="semibold" variant="h2">
            Price details
          </Typography>
          <div className="flex w-full justify-between items-center mt-4">
            <Typography className="text-sm">₱25,000.00 x 5 nights</Typography>
            <Typography className="text-sm">₱125,000.00</Typography>
          </div>
          <div className="flex w-full justify-between items-center">
            <Button
              variant={"ghost"}
              className="underline pl-0"
              onClick={() => setIsMoreInfoModalOpen(true)}
            >
              {APP_NAME} service fee
            </Button>
            <Typography className="text-sm">₱1,000.00</Typography>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex w-full justify-between">
          <Typography fontWeight="semibold">Total</Typography>
          <Typography fontWeight="semibold">₱126,000.00</Typography>
        </div>
      </div>
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
    </div>
  )
}

export default ListingPriceDetailsBox

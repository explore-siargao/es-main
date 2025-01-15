"use client"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import React from "react"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { format, subDays } from "date-fns"
import RentalContacts from "./contacts"

type T_Rental_Price_Details_Box = {
  items: T_Cart_Item[]
  isViewOnly?: boolean
}

const RentalMoreInfo = ({ items, isViewOnly }: T_Rental_Price_Details_Box) => {
  return (
    <>
      {items.map((item) => {
        const rental = item.rentalIds?.rentalId
        const freeCancelDate = format(
          subDays(item.startDate, 3),
          "MMMM dd, yyyy"
        )
        return (
          <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto sticky">
            <Typography variant="h2" fontWeight="semibold">
              {rental?.make} {rental?.modelBadge}
            </Typography>
            <div className="mt-4">
              <div className="flex w-full flex-col">
                <Typography variant={"h3"} fontWeight="semibold">
                  Dates
                </Typography>
                <Typography className="mt-2 text-text-400">
                  From{" "}
                  {item.startDate
                    ? format(new Date(item.startDate), "MMMM dd")
                    : "Date from"}{" "}
                  to{" "}
                  {item.endDate
                    ? format(new Date(item.endDate), "MMMM dd, y")
                    : "Date to"}
                </Typography>
              </div>
              <hr className="my-4" />
              <RentalContacts cartItem={item} isViewOnly={isViewOnly} />
              <hr className="my-4" />
              <div className="flex flex-col gap-y-4">
                <Typography variant={"h3"} fontWeight="semibold">
                  Cancellation policy
                </Typography>
                <div className="flex gap-2">
                  <Typography className="text-text-400">
                    <span>
                      Free cancellation before 2:00 PM on {freeCancelDate}.
                    </span>
                  </Typography>
                  <Link className="underline text-text-400" href="#">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default RentalMoreInfo

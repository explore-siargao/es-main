"use client"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import React from "react"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { format, subDays } from "date-fns"
import PropertyContacts from "./property-contacts"

type T_Property_Price_Details_Box = {
  items: T_Cart_Item[]
}

const PropertyMoreInfo = ({ items }: T_Property_Price_Details_Box) => {
  return (
    <>
      {items.map((item) => {
        const unitId = item.propertyIds?.unitId

        // const freeCancelDate = format(
        //   subDays(item.startDate, unitId?.daysCanCancel),
        //   "MMMM dd, yyyy"
        // )
        return (
          <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto sticky">
            <Typography variant="h2" fontWeight="semibold">
              {unitId?.title}
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
              <PropertyContacts cartItem={item} />
              <hr className="my-4" />
              <div className="flex flex-col gap-y-4">
                <Typography variant={"h3"} fontWeight="semibold">
                  Cancellation policy
                </Typography>
                <Typography className="text-text-400">
                  {/* <span>
                    Free cancellation before 2:00 PM on {freeCancelDate}.
                  </span>{" "} */}
                  Cancel before check-in on{" "}
                  {format(item.startDate, "MMMM dd, yyyy")} for a partial
                  refund.{" "}
                  <Link className="underline" href="#">
                    Learn more
                  </Link>
                </Typography>
              </div>
              <hr className="my-4" />
              <div className="flex flex-col gap-y-4">
                <Typography variant={"h3"} fontWeight="semibold">
                  Ground rules
                </Typography>
                <Typography className="text-text-400">
                  We ask every guest to remember a few simple things about what
                  makes a great guest.
                </Typography>
                <ul className="list-disc ml-6 text-text-400">
                  {item.propertyIds?.propertyId?.policies?.map((policy) => (
                    <li>{policy.policy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PropertyMoreInfo

import { Typography } from "@/common/components/ui/Typography"
import React from "react"
import { GUEST_COMMISSION_PERCENT } from "@repo/constants"
import Image from "@/common/components/ui/image"
import { T_Cart_Item } from "@repo/contract-2/cart"
import formatCurrency from "@/common/helpers/formatCurrency"
import { GUEST_COMMISSION_TITLE } from "@/common/constants"
import { differenceInDays } from "date-fns"
import extractCommission from "../helpers/extract-commission"

type T_Property_Price_Details_Box = {
  items: T_Cart_Item[]
}

const PropertyPriceDetailsBox = ({ items }: T_Property_Price_Details_Box) => {
  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto sticky">
      <Typography variant="h2" fontWeight="semibold">Places</Typography>
      <div className="mt-4 flex flex-col gap-6">
        {items.map((item, index) => {
          const extractedPriceCommission = extractCommission(item.price || 0, GUEST_COMMISSION_PERCENT)
          const nightCount = differenceInDays(
            item.endDate ?? new Date(),
            item.startDate ?? new Date()
          )
          return (
            <div key={index}>
              {item.propertyIds?.propertyId && (
                <div className="flex gap-x-4 items-center">
                  <div className="flex h-20 w-24 items-center justify-center rounded-md">
                    <Image
                      width={300}
                      height={300}
                      src={`/assets/${item.propertyIds.unitId.photos?.[0]?.key}`}
                      alt="Property"
                      className="block h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant={"h3"} fontWeight="semibold">
                      {item.propertyIds.unitId.title}
                    </Typography>
                    <Typography variant="p" className="text-gray-500">
                      {`${item.propertyIds.propertyId.location?.streetAddress || ""}, ${item.propertyIds.propertyId.location?.barangay || ""
                        }, ${item.propertyIds.propertyId.location?.city || ""}`}
                    </Typography>
                  </div>
                </div>
              )}
              <hr className="mt-4" />
              <div className="flex flex-col mt-3">
                <div className="flex w-full justify-between items-center">
                  <Typography className="text-sm">{formatCurrency(extractedPriceCommission.basePrice / nightCount)} x {nightCount} night{nightCount > 1 && "s"}</Typography>
                  <Typography className="text-sm">{formatCurrency(extractedPriceCommission.basePrice)}</Typography>
                </div>
                <div className="flex w-full justify-between items-center">
                  <Typography className="text-sm">{GUEST_COMMISSION_TITLE}</Typography>
                  <Typography className="text-sm">{formatCurrency(extractedPriceCommission.extractedPercentage)}</Typography>
                </div>
              </div>
              <hr className="mt-3" />
              <div className="flex w-full justify-between mt-2">
                <Typography fontWeight="semibold">Total before taxes</Typography>
                <Typography fontWeight="semibold">{formatCurrency(item.price)}</Typography>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PropertyPriceDetailsBox

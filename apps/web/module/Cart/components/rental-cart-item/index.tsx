import { Button } from "@/common/components/ui/Button"
import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/format-currency"
import transmissionAcronym from "@/module/Admin/Listings/helpers/transmissionAcronym"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { format } from "date-fns/format"
import { Pencil, Trash } from "lucide-react"
import React from "react"

interface ICartProps {
  item: T_Cart_Item
  selectedItems: string[]
  index: number
  toggleCheckbox: (id: string, price: number) => void
  setItemId: (value: string) => void
  setIsDeleteCartItemOpen: (value: boolean) => void
  viewOnly?: boolean
}

function RentalCartItem({
  item,
  selectedItems,
  index,
  toggleCheckbox,
  setItemId,
  setIsDeleteCartItemOpen,
  viewOnly,
}: ICartProps) {
  const rentalItem = item.rentalIds?.rentalId
  return (
    <div key={rentalItem?._id} className="border rounded-xl p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          {viewOnly ? null : (
            <InputCheckbox
              id={item._id || index}
              colorVariant="secondary"
              checked={selectedItems.includes(item._id || "")}
              onChange={() => toggleCheckbox(item._id || "", item.price)}
            />
          )}
          <img
            src={`/assets/${rentalItem?.photos && rentalItem?.photos[0]?.key}`}
            width={140}
            height={140}
            alt="item image"
            className="rounded-md object-cover"
          />
          <div className="flex-1">
            <Typography variant="h3" fontWeight="semibold">
              {rentalItem?.make} {rentalItem?.modelBadge}
            </Typography>
            <Typography variant="p" className="text-text-400">
              {rentalItem?.location?.streetAddress &&
                `${rentalItem?.location?.streetAddress}, `}
              {rentalItem?.location?.barangay &&
                `${rentalItem?.location?.barangay}, `}
              {rentalItem?.location?.city && `${rentalItem?.location?.city}`}
            </Typography>
            <Typography variant="p" className="text-text-400">
              {rentalItem?.transmission} Transmission
            </Typography>
          </div>
        </div>
        {viewOnly ? null : (
          <div className="flex items-end">
            <Button
              variant="link"
              className="hover:underline text-info-500 hover:cursor-pointer flex items-center"
            >
              <Pencil height={18} />
              Modify
            </Button>
            <Button
              variant="link"
              className="hover:underline text-error-500 hover:cursor-pointer flex items-center"
              onClick={() => {
                setItemId(item._id || "")
                setIsDeleteCartItemOpen(true)
              }}
            >
              <Trash height={18} />
              Remove
            </Button>
          </div>
        )}
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Typography variant="p" className="text-gray-500">
            {item?.startDate && format(item?.startDate, "d MMM, yyyy")}{" "}
            {item?.endDate && `- ${format(item?.endDate, "d MMM, yyyy")}`}
          </Typography>
        </div>

        <Typography variant="p" fontWeight="semibold">
          {formatCurrency(item?.price + item.guestComission)}
        </Typography>
      </div>
    </div>
  )
}

export default RentalCartItem

import { Button } from "@/common/components/ui/Button"
import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/format-currency"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { format } from "date-fns/format"
import { Trash } from "lucide-react"
import React from "react"
import UpdatePropertyItemModal from "../modals/update-property-item-modal"

type T_Props = {
  item: T_Cart_Item
  selectedItems: string[]
  index: number
  toggleCheckbox: (id: string, price: number) => void
  setItemId: (value: string) => void
  setIsDeleteCartItemOpen: (value: boolean) => void
}

function PropertyItem({
  item,
  selectedItems,
  index,
  toggleCheckbox,
  setItemId,
  setIsDeleteCartItemOpen,
}: T_Props) {
  const unitItem = item.propertyIds?.unitId
  const propertyItem = item.propertyIds?.propertyId
  return (
    <div key={propertyItem?._id} className="border rounded-xl p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <InputCheckbox
            id={item._id || index}
            colorVariant="secondary"
            checked={selectedItems.includes(item._id || "")}
            onChange={() => toggleCheckbox(item._id || "", item.price)}
          />
          <img
            src={`/assets/${unitItem?.photos && unitItem?.photos[0]?.key}`}
            width={140}
            height={140}
            alt="item image"
            className="rounded-md object-cover"
          />
          <div className="flex-1">
            <Typography variant="h3" fontWeight="semibold">
              {unitItem?.title}
            </Typography>
            <Typography variant="p" className="text-text-400">
              {propertyItem?.location?.streetAddress &&
                `${propertyItem?.location?.streetAddress}, `}
              {propertyItem?.location?.barangay &&
                `${propertyItem?.location?.barangay}, `}
              {propertyItem?.location?.city &&
                `${propertyItem?.location?.city}`}
            </Typography>
            <Typography variant="p" className="text-text-400">
              {`${unitItem?.bedRooms?.length ? unitItem?.bedRooms?.length : 0} ${unitItem?.bedRooms && unitItem?.bedRooms?.length > 1 ? "bedrooms" : "bedroom"}`}
              {` · ${unitItem?.numBathrooms ? unitItem?.numBathrooms : 0} ${unitItem?.numBathrooms && unitItem?.numBathrooms > 1 ? "bathrooms" : "bathroom"}`}
              {` · ${unitItem?.livingRooms?.length ? unitItem?.livingRooms?.length : 0} ${unitItem?.livingRooms && unitItem?.livingRooms?.length > 1 ? "living rooms" : "living room"}`}
            </Typography>
          </div>
        </div>
        <div className="flex items-end">
          <UpdatePropertyItemModal
            cartItem={item}
            itemTitle={unitItem?.title || "Unknown"}
            itemGuestsMaxCapacity={unitItem?.unitPrice?.maximumCapacity || 0}
          />
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
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Typography variant="p" className="text-text-400">
            {item?.startDate &&
              format(item?.startDate, "MMMM dd, yyyy hh:mm a")}{" "}
            {item?.endDate &&
              `- ${format(item?.endDate, "MMMM dd, yyyy hh:mm a")}`}
          </Typography>
        </div>

        <Typography variant="p" fontWeight="semibold">
          {formatCurrency(item?.price + item.guestComission)}
        </Typography>
      </div>
    </div>
  )
}

export default PropertyItem

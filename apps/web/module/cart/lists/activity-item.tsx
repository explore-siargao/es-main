import { Button } from "@/common/components/ui/Button"
import InputCheckbox from "@/common/components/ui/InputCheckbox"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/format-currency"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { format } from "date-fns/format"
import { Clock, Pencil, Trash } from "lucide-react"
import React, { useState } from "react"
import DeleteCartItemModal from "../modals/delete-cart-item-modal"
import UpdateActivityItemModal from "../modals/update-activity-item-modal"
import { set } from "react-hook-form"

type T_Props = {
  item: T_Cart_Item
  selectedItems: string[]
  index: number
  toggleCheckbox: (id: string, price: number) => void
  setItemId: (value: string) => void
  setIsDeleteCartItemOpen: (value: boolean) => void
}

function ActivityItem({
  item,
  selectedItems,
  index,
  toggleCheckbox,
  setItemId,
  setIsDeleteCartItemOpen,
}: T_Props) {
  const activityItem = item.activityIds?.activityId
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  return (
    <div key={activityItem?._id} className="border rounded-xl p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <InputCheckbox
            id={item._id || index}
            colorVariant="secondary"
            checked={selectedItems.includes(item._id || "")}
            onChange={() => toggleCheckbox(item._id || "", item.price)}
          />
          <img
            src={`/assets/${activityItem?.photos![0]?.key}`}
            width={140}
            height={140}
            alt="item image"
            className="rounded-md object-cover"
          />
          <div className="flex-1">
            <Typography variant="h3" fontWeight="semibold">
              {activityItem?.title}
            </Typography>
            <Typography variant="p" className="text-text-400">
              {activityItem?.meetingPoint?.streetAddress &&
                `${activityItem?.meetingPoint?.streetAddress}, `}
              {activityItem?.meetingPoint?.barangay &&
                `${activityItem?.meetingPoint?.barangay}, `}
              {activityItem?.meetingPoint?.city &&
                `${activityItem?.meetingPoint?.city}`}
            </Typography>
            {(activityItem?.durationHour || activityItem?.durationMinute) && (
              <div className="flex gap-2 items-center justify-start">
                <div className="flex gap-1">
                  {activityItem.durationHour && (
                    <Typography variant="p" className="text-text-400">
                      {activityItem.durationHour} hour
                      {activityItem.durationHour > 1 ? "s" : ""}
                    </Typography>
                  )}
                  {activityItem.durationMinute != 0 && (
                    <Typography variant="p" className="text-text-400">
                      {activityItem.durationMinute} minute
                      {activityItem.durationMinute > 1 ? "s" : ""}
                    </Typography>
                  )}
                  <Typography variant="p" className="text-text-400">
                    duration
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end">
          <Button
            variant="link"
            className="hover:underline text-info-500 hover:cursor-pointer flex items-center"
            onClick={() => setIsUpdateModalOpen(true)}
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
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Typography variant="p" className="text-text-400">
            {item.startDate && format(item.startDate, "MMMM d, yyyy")}
          </Typography>
        </div>

        <Typography variant="p" fontWeight="semibold">
          {formatCurrency(item.price + item.guestComission)}
        </Typography>
      </div>
      {isUpdateModalOpen && (
        <UpdateActivityItemModal
          cartItem={item}
          itemTitle={activityItem?.title || "Unknown Activity"}
          itemGuestsMaxCapacity={activityItem?.slotCapacity?.maximum || 0}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ActivityItem

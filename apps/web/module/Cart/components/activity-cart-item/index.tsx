import InputCheckbox from '@/common/components/ui/InputCheckbox'
import { Typography } from '@/common/components/ui/Typography'
import formatCurrency from '@/common/helpers/formatCurrency'
import { T_Cart_Item } from '@repo/contract-2/cart'
import { format } from 'date-fns/format'
import { Clock, Pencil, Trash } from 'lucide-react'
import React from 'react'

interface ICartProps {
  item: T_Cart_Item
  selectedItems: number[]
  index: number
  toggleCheckbox: (index: number) => void
}

function ActivityCartItem({ item, selectedItems, index, toggleCheckbox }: ICartProps) {
  const activityItem = item.activityIds?.activityId
  return (
    <div key={activityItem?._id} className="border rounded-xl p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <InputCheckbox
            id={index}
            colorVariant="secondary"
            checked={selectedItems.includes(index)}
            onChange={() => toggleCheckbox(index)}
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
            <Typography variant="p" className="text-gray-500">
              {`${activityItem?.meetingPoint?.streetAddress}, `}{`${activityItem?.meetingPoint?.barangay}, `}{`${activityItem?.meetingPoint?.city}`}
            </Typography>
            {(activityItem?.durationHour || activityItem?.durationMinute) && (
              <div className="flex gap-2 items-center justify-start">
                <Clock height={18} className="text-gray-500" />
                <div className="flex gap-1">
                  {
                    activityItem.durationHour && (
                      <Typography variant="p" className="text-gray-500">
                        {activityItem.durationHour}h
                      </Typography>
                    )
                  }
                  {
                    activityItem.durationMinute != 0 && (
                      <Typography variant="p" className="text-gray-500">
                        {activityItem.durationMinute}m
                      </Typography>
                    )
                  }
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <Typography
            variant="p"
            fontWeight="semibold"
            className="hover:underline text-info-500 hover:cursor-pointer flex items-center"
          >
            <Pencil height={18} />
            Modify
          </Typography>
          <Typography
            variant="p"
            fontWeight="semibold"
            className="hover:underline text-error-500 hover:cursor-pointer mt-2 flex items-center"
          >
            <Trash height={18} />
            Remove
          </Typography>
        </div>
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Typography variant="p" className="text-gray-500">
            {format(item.startDate, "d MMM, yyyy")} - {format(item.endDate, "d MMM, yyyy")}
          </Typography>
        </div>
        
        <Typography variant="p" fontWeight="semibold">
          {formatCurrency(item.price)}
        </Typography>
      </div>
    </div>
  )
}

export default ActivityCartItem


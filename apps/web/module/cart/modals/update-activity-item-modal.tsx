import ModalContainer from "@/common/components/ModalContainer"
import React, { useEffect, useState, ChangeEvent } from "react"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Option, Select } from "@/common/components/ui/Select"
import { T_Cart_Item } from "@repo/contract-2/cart"
import toast from "react-hot-toast"
import { CartService } from "@repo/contract-2/cart"
import { useQueryClient } from "@tanstack/react-query"
import useUpdateCartItem from "../hooks/use-update-cart-item"
import { useModalStore } from "@/common/store/use-modal-store"
import { format } from "date-fns"
import Asterisk from "@/common/components/ui/Asterisk"
import useGuestsStore from "../stores/use-guests-store"
import GuestAddModal from "./guest-add-modal"
import useDateTimeStore from "@/module/Listing/activity/stores/use-date-time-store"
import { T_Activity_Slot } from "@repo/contract-2/activity"
import useCheckInOutDateStore from "../stores/use-check-in-out-date-store"

const queryKeys = CartService.getQueryKeys()

type T_Edit_Activity_Modal = {
  cartItem: T_Cart_Item
  itemTitle: string
  itemGuestsMaxCapacity: number
  isOpen: boolean
  onClose: () => void
}

export const modalKey = `update-cart-activity-item`

const UpdateActivityItemModal = ({
  cartItem,
  itemTitle,
  itemGuestsMaxCapacity,
  isOpen,
  onClose,
}: T_Edit_Activity_Modal) => {
  const queryClient = useQueryClient()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const updateAdults = useGuestsStore((state) => state.updateAdults)
  const { adults, children, infants } = useGuestsStore((state) => state.guest)
  const { modal } = useModalStore((state) => state)
  const { mutate, isPending } = useUpdateCartItem()
  const date = useDateTimeStore((state) => state.date)
  const timeSlotId = useDateTimeStore((state) => state.timeSlotId)
  const updateDate = useDateTimeStore((state) => state.updateDate)
  const updateTime = useDateTimeStore((state) => state.updateTime)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const dayOfWeek = format(date, `EEEE`).toLowerCase()
  const dateSlot =
    (cartItem?.activityIds?.activityId?.schedule as { [key: string]: any })[
      dayOfWeek
    ] || []

  const filteredTimeSlots = dateSlot?.slots?.map((slot: T_Activity_Slot) => {
    return {
      dayId: dateSlot?._id,
      timeSlotId: slot?._id,
      startTime: slot?.startTime,
      endTime: slot?.endTime,
    }
  })

  const selectedTimeSlot =
    filteredTimeSlots.find((slot: any) => slot.timeSlotId === timeSlotId) ||
    null

  const dateString = format(date, "yyyy-MM-dd")
  const guestCounts = adults + children + infants
  const handleSubmit = () => {
    if (
      !dateRange.from ||
      !dateRange.to ||
      (adults === 0 && children === 0 && infants === 0)
    ) {
      toast.error("Please complete all the fields")
    } else {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(String(data.message))
            queryClient.invalidateQueries({
              queryKey: [queryKeys.getItems],
            })
            onClose()
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }

      mutate(
        {
          itemId: String(cartItem._id),
          item: {
            startDate: dateString,
            endDate: dateString,
            guestCount: guestCounts,
            schedule: selectedTimeSlot,
            contacts: cartItem.contacts,
          },
        },
        callBackReq
      )
    }
  }

  useEffect(() => {
    if (filteredTimeSlots && filteredTimeSlots.length > 0) {
      if (
        !timeSlotId ||
        !filteredTimeSlots.some((slot: any) => slot.timeSlotId === timeSlotId)
      ) {
        updateTime(filteredTimeSlots[0].timeSlotId)
      }
    } else {
      updateTime("")
    }
  }, [date, filteredTimeSlots, timeSlotId])

  useEffect(() => {
    updateDate(new Date(cartItem.startDate))
    updateTime(cartItem.activityIds?.timeSlotId || "")
    updateAdults(cartItem.guestCount || 0)
  }, [modal])

  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        size="sm"
        title={itemTitle}
        onClose={onClose}
      >
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              id="Date"
              label="Date"
              min={format(new Date(), "yyyy-MM-dd")}
              required
              value={format(date, "yyyy-MM-dd")}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateDate(new Date(event.target.value))
              }
            />

            <Select
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                updateTime(event.target.value)
              }
              value={timeSlotId}
              disabled={!filteredTimeSlots || filteredTimeSlots?.length === 0}
              // disabled
              label={`Time slot`}
              required
            >
              {filteredTimeSlots?.map(
                (time: {
                  timeSlotId: string
                  startTime: string
                  endTime: string
                }) => (
                  <Option key={time.startTime} value={time.timeSlotId}>
                    {time.startTime} - {time.endTime}
                  </Option>
                )
              )}
            </Select>
          </div>
          <div
            className="relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() => setIsGuestsModalOpen(!isGuestsModalOpen)}
          >
            <label
              htmlFor="guests"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Guests <Asterisk />
            </label>
            <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
              {`${guestCounts} guest${guestCounts > 1 ? "s" : ""}`}
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Update
            </Button>
          </div>
        </div>
      </ModalContainer>
      <GuestAddModal
        isOpen={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
        maximumCapacity={itemGuestsMaxCapacity}
      />
    </>
  )
}

export default UpdateActivityItemModal

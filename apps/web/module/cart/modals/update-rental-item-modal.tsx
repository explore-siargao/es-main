import ModalContainer from "@/common/components/ModalContainer"
import React, { useEffect, useState } from "react"
import { Button } from "@/common/components/ui/Button"
import { T_Update_Cart, T_Cart_Item } from "@repo/contract-2/cart"
import toast from "react-hot-toast"
import { CartService } from "@repo/contract-2/cart"
import { useQueryClient } from "@tanstack/react-query"
import useUpdateCartItem from "../hooks/use-update-cart-item"
import { useModalStore } from "@/common/store/use-modal-store"
import { LucidePencil } from "lucide-react"
import { format } from "date-fns"
import Asterisk from "@/common/components/ui/Asterisk"
import combineDateTime from "@/common/helpers/combine-date-time"
import { Option, Select } from "@/common/components/ui/Select"
import usePickupDropoffStore from "../stores/use-pickup-dropoff-store"
import PickUpDropoffModal from "./pick-up-drop-off-modal"

const queryKeys = CartService.getQueryKeys()

type T_Edit_Guest_Modal = {
  cartItem: T_Cart_Item
  itemTitle: string
}

export const modalKey = `update-cart-rental-item`

const UpdateRentalItemModal = ({ cartItem, itemTitle }: T_Edit_Guest_Modal) => {
  const queryClient = useQueryClient()
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const dateRange = usePickupDropoffStore((state) => state.dateRange)
  const updateDateRange = usePickupDropoffStore(
    (state) => state.updateDateRange
  )
  const fromTime = usePickupDropoffStore((state) => state.fromTime)
  const toTime = usePickupDropoffStore((state) => state.toTime)
  const updateFromTime = usePickupDropoffStore((state) => state.updateFromTime)
  const updateToTime = usePickupDropoffStore((state) => state.updateToTime)
  const { modal, setModal } = useModalStore((state) => state)
  const { mutate, isPending } = useUpdateCartItem()

  const handleSubmit = () => {
    if (!dateRange.from || !dateRange.to || !fromTime || !toTime) {
      toast.error("Please complete all the fields")
    } else {
      const from = combineDateTime(dateRange.from!, fromTime)
      const to = combineDateTime(dateRange.to!, fromTime)
      const item: T_Update_Cart = {
        ...cartItem,
        guestCount: cartItem.guestCount || 0,
        startDate: from?.toISOString() || "",
        endDate: to?.toISOString() || "",
      }
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(String(data.message))
            queryClient.invalidateQueries({
              queryKey: [queryKeys.getItems],
            })
            setModal(null)
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate({ itemId: cartItem._id as string, item }, callBackReq)
    }
  }

  useEffect(() => {
    if (modal === modalKey) {
      updateDateRange({
        from: new Date(cartItem.startDate),
        to: new Date(cartItem.endDate),
      })
    }
  }, [modal])

  return (
    <>
      <Button
        variant="link"
        className="hover:underline text-info-500 hover:cursor-pointer flex items-center"
        onClick={() => setModal(modalKey)}
      >
        <LucidePencil height={18} />
        Modify
      </Button>
      <ModalContainer
        isOpen={modalKey === modal}
        size="sm"
        title={itemTitle}
        onClose={() => setModal(null)}
      >
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div
              className="relative rounded-xl px-3 py-1 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
              onClick={() =>
                setCheckInOutCalendarModalIsOpen(!checkInOutCalendarModalIsOpen)
              }
            >
              <label
                htmlFor="check-in"
                className="text-xs font-medium text-text-900 hover:cursor-pointer"
              >
                Check-in <Asterisk />
              </label>
              <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
                {dateRange.from
                  ? format(dateRange.from, "MM/dd/yyyy")
                  : "Add date"}
              </span>
            </div>
            <Select
              label={"Pick-up time"}
              id="testable"
              className="flex-1"
              onChange={(e) => updateFromTime(e.target.value)}
              defaultValue={fromTime}
              required
            >
              {Array.from({ length: (22 - 6) * 2 + 1 }).map((_, index) => {
                const hours = Math.floor((6 * 60 + index * 30) / 60)
                const minutes = (index * 30) % 60
                const timeString = `${hours % 12 || 12}:${minutes
                  .toString()
                  .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}` // AM/PM format
                return (
                  <Option key={timeString} value={timeString}>
                    {timeString}
                  </Option>
                )
              })}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="relative rounded-xl px-3 py-1 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
              onClick={() =>
                setCheckInOutCalendarModalIsOpen(!checkInOutCalendarModalIsOpen)
              }
            >
              <label
                htmlFor="check-in"
                className="text-xs font-medium text-text-900 hover:cursor-pointer"
              >
                Checkout <Asterisk />
              </label>
              <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
                {dateRange.to ? format(dateRange.to, "MM/dd/yyyy") : "Add date"}
              </span>
            </div>
            <Select
              label={"Drop-off time"}
              id="testable"
              className="flex-1"
              onChange={(e) => updateToTime(e.target.value)}
              defaultValue={toTime}
              required
            >
              {Array.from({ length: (22 - 6) * 2 + 1 }).map((_, index) => {
                const hours = Math.floor((6 * 60 + index * 30) / 60)
                const minutes = (index * 30) % 60
                const timeString = `${hours % 12 || 12}:${minutes
                  .toString()
                  .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}` // AM/PM format

                // Use timeString for both value and label
                return (
                  <Option key={timeString} value={timeString}>
                    {timeString}
                  </Option>
                )
              })}
            </Select>
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
      <PickUpDropoffModal
        isOpen={checkInOutCalendarModalIsOpen}
        onClose={() => setCheckInOutCalendarModalIsOpen(false)}
      />
    </>
  )
}

export default UpdateRentalItemModal

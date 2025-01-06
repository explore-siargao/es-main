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
import CheckInOutModal from "../modals/check-in-out-modal"
import Asterisk from "@/common/components/ui/Asterisk"
import useCheckInOutDateStore from "../stores/use-check-in-out-date-store"
import useGuestsStore from "../stores/use-guests-store"
import GuestAddModal from "./guest-add-modal"

const queryKeys = CartService.getQueryKeys()

type T_Edit_Guest_Modal = {
  cartItem: T_Cart_Item
  itemTitle: string
  itemGuestsMaxCapacity: number
}

export const modalKey = `update-cart-property-item`

const UpdatePropertyItemModal = ({
  cartItem,
  itemTitle,
  itemGuestsMaxCapacity,
}: T_Edit_Guest_Modal) => {
  const queryClient = useQueryClient()
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const updateAdults = useGuestsStore((state) => state.updateAdults)
  const { adults, children, infants } = useGuestsStore((state) => state.guest)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const updateDateRange = useCheckInOutDateStore(
    (state) => state.updateDateRange
  )
  const { modal, setModal } = useModalStore((state) => state)
  const { mutate, isPending } = useUpdateCartItem()

  const handleSubmit = () => {
    if (
      !dateRange.from ||
      !dateRange.to ||
      (adults === 0 && children === 0 && infants === 0)
    ) {
      toast.error("Please complete all the fields")
    } else {
      const item: T_Update_Cart = {
        ...cartItem,
        startDate: new Date(dateRange.from).toISOString(),
        endDate: new Date(dateRange.to).toISOString(),
        guestCount: adults + children + infants || 0,
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
    updateDateRange({
      from: new Date(cartItem.startDate),
      to: new Date(cartItem.endDate),
    })
    updateAdults(cartItem.guestCount || 0)
  }, [modal])

  const guestsCount = adults + children + infants

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
              {`${guestsCount} guest${guestsCount > 1 ? "s" : ""}`}
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
      <CheckInOutModal
        isOpen={checkInOutCalendarModalIsOpen}
        onClose={() => setCheckInOutCalendarModalIsOpen(false)}
      />
      <GuestAddModal
        isOpen={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
        maximumCapacity={itemGuestsMaxCapacity}
      />
    </>
  )
}

export default UpdatePropertyItemModal

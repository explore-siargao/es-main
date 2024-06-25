"use client"
import PesoSign from "@/common/components/PesoSign"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import { useState } from "react"
import useCheckInOutDateStore from "@/module/Accommodation/store/useCheckInOutDateStore"
import Asterisk from "@/common/components/ui/Asterisk"
import { format } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import useGuestAdd from "@/module/Accommodation/store/useGuestsStore"
import { APP_NAME } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"
import CheckoutBreakdownModal from "@/module/Accommodation/components/modals/CheckoutBreakdownModal"
import CheckInOutModal from "@/module/Accommodation/components/modals/CheckInOutModal"
import CheckoutMoreInfoModal from "@/module/Accommodation/components/modals/CheckoutMoreInfoModal"
import GuestAddModal from "@/module/Accommodation/components/modals/GuestAddModal"

interface ICheckout {
  id?: number
  serviceFee: number
  durationCost: number
  descTotalBeforeTaxes: number
  totalBeforeTaxes: number
  titlePrice: number
}

interface CheckoutProcessProps {
  checkoutDesc: ICheckout
}

const CheckoutBox = ({ checkoutDesc }: CheckoutProcessProps) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const totalGuest = adults + children + infants
  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {formatCurrency(checkoutDesc.titlePrice, "Philippines")}
        <small className="font-light"> person</small>
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="grid grid-cols-2 gap-3">
          <div
            className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() => setCheckInOutCalendarModalIsOpen(true)}
          >
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Date <Asterisk />
            </label>
            <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
              {dateRange.from
                ? format(dateRange.from, "MM/dd/yyyy")
                : "Add date"}
            </span>
          </div>
          <div
            className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() => setCheckInOutCalendarModalIsOpen(true)}
          >
            <label
              htmlFor="checkout"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Start time <Asterisk />
            </label>
            <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
              {dateRange.to ? format(dateRange.to, "hh:mm:ss a") : "Add time"}
            </span>
          </div>
        </div>
        <div
          className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
          onClick={() => setIsGuestsModalOpen(true)}
        >
          <label
            htmlFor="checkout"
            className="block text-xs font-medium text-text-900 hover:cursor-pointer"
          >
            Guests <Asterisk />
          </label>
          <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
            {`${totalGuest} guest${totalGuest > 1 ? "s" : ""}`}
          </span>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            router.push(`/accommodation/${params.listingId}/checkout`)
          }
        >
          Book Now
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() => setIsMoreInfoModalOpen(true)}
          >
            {APP_NAME} service fee
          </Button>
          <div>{formatCurrency(checkoutDesc.serviceFee, "Philippines")}</div>
        </div>

        <div className="border-b mt-5 mb-5"></div>
        <div className="flex justify-between font-semibold">
          <div>Total before taxes</div>
          <div>
            {formatCurrency(checkoutDesc.totalBeforeTaxes, "Philippines")}
          </div>
        </div>
      </div>
      <CheckoutBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
      />
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
      <CheckInOutModal
        isOpen={checkInOutCalendarModalIsOpen}
        onClose={() => setCheckInOutCalendarModalIsOpen(false)}
      />
      <GuestAddModal
        isOpen={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
      />
    </div>
  )
}

export default CheckoutBox

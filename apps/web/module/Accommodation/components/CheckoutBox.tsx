"use client"
import PesoSign from "@/common/components/PesoSign"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import CheckoutBreakdownModal from "./modals/CheckoutBreakdownModal"
import { useState } from "react"
import CheckoutMoreInfoModal from "./modals/CheckoutMoreInfoModal"
import CheckInOutModal from "./modals/CheckInOutModal"
import useCheckInOutDateStore from "@/module/Accommodation/store/useCheckInOutDateStore"
import Asterisk from "@/common/components/ui/Asterisk"
import { differenceInDays, format } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import GuestAddModal from "./modals/GuestAddModal"
import useGuestAdd from "@/module/Accommodation/store/useGuestsStore"
import { APP_NAME } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"

interface ICheckout {
  id?: number
  serviceFee: number
  durationCost: number
  descTotalBeforeTaxes: number
  totalBeforeTaxes: number
  titlePrice: number
  pricePerAdditionalPerson?: number
}

interface CheckoutProcessProps {
  checkoutDesc: ICheckout
  isSelectedBookableUnit?: boolean
}

const CheckoutBox = ({
  checkoutDesc,
  isSelectedBookableUnit,
}: CheckoutProcessProps) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const nights = differenceInDays(
    dateRange.to ?? new Date(),
    dateRange.from ?? new Date()
  )
  const totalGuest = adults + children + infants
  return (
    <div
      className={`border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col ${!isSelectedBookableUnit ? "opacity-70" : ""} divide-text-100 overflow-y-auto mb-5`}
    >
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {formatCurrency(checkoutDesc.titlePrice, "Philippines")}
        <small className="font-light"> night</small>
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="grid grid-cols-2 gap-3">
          <div
            className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              isSelectedBookableUnit
                ? setCheckInOutCalendarModalIsOpen(true)
                : null
            }
          >
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
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
            className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              isSelectedBookableUnit
                ? setCheckInOutCalendarModalIsOpen(true)
                : null
            }
          >
            <label
              htmlFor="checkout"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Checkout <Asterisk />
            </label>
            <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
              {dateRange.to ? format(dateRange.to, "MM/dd/yyyy") : "Add date"}
            </span>
          </div>
        </div>
        <div
          className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
          onClick={() =>
            isSelectedBookableUnit ? setIsGuestsModalOpen(true) : null
          }
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
            isSelectedBookableUnit
              ? router.push(`/accommodation/${params.listingId}/checkout`)
              : null
          }
        >
          Book Now
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() =>
              isSelectedBookableUnit ? setIsBreakdownModalOpen(true) : null
            }
          >
            <PesoSign />
            {checkoutDesc.titlePrice} x {nights}
          </Button>
          <div>
            {formatCurrency(checkoutDesc.titlePrice * nights, "Philippines")}
          </div>
        </div>

        <div className="flex justify-between items-center">
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
            {formatCurrency(
              checkoutDesc.titlePrice * nights +
                checkoutDesc.serviceFee +
                (checkoutDesc.pricePerAdditionalPerson
                  ? checkoutDesc.pricePerAdditionalPerson
                  : 0) *
                  totalGuest,
              "Philippines"
            )}
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

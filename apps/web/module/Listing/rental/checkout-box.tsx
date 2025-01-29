"use client"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/format-currency"
import { useState } from "react"
import CheckoutMoreInfoModal from "./modals/checkout-more-info-modal"
import Asterisk from "@/common/components/ui/Asterisk"
import { differenceInDays, format, subDays } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import { LucideShoppingCart } from "lucide-react"
import { T_Rental } from "@repo/contract-2/rental"
import { GUEST_COMMISSION_PERCENT } from "@repo/constants"
import PriceBreakdownModal from "./modals/price-breakdown-modal"
import usePickupDropoffStore from "./stores/use-pickup-dropoff-store"
import { Option, Select } from "@/common/components/ui/Select"
import PickUpDropoffModal from "./modals/pick-up-drop-off-modal"
import { CartService, T_Add_To_Cart } from "@repo/contract-2/cart"
import useAddToCart from "@/common/hooks/use-add-to-cart"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import combineDateTime from "@/common/helpers/combine-date-time"
import { T_Add_For_Payment } from "@repo/contract-2/for-payment-listings"
import useAddForPayment from "../hooks/use-add-for-payment"

const queryKeys = CartService.getQueryKeys()

const CheckoutBox = ({ rental }: { rental: T_Rental }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart()
  const { mutate: addForPayment, isPending: isAddForPaymentPending } =
    useAddForPayment()
  const dateRange = usePickupDropoffStore((state) => state.dateRange)
  const fromTime = usePickupDropoffStore((state) => state.fromTime)
  const toTime = usePickupDropoffStore((state) => state.toTime)
  const updateFromTime = usePickupDropoffStore((state) => state.updateFromTime)
  const updateToTime = usePickupDropoffStore((state) => state.updateToTime)
  const daysCount = differenceInDays(
    dateRange.to ?? new Date(),
    dateRange.from ?? new Date()
  )
  const dayRate = rental.pricing?.dayRate || 0
  const dayRateTotal = dayRate * daysCount || 0
  const esCommissionTotal = dayRateTotal * GUEST_COMMISSION_PERCENT || 0
  const totalBeforeTaxes = dayRateTotal + esCommissionTotal || 0

  const handleAddToCartSingleItem = () => {
    const from = combineDateTime(dateRange.from!, fromTime)
    const to = combineDateTime(dateRange.to!, fromTime)
    const payload: T_Add_To_Cart = {
      price: totalBeforeTaxes,
      rentalIds: { rentalId: rental._id, qtyIdsId: rental.qtyIds![0]?._id },
      startDate: from?.toISOString() || "",
      endDate: to?.toISOString() || "",
      guestCount: 1,
    }
    addToCart(payload, {
      onSuccess: (data) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getItems],
          })
          toast.success((data.message as string) || "Added to cart", {
            duration: 5000,
          })
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err) => {
        toast.error(String(err))
      },
    })
  }

  const handleAddForPayment = () => {
    const from = combineDateTime(dateRange.from!, fromTime)
    const to = combineDateTime(dateRange.to!, fromTime)
    const payload: T_Add_For_Payment = {
      userId: "",
      price: totalBeforeTaxes,
      rentalIds: { rentalId: rental._id, qtyIdsId: rental.qtyIds![0]?._id },
      startDate: from || new Date(),
      endDate: to || new Date(),
      guestCount: 1,
    }
    addForPayment(payload, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getItems],
          })
          router.push(`/book-now?listingId=${data?.item?._id}`)
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err) => {
        toast.error(String(err))
      },
    })
  }

  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {formatCurrency(dayRate, { noDecimals: true })}
        <small className="font-light"> per day</small>
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="flex gap-4">
          <div
            className="flex-1 relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              setCheckInOutCalendarModalIsOpen(!checkInOutCalendarModalIsOpen)
            }
          >
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Pick-up date <Asterisk />
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
        <div className="flex gap-4">
          <div
            className="flex-1 relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              setCheckInOutCalendarModalIsOpen(!checkInOutCalendarModalIsOpen)
            }
          >
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Drop-off date <Asterisk />
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
        <Button
          variant="primary"
          className="font-bold"
          disabled={
            !dateRange.from ||
            !dateRange.to ||
            !fromTime ||
            !toTime ||
            isAddToCartPending
          }
          onClick={() => handleAddForPayment()}
        >
          Book now
        </Button>
        <Button
          variant="default"
          className="font-bold"
          disabled={
            !dateRange.from ||
            !dateRange.to ||
            !fromTime ||
            !toTime ||
            isAddToCartPending
          }
          onClick={() => handleAddToCartSingleItem()}
        >
          <LucideShoppingCart size={20} className="mr-2" /> Add to cart
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() => setIsBreakdownModalOpen(true)}
          >
            {formatCurrency(dayRate)} x {daysCount} day
            {daysCount > 1 ? "s" : ""}
          </Button>
          <div>{formatCurrency(dayRateTotal)}</div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() => setIsMoreInfoModalOpen(true)}
          >
            Service fee
          </Button>
          <div>{formatCurrency(esCommissionTotal)}</div>
        </div>

        <div className="border-b mt-5 mb-5"></div>
        <div className="flex justify-between font-semibold">
          <div>Total before taxes</div>
          <div>{formatCurrency(totalBeforeTaxes)}</div>
        </div>
      </div>
      <PriceBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
        dayRate={dayRate}
        dayRateTotal={dayRateTotal}
        dateRange={dateRange}
      />
      <PickUpDropoffModal
        isOpen={checkInOutCalendarModalIsOpen}
        onClose={() => setCheckInOutCalendarModalIsOpen(false)}
      />
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
    </div>
  )
}

export default CheckoutBox

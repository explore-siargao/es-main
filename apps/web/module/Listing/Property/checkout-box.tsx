"use client"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/format-currency"
import CheckoutBreakdownModal from "./modals/price-breakdown-modal"
import { useState } from "react"
import CheckoutMoreInfoModal from "./modals/checkout-more-info-modal"
import CheckInOutModal from "./modals/check-in-out-modal"
import useCheckInOutDateStore from "@/module/Listing/property/stores/use-check-in-out-date-store"
import Asterisk from "@/common/components/ui/Asterisk"
import { useRouter } from "next/navigation"
import GuestAddModal from "./modals/guest-add-modal"
import useGuestAdd from "@/module/Listing/property/stores/use-guests-store"
import { GUEST_COMMISSION_PERCENT } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"
import { T_BookableUnitType } from "@repo/contract"
import { differenceInDays, format } from "date-fns"
import useAddToCart from "@/common/hooks/use-add-to-cart"
import { CartService, T_Add_To_Cart } from "@repo/contract-2/cart"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { LucideShoppingCart } from "lucide-react"
import { Option, Select } from "@/common/components/ui/Select"
import { T_Bookable_Unit } from "@repo/contract-2/property"
import { T_Add_For_Payment } from "@repo/contract-2/for-payment-listings"
import useAddForPayment from "../hooks/use-add-for-payment"

type T_Props = {
  units?: T_Bookable_Unit[]
  selectedUnitId: string
  propertyId: string
}

const queryKeys = CartService.getQueryKeys()

const CheckoutBox = ({ units, selectedUnitId, propertyId }: T_Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const guestsCount = adults + children + infants
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart()
  const { mutate: addForPayment, isPending: isAddForPaymentPending } =
  useAddForPayment()
  const nightCount = differenceInDays(
    dateRange.to ?? new Date(),
    dateRange.from ?? new Date()
  )
  const selectedBookableUnit = units?.find(
    (unit) => unit._id === selectedUnitId
  )
  const baseRate = selectedBookableUnit?.unitPrice?.baseRate || 0
  const baseRateGuestsTotal = baseRate * guestsCount || 0
  const baseRateNightsTotal = baseRateGuestsTotal * nightCount || 0
  const esCommissionTotal = baseRateNightsTotal * GUEST_COMMISSION_PERCENT || 0
  const totalBeforeTaxes = baseRateNightsTotal + esCommissionTotal || 0

  const handleAddToCartSingleItem = (propertyId: string) => {
    const payload: T_Add_To_Cart = {
      price: totalBeforeTaxes,
      propertyIds: { propertyId, unitId: selectedBookableUnit?.qtyIds[0]?._id },
      startDate: dateRange.from?.toISOString() || "",
      endDate: dateRange.to?.toISOString() || "",
      guestCount: guestsCount,
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

  const handleAddForPayment = (propertyId: string) => {
    const payload: T_Add_For_Payment = {
      userId: "",
      price: totalBeforeTaxes,
      propertyIds: { propertyId, unitId: selectedBookableUnit?.qtyIds[0]?._id },
      startDate: dateRange.from?.toISOString() || "",
      endDate: dateRange.to?.toISOString() || "",
      guestCount: guestsCount,
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
    <div
      className={`border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5`}
    >
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {formatCurrency(baseRate, { noDecimals: true })}
        <small className="font-light"> per night</small>
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="grid grid-cols-2 gap-3">
          <div
            className="relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              setCheckInOutCalendarModalIsOpen(!checkInOutCalendarModalIsOpen)
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
            className="relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              setCheckInOutCalendarModalIsOpen(!checkInOutCalendarModalIsOpen)
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
        <Select
          label="Available units"
          onChange={(e) => {
            if (e.target.value === "") {
              router.push(`/listings/properties/${propertyId}`, {
                scroll: false,
              })
            } else {
              router.push(
                `/listings/properties/${propertyId}/${e.target.value}`,
                { scroll: false }
              )
            }
          }}
          value={selectedBookableUnit?._id || ""}
        >
          <Option value="">Select</Option>
          {units?.map((unit: T_BookableUnitType) => {
            return <Option value={unit._id}>{unit.title}</Option>
          })}
        </Select>
        <Button
          variant="primary"
          className="font-bold"
          disabled={!selectedBookableUnit || isAddToCartPending}
          onClick={() =>
            handleAddForPayment(propertyId)}
        >
          Book now
        </Button>
        <Button
          variant="default"
          className="font-bold"
          disabled={!selectedBookableUnit || isAddToCartPending}
          onClick={() => handleAddToCartSingleItem(propertyId)}
        >
          <LucideShoppingCart size={20} className="mr-2" /> Add to cart
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() => setIsBreakdownModalOpen(!isBreakdownModalOpen)}
          >
            {formatCurrency(baseRateGuestsTotal)} x {nightCount} night
            {nightCount > 1 ? "s" : ""}
          </Button>
          <div>{formatCurrency(baseRateNightsTotal)}</div>
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
      <CheckoutBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
        baseRate={baseRateGuestsTotal}
        baseRateNightsTotal={baseRateNightsTotal}
        dateRange={dateRange}
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
        maximumCapacity={selectedBookableUnit?.unitPrice?.maximumCapacity}
      />
    </div>
  )
}

export default CheckoutBox

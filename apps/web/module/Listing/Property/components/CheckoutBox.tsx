"use client"
import PesoSign from "@/common/components/PesoSign"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import CheckoutBreakdownModal from "./modals/CheckoutBreakdownModal"
import { useState, useEffect } from "react"
import CheckoutMoreInfoModal from "./modals/CheckoutMoreInfoModal"
import CheckInOutModal from "./modals/CheckInOutModal"
import useCheckInOutDateStore from "@/module/Listing/Property/store/useCheckInOutDateStore"
import Asterisk from "@/common/components/ui/Asterisk"
import { useParams, useRouter } from "next/navigation"
import GuestAddModal from "./modals/GuestAddModal"
import useGuestAdd from "@/module/Listing/Property/store/useGuestsStore"
import { APP_NAME } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"
import { T_BookableUnitType } from "@repo/contract"
import { differenceInDays, format, eachDayOfInterval } from "date-fns"
import useAddToCart from "@/common/hooks/use-add-to-cart"
import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { LucideShoppingCart } from "lucide-react"

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
  unit?: T_BookableUnitType
}

const CheckoutBox = ({
  checkoutDesc,
  isSelectedBookableUnit,
  unit,
}: CheckoutProcessProps) => {
  const router = useRouter()
  const params = useParams<{ propertyId: string }>()
  const queryClient = useQueryClient()
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const totalGuest = adults + children + infants
  const { mutate: addToCart } = useAddToCart()
  const nights = differenceInDays(
    dateRange.to ?? new Date(),
    dateRange.from ?? new Date()
  )
  const [totalPrice, setTotalPrice] = useState(0)
  const [breakdown, setBreakdown] = useState<{ date: string; price: number }[]>(
    []
  )
  const [totalBasePrice, setTotalBasePrice] = useState<number | null>(null)
  const calculatePrice = () => {
    const nights = differenceInDays(
      dateRange.to ?? new Date(),
      dateRange.from ?? new Date()
    )
    const basePricePerGuest = checkoutDesc.titlePrice * totalGuest
    const additionalFees = checkoutDesc.serviceFee
    const additionalGuestsPrice = checkoutDesc.pricePerAdditionalPerson
      ? checkoutDesc.pricePerAdditionalPerson * totalGuest
      : 0
    const total =
      basePricePerGuest * nights + additionalFees + additionalGuestsPrice

    setTotalPrice(total)

    if (dateRange.from && dateRange.to) {
      const daysArray = eachDayOfInterval({
        start: dateRange.from,
        end: dateRange.to,
      })

      const breakdownArray = daysArray.map((date) => ({
        date: format(date, "MM/dd/yyyy"),
        price: basePricePerGuest,
      }))

      setBreakdown(breakdownArray)
    }
  }
  useEffect(() => {
    calculatePrice()
  }, [dateRange.from, dateRange.to, totalGuest, checkoutDesc])

  useEffect(() => {
    if (breakdown.length > 0) {
      const total = breakdown.reduce((acc, item) => acc + item.price, 0)
      setTotalBasePrice(total)
    }
  }, [breakdown])

  const handleAddToCartSingleItem = (propertyId: string) => {
    const payload: T_Add_To_Cart = {
      price: totalPrice,
      propertyIds: { propertyId, unitId: unit._id },
      startDate: dateRange.from?.toISOString() || "",
      endDate: dateRange.to?.toISOString() || "",
      guestCount: totalGuest,
    }
    addToCart(payload, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["get-cart-item"],
          })
          toast.success(data.message)
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    })
  }

  return (
    <div
      className={`border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col ${
        !isSelectedBookableUnit ? "opacity-70" : ""
      } divide-text-100 overflow-y-auto mb-5`}
    >
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {unit
          ? formatCurrency(unit.unitPrice.baseRate)
          : formatCurrency(checkoutDesc.titlePrice)}
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
            htmlFor="guests"
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
          className="font-bold"
          onClick={() =>
            isSelectedBookableUnit
              ? router.push(`/accommodation/${params.propertyId}/checkout`)
              : null
          }
        >
          Book Now
        </Button>
        <Button
          variant="default"
          className="font-bold"
          onClick={() => handleAddToCartSingleItem(params.propertyId)}
        >
          <LucideShoppingCart size={20} className="mr-2" /> Add to cart
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
            {unit ? unit.unitPrice.baseRate : checkoutDesc.titlePrice} x{" "}
            {totalGuest}
          </Button>
          <div>
            {formatCurrency(
              (unit ? unit.unitPrice.baseRate : checkoutDesc.titlePrice) *
                totalGuest
            )}
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
          <div>{formatCurrency(checkoutDesc.serviceFee)}</div>
        </div>

        <div className="border-b mt-5 mb-5"></div>
        <div className="flex justify-between font-semibold">
          <div>Total before taxes</div>
          <div>
            {totalBasePrice !== null
              ? formatCurrency(totalBasePrice + checkoutDesc.serviceFee)
              : "Loading..."}
          </div>
        </div>
      </div>
      <CheckoutBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
        breakdown={breakdown}
        onTotalBasePriceCalculated={(price) => {
          setTotalBasePrice(price)
        }}
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

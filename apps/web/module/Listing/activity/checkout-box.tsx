"use client"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/format-currency"
import { ChangeEvent, useState } from "react"
import { format } from "date-fns"
import { GUEST_COMMISSION_PERCENT } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"
import CheckoutMoreInfoModal from "@/module/Listing/property/modals/checkout-more-info-modal"
import { Option, Select } from "@/common/components/ui/Select"
import { Input } from "@/common/components/ui/Input"
import { LucideShoppingCart } from "lucide-react"
import useDateTimeStore from "./stores/use-date-time-store"
import { T_Activity, T_Activity_Slot } from "@repo/contract-2/activity"
import { E_Activity_Experience_Type } from "@repo/contract"
import { CartService, T_Add_To_Cart } from "@repo/contract-2/cart"
import useAddToCart from "@/common/hooks/use-add-to-cart"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import GuestAddModal from "./modals/guest-add-modal"
import Asterisk from "@/common/components/ui/Asterisk"
import { cn } from "@/common/helpers/cn"
import useGuestsStore from "./stores/use-guests-store"
import PriceBreakdownModal from "./modals/price-breakdown-modal"

type T_Checkout = {
  activity: T_Activity
}

const queryKeys = CartService.getQueryKeys()

const CheckoutBox = ({ activity }: T_Checkout) => {
  const queryClient = useQueryClient()
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const date = useDateTimeStore((state) => state.date)
  const timeSlotId = useDateTimeStore((state) => state.timeSlotId)
  const updateDate = useDateTimeStore((state) => state.updateDate)
  const updateTime = useDateTimeStore((state) => state.updateTime)
  const { adults, children, infants } = useGuestsStore((state) => state.guest)
  const guestsCount = adults + children + infants
  const slotCapacity = activity.slotCapacity
  const dayOfWeek = format(date, `EEEE`).toLowerCase()
  // @ts-expect-error
  const dateSlot = activity?.schedule[dayOfWeek] || []

  const filteredTimeSlots = dateSlot?.slots?.map((slot: T_Activity_Slot) => {
    return {
      timeSlotId: slot._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }
  })

  const priceMap = {
    [E_Activity_Experience_Type.Joiner]: activity?.pricePerPerson,
    [E_Activity_Experience_Type.Private]: activity?.pricePerSlot,
  }

  const activityPrice = priceMap[activity.experienceType]

  const baseRate = activityPrice || 0
  const baseRateGuestsTotal = baseRate * guestsCount || 0
  const esCommissionTotal = baseRateGuestsTotal * GUEST_COMMISSION_PERCENT || 0
  const totalBeforeTaxes = baseRateGuestsTotal + esCommissionTotal || 0

  const handleAddToCartSingleItem = () => {
    // this needs to be remove
    const slot = dateSlot?.slots?.find(
      (slot: T_Activity_Slot) => slot._id === timeSlotId
    )
    const slotIdsId = slot?.slotIdsId[0]._id || ""
    if (timeSlotId && slotIdsId) {
      const payload: T_Add_To_Cart = {
        price: totalBeforeTaxes,
        activityIds: {
          activityId: activity._id,
          dayId: dateSlot._id,
          timeSlotId,
          slotIdsId,
        },
        startDate: date?.toISOString() || "",
        endDate: date?.toISOString() || "",
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
    } else {
      toast.error("Please select a time slot")
    }
  }

  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold">
        From {formatCurrency(activityPrice || 0, { noDecimals: true })}
      </Typography>
      <Typography variant="h5" className="italic text-text-400 mt-2">
        This is a {E_Activity_Experience_Type.Joiner} activity.
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full mt-2">
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            id="Date"
            label="Date"
            min={format(new Date(), "yyyy-MM-dd")}
            required
            defaultValue={format(date, "yyyy-MM-dd")}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateDate(new Date(event.target.value))
            }
          />

          <Select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              updateTime(event.target.value)
            }
            defaultValue={timeSlotId}
            disabled={!filteredTimeSlots || filteredTimeSlots?.length === 0}
            label={`Time slot`}
            required
          >
            <Option key="__empty__" value="">
              {filteredTimeSlots?.length > 0 ? "Select" : "No time slot"}
            </Option>
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
          className={cn(
            "relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
          )}
          onClick={() => setIsGuestsModalOpen(!isGuestsModalOpen)}
        >
          <label
            htmlFor="guests"
            className={cn("block text-xs font-medium text-text-900")}
          >
            Guests <Asterisk />
          </label>
          <span
            className={cn(
              "block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50"
            )}
          >
            {`${guestsCount} guest${guestsCount > 1 ? "s" : ""}`}
          </span>
        </div>

        <Button
          variant="primary"
          className="font-bold"
          disabled={!date || !timeSlotId || isAddToCartPending}
        >
          Book now
        </Button>
        <Button
          variant="default"
          className="font-bold"
          disabled={!date || !timeSlotId || isAddToCartPending}
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
            {formatCurrency(baseRateGuestsTotal)} x {guestsCount} guest
            {guestsCount > 1 ? "s" : ""}
          </Button>
          <div>{formatCurrency(baseRateGuestsTotal)}</div>
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
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
      <GuestAddModal
        isOpen={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
        maximumCapacity={slotCapacity.maximum}
      />
      <PriceBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
        dayRate={baseRate}
        dayRateTotal={baseRateGuestsTotal}
        guestCount={guestsCount}
      />
    </div>
  )
}

export default CheckoutBox

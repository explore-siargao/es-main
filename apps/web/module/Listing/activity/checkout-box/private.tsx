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
import useDateTimeStore from "../stores/use-date-time-store"
import { T_Activity, T_Activity_Slot } from "@repo/contract-2/activity"
import { E_Activity_Experience_Type } from "@repo/contract"
import useAddToCart from "@/common/hooks/use-add-to-cart"
import { useQueryClient } from "@tanstack/react-query"
import { CartService, T_Add_To_Cart } from "@repo/contract-2/cart"
import toast from "react-hot-toast"

type T_Checkout = {
  activity: T_Activity
}

const queryKeys = CartService.getQueryKeys()

const CheckoutBoxPrivate = ({ activity }: T_Checkout) => {
  const queryClient = useQueryClient()
  const { mutate: addToCart, isPending: isAddToCartPending } = useAddToCart()
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const date = useDateTimeStore((state) => state.date)
  const timeSlotId = useDateTimeStore((state) => state.timeSlotId)
  const updateDate = useDateTimeStore((state) => state.updateDate)
  const updateTime = useDateTimeStore((state) => state.updateTime)
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

  const baseRate = activity?.pricePerSlot || 0
  const esCommissionTotal = baseRate * GUEST_COMMISSION_PERCENT || 0
  const totalBeforeTaxes = baseRate + esCommissionTotal || 0

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
    } else {
      toast.error("Please select a time slot")
    }
  }

  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold">
        {formatCurrency(activity?.pricePerSlot || 0)}
        <small className="font-light"> per slot</small>
      </Typography>
      <Typography variant="h6" className="italic text-text-400 mt-2">
        This is a {E_Activity_Experience_Type.Private} activity and will be
        priced per slot. Each slot can accommodate up to{" "}
        {activity.slotCapacity.maximum} people.
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full mt-4">
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
              (time: { timeSlotId: string, startTime: string; endTime: string }) => (
                <Option key={time.startTime} value={time.timeSlotId}>
                  {time.startTime} - {time.endTime}
                </Option>
              )
            )}
          </Select>
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
    </div>
  )
}

export default CheckoutBoxPrivate

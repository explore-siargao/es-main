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

const CheckoutBox = ({ rental }: { rental: T_Rental }) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const dateRange = usePickupDropoffStore((state) => state.dateRange)
  const updateDateRange = usePickupDropoffStore(
    (state) => state.updateDateRange
  )
  const daysCount = differenceInDays(
    dateRange.to ?? new Date(),
    dateRange.from ?? new Date()
  )
  const dayRate = rental.pricing?.dayRate || 0
  const dayRateTotal = dayRate * daysCount || 0
  const esCommissionTotal = dayRateTotal * GUEST_COMMISSION_PERCENT || 0
  const totalBeforeTaxes = dayRateTotal + esCommissionTotal || 0

  const generateLocalDateTime = ({ date }: { date: Date }) => {
    const now = new Date(date || "")
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {formatCurrency(dayRate)}
        <small className="font-light"> day</small>
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="grid grid-cols-1 gap-3">
          <div className="relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer">
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Pick-up date and time <Asterisk />
            </label>
            <input
              className="w-full border-transparent text-sm p-0"
              type="datetime-local"
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              max={format(
                subDays(new Date(dateRange.to || ""), 1),
                "yyyy-MM-dd'T'HH:mm"
              )}
              defaultValue={generateLocalDateTime({
                date: dateRange.from || new Date(),
              })}
              onChange={(e) =>
                updateDateRange({
                  from: new Date(e.target.value),
                  to: new Date(dateRange.to || ""),
                })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="relative rounded-xl px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer">
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Drop-off date and time <Asterisk />
            </label>
            <input
              className="w-full border-transparent text-sm p-0"
              type="datetime-local"
              min={format(new Date(dateRange.from || ""), "yyyy-MM-dd'T'HH:mm")}
              defaultValue={generateLocalDateTime({
                date: dateRange.to || new Date(),
              })}
              value={format(new Date(dateRange.to || ""), "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) =>
                updateDateRange({
                  from: dateRange.from,
                  to: new Date(e.target.value),
                })
              }
            />
          </div>
        </div>
        <Button
          variant="primary"
          className="font-bold"
          onClick={() =>
            router.push(`/accommodation/${params.listingId}/checkout`)
          }
        >
          Book now
        </Button>
        <Button
          variant="default"
          className="font-bold"
          onClick={() => console.log("add to cart")}
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
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
    </div>
  )
}

export default CheckoutBox

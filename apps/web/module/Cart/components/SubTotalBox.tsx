"use client"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import { useRouter } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import { LucideChevronDown } from "lucide-react"

interface ICheckout {
  id?: number
  serviceFee: number
  durationCost: number
  descTotalBeforeTaxes: number
  totalBeforeTaxes: number
  titlePrice: number
}

interface CheckoutProcessProps {
  subTotal: ICheckout
}

const SubTotalBox = ({ subTotal }: CheckoutProcessProps) => {
  const router = useRouter()

  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5 sticky shadow-md">
      <div className="flex gap-2 items-center hover: cursor-pointer">
        <Typography variant="p" fontWeight="semibold">
          Subtotal (2)
        </Typography>
        <LucideChevronDown />
      </div>
      <span className="text-xl font-semibold mb-4 mt-2">
        {formatCurrency(subTotal.titlePrice, "Philippines")}{" "}
        <small className="font-light">night</small>
      </span>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full"></div>
      <Button
        variant="primary"
        onClick={() => router.push(`/accommodation/1/checkout`)}
      >
        Book Now
      </Button>
      <div>
        <div className="border-b mt-5 mb-5"></div>
        <div className="flex justify-between font-semibold">
          <div>Total before taxes</div>
          <div>{formatCurrency(subTotal.totalBeforeTaxes, "Philippines")}</div>
        </div>
      </div>
    </div>
  )
}

export default SubTotalBox

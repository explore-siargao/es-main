"use client"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import { useRouter } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import { LucideChevronDown } from "lucide-react"

interface CheckoutProcessProps {
  selectedItemsPrice: number[]
}

const SubTotalBox = ({ selectedItemsPrice }: CheckoutProcessProps) => {
  const router = useRouter()
  const calculateTotalPrice = selectedItemsPrice.length > 0 ? selectedItemsPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0
  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5 sticky">
      <div className="flex gap-2 items-center hover: cursor-pointer">
        <Typography variant="p" fontWeight="semibold">
          Total ({selectedItemsPrice.length})
        </Typography>
        <LucideChevronDown />
      </div>
      <span className="text-xl font-semibold mb-4 mt-2">
        {formatCurrency(calculateTotalPrice)}
      </span>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full"></div>
      <Button
        variant="primary"
        onClick={() => router.push(`/accommodation/1/checkout`)}
      >
        Book Now
      </Button>
      {/* <div>
        <div className="border-b mt-5 mb-5"></div>
        <div className="flex justify-between font-semibold">
          <div>Total before taxes</div>
          <div>{formatCurrency(calculateTotalPrice)}</div>
        </div>
      </div> */}
    </div>
  )
}

export default SubTotalBox

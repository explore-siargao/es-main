"use client"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import { Typography } from "@/common/components/ui/Typography"

interface SubTotalBoxProps {
  selectedItemsPrice: number[]
  buttonText: string
  onButtonClick: () => void
}

const SubTotalBox = ({
  selectedItemsPrice,
  buttonText,
  onButtonClick,
}: SubTotalBoxProps) => {
  const calculateTotalPrice =
    selectedItemsPrice.length > 0
      ? selectedItemsPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      : 0

  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5 sticky">
      <div className="flex gap-2 items-center">
        <Typography variant="p" fontWeight="semibold">
          Grand total
        </Typography>
      </div>
      <span className="text-xl font-semibold mb-4 mt-2">
        {formatCurrency(calculateTotalPrice)}
      </span>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full"></div>
      <Button
        variant="primary"
        onClick={onButtonClick}
        disabled={selectedItemsPrice.length === 0}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default SubTotalBox

import formatCurrency from "@/common/helpers/format-currency"
import { Typography } from "@/common/components/ui/Typography"

interface SubTotalBoxProps {
  selectedItemsPrice: number
}

const SubTotalBox = ({
  selectedItemsPrice,
}: SubTotalBoxProps) => {

  return (
    <div className="border rounded-xl px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5 sticky">
      <div className="flex gap-2 items-center">
        <Typography variant="p" fontWeight="semibold">
          Grand total
        </Typography>
      </div>
      <span className="text-xl font-semibold mb-4 mt-2">
        {formatCurrency(selectedItemsPrice)}
      </span>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full"></div>
    </div>
  )
}

export default SubTotalBox

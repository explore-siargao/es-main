import formatCurrency from "@/common/helpers/format-currency"
import { Typography } from "@/common/components/ui/Typography"

interface SubTotalBoxProps {
  selectedItemsPrice: number
}

const SubTotalBox = ({ selectedItemsPrice }: SubTotalBoxProps) => {
  return (
    <div className="border rounded-xl px-6 py-5 flex flex-col divide-text-100 overflow-y-auto sticky">
      <div className="flex gap-2 items-center">
        <Typography variant="p" fontWeight="semibold">
          Grand total
        </Typography>
      </div>
      <span className="text-xl font-semibold my-2">
        {formatCurrency(selectedItemsPrice)}
      </span>
    </div>
  )
}

export default SubTotalBox

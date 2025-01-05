import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { sub, eachDayOfInterval, format } from "date-fns"
import formatCurrency from "@/common/helpers/format-currency"
import { DateRange } from "react-day-picker"

type T_Price_Breakdown_Modal = {
  isOpen: boolean
  onClose: () => void
  dayRate: number
  dayRateTotal: number
  guestCount: number
}

const PriceBreakdownModal = ({
  isOpen,
  onClose,
  dayRate,
  dayRateTotal,
  guestCount,
}: T_Price_Breakdown_Modal) => {
  const today = new Date()

  const breakdownArr = [...Array(guestCount)].map((_, index) => ({
    name: `Guest ${index + 1}`,
    price: dayRate,
  }))

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Basic price breakdown"
      onClose={onClose}
      size="auto"
    >
      <div className="p-5 md:w-80">
        {breakdownArr?.map((data) => (
          <div className="flex justify-between mb-4" key={data.name}>
            <Typography variant="h5">{data.name}</Typography>
            <Typography variant="h5">{formatCurrency(data.price)}</Typography>
          </div>
        ))}
        <hr />
        <div className="flex justify-between mt-4">
          <Typography variant="h5" fontWeight="bold">
            Total base price
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatCurrency(dayRateTotal)}
          </Typography>
        </div>
      </div>
    </ModalContainer>
  )
}

export default PriceBreakdownModal

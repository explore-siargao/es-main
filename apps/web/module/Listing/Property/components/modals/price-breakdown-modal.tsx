import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { sub, eachDayOfInterval, format } from "date-fns"
import formatCurrency from "@/common/helpers/format-currency"
import { DateRange } from "react-day-picker"

type T_Price_Breakdown_Modal = {
  isOpen: boolean
  onClose: () => void
  baseRate: number
  baseRateNightsTotal: number
  dateRange: DateRange
}

const PriceBreakdownModal = ({
  isOpen,
  onClose,
  baseRate,
  baseRateNightsTotal,
  dateRange,
}: T_Price_Breakdown_Modal) => {
  const today = new Date()
  const daysArr = eachDayOfInterval({
    start: dateRange.from ?? new Date(),
    end: sub(dateRange.to ?? new Date(today.setDate(today.getDate() + 5)), {
      days: 1,
    }),
  })

  const breakdownArr = daysArr.map((date) => ({
    date: format(date, "MM/dd/yyyy"),
    price: baseRate,
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
          <div className="flex justify-between mb-4" key={data.date}>
            <Typography variant="h5">{data.date}</Typography>
            <Typography variant="h5">{formatCurrency(data.price)}</Typography>
          </div>
        ))}
        <hr />
        <div className="flex justify-between mt-4">
          <Typography variant="h5" fontWeight="bold">
            Total base price
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatCurrency(baseRateNightsTotal)}
          </Typography>
        </div>
      </div>
    </ModalContainer>
  )
}

export default PriceBreakdownModal

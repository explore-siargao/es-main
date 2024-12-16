import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import formatCurrency from "@/common/helpers/format-currency"

const SummaryDateBox: React.FC = () => {
  const currentDate = new Date()
  const summaryData = [
    ["Gross earnings", "Adjustments", "Service fee", "Taxes withheld"],
    [
      formatCurrency(94800),
      formatCurrency(2000),
      formatCurrency(2000),
      formatCurrency(2000),
    ],
  ]
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 sticky top-36">
      <Typography variant="h2" fontWeight="semibold">
        Summary
      </Typography>
      <Typography variant="p" className="text-gray-400 pb-4">
        Jan 1 - {format(currentDate, "MMMM d yyyy")}
      </Typography>
      <div className="flex gap-4 justify-between pb-4">
        {summaryData.map((column) => (
          <div key={`column-${column}`} className="flex flex-col">
            {column.map((item) => (
              <Typography
                variant="p"
                fontWeight="semibold"
                key={`column-${column}-item-${item}`}
                className="pt-2 text-sm"
              >
                {item}
              </Typography>
            ))}
          </div>
        ))}
      </div>

      <div className="bottom-0 border-t flex gap-4 justify-between">
        <Typography className="pt-4" variant="p" fontWeight="semibold">
          Total
        </Typography>
        <Typography className="pt-4 text-sm" variant="p" fontWeight="semibold">
          {formatCurrency(97800)}
        </Typography>
      </div>
    </div>
  )
}

export default SummaryDateBox

import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import formatCurrency from "@/common/helpers/formatCurrency"
import { ExportReportExcel } from "./exportReportExcel"

interface YearToDateSummaryProps {
  excelData?: any
}

const YearToDateSummary: React.FC<YearToDateSummaryProps> = ({ excelData }) => {
  const currentDate = new Date()
  const summaryData = [
    ["Gross earnings", "Adjustments", "Service fee", "12% VAT"],
    [
      formatCurrency(94800, "Philippines"),
      formatCurrency(2000, "Philippines"),
      formatCurrency(2000, "Philippines"),
      formatCurrency(2000, "Philippines"),
    ],
  ]
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 sticky top-36">
      <Typography variant="h2" fontWeight="semibold">
        Year-to-date summary
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
          {formatCurrency(97800, "Philippines")}
        </Typography>
      </div>
      <div className="flex justify-center mt-4">
        <ExportReportExcel reportData={excelData} />
      </div>
    </div>
  )
}

export default YearToDateSummary

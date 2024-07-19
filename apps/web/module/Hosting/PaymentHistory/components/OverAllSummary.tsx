import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { ExportReportExcel } from "./exportReportExcel"

interface SummaryData {
  labels: string[]
  values: (string | null)[][]
  total: string | null
}

interface FilterData {
  labels: string[]
  values: (string | null)[][]
  date: string[]
}

interface OverAllSummaryProps {
  overAllSummaryData: SummaryData
  filterData?: FilterData
  excelData?: any
}

const OverAllSummary: React.FC<OverAllSummaryProps> = ({
  overAllSummaryData,
  filterData,
  excelData
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 sticky top-36">
      <Typography variant="h2" fontWeight="semibold" className="mb-2">
        Summary (
        {filterData?.date[1] !== "all" ? `${filterData?.date[1]} ` : null}
        {filterData?.date[0]})
      </Typography>
      <div className="flex flex-col">
        {filterData &&
          filterData.labels.map((header, index) => (
            <div key={header} className="flex gap-4 justify-between">
              <Typography
                variant="p"
                fontWeight="semibold"
                className="pt-2 text-sm"
              >
                {header}:
              </Typography>
              <Typography
                variant="p"
                fontWeight="semibold"
                className="pt-2 text-sm"
              >
                {filterData.values[0]?.[index]}
              </Typography>
            </div>
          ))}
      </div>
      <div className="flex flex-col">
        {overAllSummaryData.labels.map((header, index) => (
          <div key={header} className="flex gap-4 justify-between">
            <Typography
              variant="p"
              fontWeight="semibold"
              className="pt-2 text-sm"
            >
              {header}:
            </Typography>
            <Typography
              variant="p"
              fontWeight="semibold"
              className="pt-2 text-sm"
            >
              {overAllSummaryData.values[0]?.[index]}
            </Typography>
          </div>
        ))}
      </div>
      <div className="bottom-0 border-t flex gap-4 mt-4 justify-between">
        <Typography className="pt-4" variant="p" fontWeight="semibold">
          Total
        </Typography>
        <Typography className="pt-4 text-sm" variant="p" fontWeight="semibold">
          {overAllSummaryData.total}
        </Typography>
       
      </div>
      <div className="justify-center mt-4">
             <ExportReportExcel reportData={excelData} />
        </div>
    </div>
  )
}

export default OverAllSummary

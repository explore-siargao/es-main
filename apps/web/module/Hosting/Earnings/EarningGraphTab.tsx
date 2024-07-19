"use client"
import React from "react"
import EarningsThisMonth from "./EarningsThisMonth"
import EarningsUpcoming from "./EarningsUpcoming"
import EarningsPaid from "./EarningsPaid"
import { Typography } from "@/common/components/ui/Typography"
import Tabs from "@/common/components/Tabs"
import earningsTabs from "./helpers/earningsTabs"
import YearToDateSummary from "./components/YearToDateSummaryBox"
import { ExportReportExcel } from "./components/exportReportExcel"
import useGetEarningsReport from "../hooks/useGetEarningsReport"
import insightsTabs from "../Insights/helpers/insightsTabs"


const EarningGraphTab = () => {
  const { data: EarningsReport } = useGetEarningsReport()
  return (
    <div className="mt-20 mb-14">
      <Tabs tabs={insightsTabs} />
      <div className="my-4"></div>
      <Typography variant="h1" fontWeight="semibold">
        Earnings
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-14">
        <div className="lg:col-span-3">
          <div className="mt-3">
            
     
          </div>
          <div className="mt-4">
            <EarningsThisMonth />
            <EarningsUpcoming />
            <EarningsPaid />
          </div>
        </div>
        <div className="col-span-1 relative">
          <YearToDateSummary excelData={EarningsReport}/>
         
        
        </div>
      </div>
    </div>
  )
}

export default EarningGraphTab

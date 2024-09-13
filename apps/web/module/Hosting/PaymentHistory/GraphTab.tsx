"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import OverAllSummary from "./components/OverAllSummary"
import formatCurrency from "@/common/helpers/formatCurrency"
import Graph from "@/module/Hosting/PaymentHistory/Graph"
import useGetFilteredPaymentHistory from "./hooks/useGetFilteredPaymentHistory"
import useGetPaymentHistoryReport from "./hooks/useGetPaymentHistoryReport"

interface PaymentHistoryProps {
  category: string
  listing: string
  year: string
  month: string
}

const GraphTab: React.FC<PaymentHistoryProps> = ({
  category,
  listing,
  year,
  month,
}) => {
  const {
    data: filteredPaymentHistory,
    isPending: filteredPaymentHistoryIsPending,
  } = useGetFilteredPaymentHistory(category, listing, year, month)
  const { data: paymentHistoryReport } = useGetPaymentHistoryReport(
    category,
    listing
  )

  const mockData = [
    {
      name: "Cancelled",
      value:
        !filteredPaymentHistoryIsPending &&
        filteredPaymentHistory &&
        filteredPaymentHistory[0]?.cancelled,
    },
    {
      name: "Completed",
      value:
        !filteredPaymentHistoryIsPending &&
        filteredPaymentHistory &&
        filteredPaymentHistory[0]?.completed,
    },
  ]

  const filterAllData =
    filteredPaymentHistory?.map((entry) => ({
      name: entry.date,
      cancelled: entry.cancelled,
      completed: entry.completed,
    })) ?? []

  const summaryData = {
    labels: ["Completed", "Cancelled"],
    values: [
      [
        formatCurrency(
          (!filteredPaymentHistoryIsPending &&
            filteredPaymentHistory &&
            filteredPaymentHistory[0]?.completed) ||
            0,
          "Philippines"
        ),
        formatCurrency(
          (!filteredPaymentHistoryIsPending &&
            filteredPaymentHistory &&
            filteredPaymentHistory[0]?.cancelled) ||
            0,
          "Philippines"
        ),
      ],
    ],
    total: formatCurrency(
      !filteredPaymentHistoryIsPending && filteredPaymentHistory
        ? (filteredPaymentHistory[0]?.completed || 0) +
            (filteredPaymentHistory[0]?.cancelled || 0)
        : 0,
      "Philippines"
    ),
  }

  const filterData = {
    labels: ["Category", "Listing"],
    values: [[category, listing]],
    date: [year, month],
    total: formatCurrency(
      !filteredPaymentHistoryIsPending && filteredPaymentHistory
        ? (filteredPaymentHistory[0]?.completed || 0) +
            (filteredPaymentHistory[0]?.cancelled || 0)
        : 0,
      "Philippines"
    ),
  }
  return (
    <div className="mt-10 mb-14">
      <Typography variant="h1" fontWeight="semibold">
        Payment History
      </Typography>
      <Typography
        variant="p"
        className="flex justify-between items-center text-gray-500 my-2"
      >
        The Payment History component gives you a detailed view of financial
        transactions categorized by property type, listing, and specific
        timeframes. It simplifies financial analysis with clear graphs showing
        completed and cancelled payments, helping you understand performance at
        a glance. With easy-to-use filters and the ability to export detailed
        reports, you can make informed decisions and efficiently manage finances
        for your properties.
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-14">
        <div className="lg:col-span-3">
          <Graph
            graphData={month === "All" ? filterAllData : mockData}
            isFilterAll={month === "All"}
          />
        </div>
        <div className="col-span-1 relative">
          <OverAllSummary
            overAllSummaryData={summaryData}
            filterData={filterData}
            excelData={paymentHistoryReport}
          />
        </div>
      </div>
    </div>
  )
}

export default GraphTab

"use client"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import OverAllSummary from "./components/OverAllSummary"
import formatCurrency from "@/common/helpers/formatCurrency"
import Graph from "@/module/Hosting/PaymentHistory/Graph"
import useGetPaymentHistoryGraph from "./hooks/useGetPaymentHistoryGraph"
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
  const { isPending, data: overAllSummaryDataGraph } =
    useGetPaymentHistoryGraph("all")
  const {
    data: filteredPaymentHistory,
    isPending: filteredPaymentHistoryIsPending,
  } = useGetFilteredPaymentHistory(category, listing, year, month)

  const {
    data: paymentHistoryReport,
    isPending: paymentHistoryReportIsPending,
  } = useGetPaymentHistoryReport(category, listing)
  // const summaryData = {
  //   labels: ["Completed", "Cancelled"],
  //   values: [
  //     [
  //       formatCurrency(
  //         !isPending && overAllSummaryDataGraph?.item?.completed,
  //         "Philippines"
  //       ) || null,
  //       formatCurrency(
  //         !isPending && overAllSummaryDataGraph?.item?.cancelled,
  //         "Philippines"
  //       ) || null,
  //     ],
  //   ],
  //   total:
  //     formatCurrency(
  //       !isPending && overAllSummaryDataGraph?.item?.total,
  //       "Philippines"
  //     ) || null,
  // }

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
    <div className="mt-20 mb-14">
      <Typography variant="h1" fontWeight="semibold">
        Payment History
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-14">
        <div className="lg:col-span-3">
          {/* <div className="mt-3">
            <Tabs tabs={paymentHistoryTabs} />
          </div> */}
          <Graph graphData={mockData} />
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

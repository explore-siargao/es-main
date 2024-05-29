"use client"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import Tabs from "@/common/components/Tabs"
import OverAllSummary from "./components/OverAllSummary"
import formatCurrency from "@/common/helpers/formatCurrency"
import Graph from "@/module/Hosting/PaymentHistory/Graph"
import paymentHistoryTabs from "./constants/paymentHistoryTabs"
import useGetPaymentHistoryGraph from "./hooks/useGetPaymentHistoryGraph"
import useGetFilteredPaymentHistory from "./hooks/useGetFilteredPaymentHistory"
import { Option, Select } from "@/common/components/ui/Select"

const GraphTab = () => {
  const { isPending, data: overAllSummaryDataGraph } =
    useGetPaymentHistoryGraph("all")
  const [category, setCategory] = useState("Property")
  const [listing, setListing] = useState("Mountain top house")
  const {
    data: filteredPaymentHistory,
    isPending: filteredPaymentHistoryIsPending,
  } = useGetFilteredPaymentHistory(category, listing)

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
          (!isPending &&
            !filteredPaymentHistoryIsPending &&
            filteredPaymentHistory &&
            filteredPaymentHistory[0]?.cancelled) ||
            0,
          "Philippines"
        ),
        formatCurrency(
          (!isPending &&
            !filteredPaymentHistoryIsPending &&
            filteredPaymentHistory &&
            filteredPaymentHistory[0]?.completed) ||
            0,
          "Philippines"
        ),
      ],
    ],
    total: formatCurrency(
      !isPending && !filteredPaymentHistoryIsPending && filteredPaymentHistory
        ? (filteredPaymentHistory[0]?.completed || 0) +
            (filteredPaymentHistory[0]?.cancelled || 0)
        : 0,
      "Philippines"
    ),
  }

  const filterData = {
    labels: ["Category", "Listing"],
    values: [[category, listing]],

    total: formatCurrency(
      !isPending && !filteredPaymentHistoryIsPending && filteredPaymentHistory
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
      <div className="my-5 grid lg:grid-cols-6 grid-cols-2 gap-4 mb-4 border-b pb-4">
        <Select
          label="Category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <Option value={"Property"}>Property</Option>
          <Option value={"Rental"}>Rental</Option>
          <Option value={"Activity"}>Activity</Option>
        </Select>
        <Select
          label="Listing"
          required
          value={listing}
          onChange={(e) => setListing(e.target.value)}
        >
          <Option value={"Mountain top house"}>Mountain top house</Option>
          <Option value={"Word of Life"}>Word of Life</Option>
          <Option value={"Bianca Hotel"}>Bianca Hotel</Option>
        </Select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-14">
        <div className="lg:col-span-3">
          <div className="mt-3">
            <Tabs tabs={paymentHistoryTabs} />
          </div>
          <Graph graphData={mockData} />
        </div>
        <div className="col-span-1 relative">
          <OverAllSummary
            overAllSummaryData={summaryData}
            filterData={filterData}
          />
        </div>
      </div>
    </div>
  )
}

export default GraphTab

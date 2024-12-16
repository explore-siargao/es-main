"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/format-currency"
import useGetPaidEarnings from "../hooks/useGetPaidEarnings"
import Chart, { ChartType } from "./components/Chart"

const EarningsPaid = () => {
  const { data, isPending } = useGetPaidEarnings()

  const earningsPaidDescription = (
    <Typography
      variant="p"
      className="flex justify-between items-center text-gray-500 pb-4"
    >
      Stay organized and informed with a detailed graph of your paid earnings.
      Easily track and review your completed payments to maintain financial
      clarity and manage your cash flow efficiently.
    </Typography>
  )

  return (
    <div className="mt-8">
      {data?.item && data.item.months.length > 0 ? (
        <>
          <div>
            <Typography variant="h1" className="text-[30px]">
              Your paid earnings{" "}
              <span className="text-gray-400">
                {isPending
                  ? formatCurrency(0.0)
                  : formatCurrency(data.item.summary.totalEarnings)}
              </span>
            </Typography>
          </div>
          {earningsPaidDescription}
          <Chart
            width="100%"
            height={400}
            isPending={isPending}
            data={data.item.months}
            type={ChartType["this-month"]}
            earningType="monthly"
          />
        </>
      ) : (
        <>
          <Typography fontWeight="semibold" variant="h2">
            Paid
          </Typography>
          {earningsPaidDescription}
          <Typography fontWeight="semibold" variant="p">
            Payouts are sent after guests check in.{" "}
            <button className="underline">Learn how payouts work</button>
          </Typography>
        </>
      )}
    </div>
  )
}

export default EarningsPaid

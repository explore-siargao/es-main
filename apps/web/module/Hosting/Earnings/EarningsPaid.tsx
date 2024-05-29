"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/formatCurrency"
import useGetPaidEarnings from "../hooks/useGetPaidEarnings"
import Chart, { ChartType } from "./components/Chart"

const EarningsPaid = () => {
  const { data, isPending } = useGetPaidEarnings()

  return (
    <div className="mt-8">
      {data?.item && data.item.months.length > 0 ? (
        <>
          <div>
            <Typography variant="h1" className="text-[30px]">
              Your paid earnings{" "}
              <span className="text-gray-400">
                {isPending
                  ? formatCurrency(0.0, "Philippines")
                  : formatCurrency(
                      data.item.summary.totalEarnings,
                      "Philippines"
                    )}
              </span>
            </Typography>
          </div>
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
          <Typography fontWeight="semibold" variant="h2" className="pb-4">
            Paid
          </Typography>
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

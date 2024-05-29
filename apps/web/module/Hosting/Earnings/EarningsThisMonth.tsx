import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Chart, { ChartType } from "./components/Chart"
import useGetThisMonthEarnings from "../hooks/useGetThisMonthEarnings"
import formatCurrency from "@/common/helpers/formatCurrency"

const EarningsThisMonth = () => {
  const { data: thisMonth, isPending: thisMonthIsPending } =
    useGetThisMonthEarnings()
  return (
    <div>
      {thisMonth?.item && thisMonth.item.days.length > 0 ? (
        <>
          <div>
            <Typography variant="h1" className="text-[30px]">
              You&apos;ve made{" "}
              <span className="text-gray-400">
                {thisMonthIsPending
                  ? formatCurrency(0.0, "Philippines")
                  : formatCurrency(
                      thisMonth.item.summary.totalEarnings,
                      "Philippines"
                    )}
              </span>{" "}
              this month
            </Typography>
          </div>
          <Chart
            data={thisMonth.item.days}
            isPending={thisMonthIsPending}
            width="100%"
            height={400}
            type={ChartType["this-month"]}
            earningType="daily"
          />
        </>
      ) : (
        <>
          <Typography fontWeight="semibold" variant="h2" className="pb-4">
            This Month
          </Typography>
          <Typography fontWeight="semibold" variant="p">
            No this month earnings at the moment.
          </Typography>
        </>
      )}
    </div>
  )
}

export default EarningsThisMonth

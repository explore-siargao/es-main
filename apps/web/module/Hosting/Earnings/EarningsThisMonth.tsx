import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import Chart, { ChartType } from "./components/Chart"
import useGetThisMonthEarnings from "../hooks/useGetThisMonthEarnings"
import formatCurrency from "@/common/helpers/formatCurrency"

const earningsGraphDescription = (
  <Typography
    variant="p"
    className="flex justify-between items-center text-gray-500 pb-4"
  >
    Track your income performance this month with a clear and visual graph.
    Easily monitor how your earnings are progressing in real-time to stay on top
    of your financial goals.
  </Typography>
)
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
          {earningsGraphDescription}
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
          <Typography fontWeight="semibold" variant="h2">
            This Month
          </Typography>
          {earningsGraphDescription}
          <Typography fontWeight="semibold" variant="p">
            No this month earnings at the moment.
          </Typography>
        </>
      )}
    </div>
  )
}

export default EarningsThisMonth

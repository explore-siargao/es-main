import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import useGetThisMonthEarnings from "../hooks/useGetThisMonthEarnings"
import formatCurrency from "@/common/helpers/formatCurrency"
import ThisMonthChart from "./components/ThisMonthChart"

type T_Prop = {
  data?: {
    month: string
    year: string
    paid: number
    upcoming: number
  }
}

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
const EarningsThisMonth = ({ data }: T_Prop) => {
  return (
    <div>
      {data ? (
        <>
          <div>
            <Typography variant="h1" className="text-[30px]">
              You&apos;ve made{" "}
              <span className="text-gray-400">
                {formatCurrency(data.paid, "Philippines")}
              </span>{" "}
              this month
            </Typography>
          </div>
          {earningsGraphDescription}
          <div className="w-full h-[200px]">
            <ThisMonthChart data={data} />
          </div>
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

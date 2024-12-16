import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import useGetUpcomingEarnings from "../hooks/useGetUpcomingEarnings"
import { Spinner } from "@/common/components/ui/Spinner"
import formatCurrency from "@/common/helpers/format-currency"
import { format } from "date-fns"
import UpcomingChart from "./components/UpcomingChart"

type T_Prop = {
  data?:
    | {
        month: string
        year: string
        paid: number
        upcoming: number
      }
    | {
        month: string
        year: string
        paid: number
        upcoming: number
      }[]
}

const EarningsUpcoming = ({ data }: T_Prop) => {
  const { data: upcoming } = useGetUpcomingEarnings()
  const currentDate = new Date()
  const summaryData = [
    ["Gross earnings", "Adjustments", "Service fee", "Taxes withheld"],
    [
      formatCurrency(upcoming?.item?.yearToDateSummary?.gross ?? ""),
      formatCurrency(upcoming?.item?.yearToDateSummary?.adjustment ?? ""),
      formatCurrency(upcoming?.item?.yearToDateSummary?.serviceFee ?? ""),
      formatCurrency(upcoming?.item?.yearToDateSummary?.tax ?? ""),
    ],
  ]

  const earningsUpcomingDescription = (
    <Typography
      variant="p"
      className="flex justify-between items-center text-gray-500 pb-4"
    >
      Plan for the future with confidence using this graph that forecasts your
      upcoming income. Visualize expected revenue trends to make proactive
      financial decisions and manage your finances effectively.
    </Typography>
  )

  let total = 0

  if (Array.isArray(data)) {
    total = data.reduce((acc, current) => acc + current.paid, 0)
  } else if (data) {
    total = data.paid
  }

  return (
    <div className="mt-8">
      {!data || (Array.isArray(data) && data.length === 0) ? (
        <>
          <Typography fontWeight="semibold" variant="h2">
            Upcoming
          </Typography>
          {earningsUpcomingDescription}
          <Typography fontWeight="semibold" variant="p">
            No upcoming earnings at the moment.
          </Typography>
        </>
      ) : (
        <>
          <div>
            <Typography variant="h1" className="text-[30px]">
              Your upcoming earnings{" "}
              <span className="text-gray-400">{formatCurrency(total)}</span>
            </Typography>
          </div>
          {earningsUpcomingDescription}
          <div className="w-full h-[400px]">
            <UpcomingChart data={Array.isArray(data) ? data : [data]} />
          </div>
        </>
      )}
    </div>
  )
}

export default EarningsUpcoming

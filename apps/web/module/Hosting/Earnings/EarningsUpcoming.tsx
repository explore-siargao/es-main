import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import useGetUpcomingEarnings from "../hooks/useGetUpcomingEarnings"
import { Spinner } from "@/common/components/ui/Spinner"
import formatCurrency from "@/common/helpers/formatCurrency"
import { format } from "date-fns"
import UpcomingChart from "./components/UpcomingChart"

type T_Prop = {
  data?: {
    month: string
    year: string
    completed: number
    upcoming: number
  }[]
}

const EarningsUpcoming = ({ data }: T_Prop) => {
  const { data: upcoming, isPending: upcomingIsPending } =
    useGetUpcomingEarnings()
  const currentDate = new Date()
  const summaryData = [
    ["Gross earnings", "Adjustments", "Service fee", "Taxes withheld"],
    [
      formatCurrency(
        upcoming?.item?.yearToDateSummary?.gross ?? "",
        "Philippines"
      ),
      formatCurrency(
        upcoming?.item?.yearToDateSummary?.adjustment ?? "",
        "Philippines"
      ),
      formatCurrency(
        upcoming?.item?.yearToDateSummary?.serviceFee ?? "",
        "Philippines"
      ),
      formatCurrency(
        upcoming?.item?.yearToDateSummary?.tax ?? "",
        "Philippines"
      ),
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

  return (
    <div className="mt-8">
      {/* {upcoming?.item && upcoming.item.months.length > 0 ? (
        <>
          <div>
            <Typography variant="h1" className="text-[30px]">
              Your upcoming earnings{" "}
              <span className="text-gray-400">
                {upcomingIsPending
                  ? formatCurrency(0.0, "Philippines")
                  : formatCurrency(
                      upcoming.item.summary.totalEarnings,
                      "Philippines"
                    )}
              </span>
            </Typography>
          </div>
          {earningsUpcomingDescription}
          <Chart
            data={upcoming.item.months}
            isPending={upcomingIsPending}
            width="100%"
            height={400}
            type={ChartType.upcoming}
            earningType="monthly"
          />
        </>
      ) : (
        <>
          <Typography fontWeight="semibold" variant="h2">
            Upcoming
          </Typography>
          {earningsUpcomingDescription}
          <Typography fontWeight="semibold" variant="p">
            No upcoming earnings at the moment.
          </Typography>
        </>
      )} */}
      <Typography fontWeight="semibold" variant="h2">
        Your upcoming and paid earnings
      </Typography>
      {earningsUpcomingDescription}
      <div className="w-full h-[400px]">
        <UpcomingChart data={data} />
      </div>
    </div>
  )
}

export default EarningsUpcoming

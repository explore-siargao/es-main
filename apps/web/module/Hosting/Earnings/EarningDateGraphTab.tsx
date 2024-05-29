"use client"
import { useParams } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import formatCurrency from "@/common/helpers/formatCurrency"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import Chart, { ChartType } from "./components/Chart"
import Tabs from "@/common/components/Tabs"
import { LucideChevronLeft } from "lucide-react"
import useGetMonthYearEarnings from "../hooks/useGetMonthYearEarnings"
import Link from "next/link"
import earningsDateTabs from "./helpers/earningsDateTabs"
import SummaryDateBox from "./components/SummaryDateBox"

const months = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}

const EarningDateGraphTab = () => {
  const { date } = useParams<{ date: string }>()
  const [monthName, year] = date.toLowerCase().split("-")

  let dateObject = ""

  // @ts-expect-error
  const month = months[monthName]
  if (month !== undefined) {
    // @ts-expect-error
    dateObject = new Date(year, month)
  }

  const { data: thisMonth, isPending: thisMonthIsPending } =
    useGetMonthYearEarnings(date)

  return (
    <div className="lg:gap-14 mt-20 md:mt-20 mb-14">
      <div className="flex">
        <Link href="/hosting/earnings/graph">
          <LucideChevronLeft className="text-text-300 hover:text-text-500 transition" />
        </Link>
      </div>
      <Typography variant="h1" fontWeight="semibold" className="mt-4">
        Earnings for {format(new Date(dateObject), "MMMM yyyy")}
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="mt-3">
            <Tabs
              tabs={earningsDateTabs(monthName as string, year as string)}
            ></Tabs>
          </div>
          {thisMonth?.item && thisMonth.item.days.length > 0 ? (
            <Chart
              data={thisMonth.item.days}
              isPending={thisMonthIsPending}
              width="100%"
              height={400}
              type={ChartType["this-month"]}
              earningType="daily"
            />
          ) : (
            <>
              <Typography fontWeight="semibold" variant="p" className="mt-2">
                No earnings at the moment.
              </Typography>
            </>
          )}
        </div>
        <div className="col-span-1 relative">
          <SummaryDateBox />
        </div>
      </div>
    </div>
  )
}

export default EarningDateGraphTab

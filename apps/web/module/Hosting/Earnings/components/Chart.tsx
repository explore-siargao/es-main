import React from "react"
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import formatCurrency from "@/common/helpers/formatCurrency"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface YearToDateSummary {
  gross: number
  adjustment: number
  serviceFee: number
  tax: number
  total: number
}

interface Amount {
  id: number
  earning: number
  date: string
}

export enum ChartType {
  "upcoming",
  "paid",
  "this-month",
}
interface Earnings {
  amount: Amount[]
  yearToDateSummary: YearToDateSummary
  earningsCount: number
  total: number
}

interface ChartProps {
  data: Amount[]
  isPending: boolean
  width: string | number
  height: number
  type: ChartType
  earningType: "daily" | "monthly" | "yearly"
}

const Chart = ({
  width,
  height,
  data,
  isPending,
  type,
  earningType,
}: ChartProps) => {
  let title = ""
  let options = {}
  switch (type) {
    case ChartType.upcoming:
      title = "Your upcoming earnings"
      options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }
      break
    case ChartType.paid:
      title = "Your paid earnings"
      options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
      break
    case ChartType["this-month"]:
      title = "You've made"
      options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }
      break
    default:
      title = "Earnings"
  }
  const router = useRouter()

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={isPending ? undefined : data}
        margin={{
          top: 40,
          left: 10,
        }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="date"
          tickFormatter={(value: string) => {
            let newDate
            if (earningType === "yearly") {
              newDate = format(new Date(value), "yyyy")
            } else if (earningType === "monthly") {
              newDate = format(new Date(value), "MMM yyyy")
            } else {
              newDate = format(new Date(value), "d")
            }
            return newDate
          }}
        />
        <YAxis
          dataKey={"earning"}
          tickFormatter={(value: number) =>
            formatCurrency(value, "Philippines")
          }
        />
        <Tooltip
          formatter={(value: number) => formatCurrency(value, "Philippines")}
          labelFormatter={(value: string) => {
            let newDate
            if (earningType === "yearly") {
              newDate = format(new Date(value), "yyyy")
            } else if (earningType === "monthly") {
              newDate = format(new Date(value), "MMM yyyy")
            } else {
              newDate = format(new Date(value), "MMMM d, yyyy")
            }
            return newDate
          }}
        />
        <Bar
          dataKey="earning"
          fill="#9FC7C7"
          activeBar={<Rectangle fill="#8BB3B3" />}
          onClick={(value: any) => {
            let earningType

            switch (type) {
              case ChartType.upcoming:
                earningType = "monthly"
                break
              case ChartType.paid:
                earningType = "monthly"
                break
              case ChartType["this-month"]:
                earningType = "daily"
                break
              default:
                earningType = ""
            }

            const selectedMonth = format(
              new Date(value.date),
              "MMMM"
            ).toLowerCase()
            const selectedDay = format(new Date(value.date), "d")
            const selectedYear = format(new Date(value.date), "yyyy")

            router.push(
              `/hosting/earnings/${selectedMonth}-${selectedYear}/graph`
            )
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart

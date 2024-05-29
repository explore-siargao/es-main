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

export enum ChartType {
  "upcoming",
  "paid",
  "this-month",
}

interface ChartProps {
  data: MonthData[]
  isPending: boolean
  width: string | number
  height: number
  type: ChartType
  earningType: "daily" | "monthly" | "yearly"
}

interface MonthData {
  date: string
  count: number
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
        {earningType === "daily" ? (
          <>
            {" "}
            <XAxis
              dataKey="date"
              interval={0}
              domain={[1, 31]}
              tickCount={31}
              tickFormatter={(value) => {
                return value
              }}
            />
            <YAxis
              dataKey={"count"}
              tickFormatter={(value: number) => String(value)}
            />
          </>
        ) : earningType === "monthly" ? (
          <>
            <XAxis
              dataKey="date"
              tickFormatter={(value: string) => {
                return value
              }}
            />
            <YAxis
              dataKey="count"
              tickFormatter={(value: number) => String(value)}
            />
          </>
        ) : null}

        <Tooltip
          formatter={(value: number) => String(value)}
          labelFormatter={(value: string) => {
            if (earningType === "monthly") {
              return value
            } else {
              return value
            }
          }}
        />
        <Bar
          dataKey="count"
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

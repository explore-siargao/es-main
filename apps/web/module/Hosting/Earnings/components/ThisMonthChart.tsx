import formatCurrency from "@/common/helpers/format-currency"
import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type T_Prop = {
  data?: {
    month: string
    year: string
    paid: number
    upcoming: number
  }
}

const ThisMonthChart = ({ data }: T_Prop) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={[data]} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickFormatter={(value: number) => formatCurrency(value)}
        />
        <YAxis type="category" dataKey="month" />
        <Tooltip
          cursor={{ fill: "#F3F4F6" }}
          formatter={(value: number) => formatCurrency(value)}
        />
        <Bar dataKey="upcoming" fill="#C4E5E6" />
        <Bar dataKey="paid" fill="#8DBFC0" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ThisMonthChart

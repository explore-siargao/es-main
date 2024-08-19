import formatCurrency from "@/common/helpers/formatCurrency"
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
    completed: number
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
          tickFormatter={(value: number) =>
            formatCurrency(value, "Philippines")
          }
        />
        <YAxis type="category" dataKey="month" />
        <Tooltip
          formatter={(value: number) => formatCurrency(value, "Philippines")}
        />
        <Bar dataKey="upcoming" fill="#B2DADA" />
        <Bar dataKey="completed" fill="#008489" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ThisMonthChart

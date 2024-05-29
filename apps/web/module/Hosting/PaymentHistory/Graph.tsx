"use client"
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

interface Data {
  name: string
  value: string | number | null | undefined | false
}

interface GraphProps {
  graphData: Data[]
}

const Graph: React.FC<GraphProps> = ({ graphData }) => {
  //const { data: graphData, isPending } = useGetPaymentHistoryGraph("all")
  // const data = [
  //   { name: "Cancelled", value: !isPending && graphData?.item?.cancelled },
  //   { name: "Completed", value: !isPending && graphData?.item?.completed },
  // ]

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={graphData}
          margin={{
            top: 40,
            left: 10,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value: number) =>
              formatCurrency(value, "Philippines")
            }
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value, "Philippines")}
          />
          <Bar
            dataKey="value"
            fill="#9FC7C7"
            activeBar={<Rectangle fill="#8BB3B3" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default Graph

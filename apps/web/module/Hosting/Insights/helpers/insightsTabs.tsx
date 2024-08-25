import { AreaChart, LucideHandCoins } from "lucide-react"

const insightsTabs = [
  {
    name: "General",
    icon: <AreaChart className="w-5" />,
    link: "/hosting/insights/general",
  },
  {
    name: "Earnings",
    icon: <LucideHandCoins className="w-5" />,
    link: "/hosting/insights/earnings",
  },
]

export default insightsTabs

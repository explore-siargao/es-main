import { LucideBarChart, LucideTable } from "lucide-react"

const earningsDateTabs = (monthName: string, year: string) => [
  {
    name: "Graph",
    icon: <LucideBarChart />,
    link: `/hosting/earnings/${monthName}-${year}/graph`,
  },
  {
    name: "Table",
    icon: <LucideTable />,
    link: `/hosting/earnings/${monthName}-${year}/table`,
  },
]

export default earningsDateTabs

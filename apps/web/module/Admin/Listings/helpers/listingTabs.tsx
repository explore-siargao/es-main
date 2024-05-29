import {
  LucideCheckCheck,
  LucideCircleOff,
  LucideFileCheck2,
} from "lucide-react"

const listingTabs = [
  {
    name: "Live",
    icon: <LucideCheckCheck className="w-5" />,
    link: "/admin/listings/live",
  },
  {
    name: "For Review",
    icon: <LucideFileCheck2 className="w-5" />,
    link: "/admin/listings/for-review",
  },
  {
    name: "Declined",
    icon: <LucideCircleOff className="w-5" />,
    link: "/admin/listings/declined",
  },
]

export default listingTabs

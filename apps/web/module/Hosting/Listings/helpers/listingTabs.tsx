import { LucideBuilding2, LucideCarFront, LucidePalmtree } from "lucide-react"

const listingTabs = [
  {
    name: "Properties",
    icon: <LucideBuilding2 className="w-5" />,
    link: "/hosting/listings/properties",
  },
  {
    name: "Rentals",
    icon: <LucideCarFront className="w-5" />,
    link: "/hosting/listings/rentals",
  },
  {
    name: "Activities",
    icon: <LucidePalmtree className="w-5" />,
    link: "/hosting/listings/activities",
  },
]

export default listingTabs

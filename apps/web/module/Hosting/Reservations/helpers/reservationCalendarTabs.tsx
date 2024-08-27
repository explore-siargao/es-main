import {
  DoorOpen,
  LucideBuilding2,
  LucideCarFront,
  LucidePalmtree,
} from "lucide-react"

const reservationCalendarTabs = [
  {
    name: "Properties",
    icon: <LucideBuilding2 className="w-5" />,
    link: "/hosting/reservations/calendar/properties/rooms",
  },
  {
    name: "Rentals",
    icon: <LucideCarFront className="w-5" />,
    link: "/hosting/reservations/calendar/rentals/bicycles",
  },
  {
    name: "Activities",
    icon: <LucidePalmtree className="w-5" />,
    link: "/hosting/reservations/calendar/activities",
  },
]

export default reservationCalendarTabs

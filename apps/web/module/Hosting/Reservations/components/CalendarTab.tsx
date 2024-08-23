import Tabs from "@/common/components/Tabs"
import { LucideBuilding2, LucideCarFront, LucidePalmtree } from "lucide-react"

const tabs = [
  {
    name: "Whole Place",
    link: "/hosting/reservations/calendar/properties/rooms",
  },
  {
    name: "Room",
    link: "/hosting/reservations/calendar/rentals/bicycles",
  },
  {
    name: "Activities",
    link: "/hosting/reservations/calendar/activities",
  },
]

const CalendarTab = () => {
  return (
    <>
      <Tabs tabs={tabs} />
    </>
  )
}

export default CalendarTab

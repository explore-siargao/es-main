import Tabs from "@/common/components/Tabs"
import { usePathname } from "next/navigation"

const CalendarTab = () => {
  const pathName = usePathname()
  const routeNames = pathName.split("/")
  const pathType = routeNames[4]

  let tabs

  const propertyTabs = [
    {
      name: "Whole Places",
      link: "/hosting/reservations/calendar/properties/whole-places",
    },
    {
      name: "Rooms",
      link: "/hosting/reservations/calendar/properties/rooms",
    },
    {
      name: "Beds",
      link: "/hosting/reservations/calendar/properties/beds",
    },
  ]

  const rentalTabs = [
    {
      name: "Bicycles",
      link: "/hosting/reservations/calendar/rentals/bicycles",
    },
    {
      name: "Motorcycles",
      link: "/hosting/reservations/calendar/rentals/motorcycles",
    },
    {
      name: "Cars",
      link: "/hosting/reservations/calendar/rentals/cars",
    },
  ]

  if (pathType === "properties") {
    tabs = propertyTabs
  } else if (pathType === "rentals") {
    tabs = rentalTabs
  }

  return <>{pathType === "activities" ? <></> : <Tabs tabs={tabs ?? []} />}</>
}

export default CalendarTab

import Tabs from "@/common/components/Tabs"
import { usePathname } from "next/navigation"
import useGetRentalCounts from "../Calendar/hooks/useGetRentalCounts"

const CalendarTab = () => {
  const pathName = usePathname()
  const routeNames = pathName.split("/")
  const pathType = routeNames[4]

  const { data: rentalCountsData, isPending: rentalCountsPending } =
    useGetRentalCounts()

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

  const rentalTabs = []

  if (rentalCountsData && !rentalCountsPending) {
    if (rentalCountsData?.item?.bicycles > 0) {
      rentalTabs.push({
        name: "Bicycles",
        link: "/hosting/reservations/calendar/rentals/bicycles",
      })
    }
    if (rentalCountsData?.item?.motorbikes > 0) {
      rentalTabs.push({
        name: "Motorcycles",
        link: "/hosting/reservations/calendar/rentals/motorcycles",
      })
    }
    if (rentalCountsData?.item?.cars > 0) {
      rentalTabs.push({
        name: "Cars",
        link: "/hosting/reservations/calendar/rentals/cars",
      })
    }
  }

  if (pathType === "properties") {
    tabs = propertyTabs
  } else if (pathType === "rentals") {
    tabs = rentalTabs
  }

  return (
    <>
      {pathType === "activities" ? (
        <></>
      ) : (
        // @ts-ignore
        tabs.length > 0 && <Tabs tabs={tabs} />
      )}
    </>
  )
}

export default CalendarTab

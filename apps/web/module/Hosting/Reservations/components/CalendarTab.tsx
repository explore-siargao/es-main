import Tabs from "@/common/components/Tabs"
import { usePathname } from "next/navigation"
import useGetRentalCounts from "../Calendar/hooks/useGetRentalCounts"
import { LINK_HOME } from "@/common/constants"

const CalendarTab = () => {
  const pathName = usePathname()
  const routeNames = pathName.split(LINK_HOME)
  const pathType = routeNames[4]

  const { data: rentalCountsData, isPending: rentalCountsPending } =
    useGetRentalCounts()

  const rentalTabs = []

  if (rentalCountsData && !rentalCountsPending) {
    if (rentalCountsData?.item?.cars > 0) {
      rentalTabs.push({
        name: "Cars",
        link: "/hosting/reservations/calendar/rentals/cars",
      })
    }
    if (rentalCountsData?.item?.motorbikes > 0) {
      rentalTabs.push({
        name: "Motorcycles",
        link: "/hosting/reservations/calendar/rentals/motorcycles",
      })
    }
    if (rentalCountsData?.item?.bicycles > 0) {
      rentalTabs.push({
        name: "Bicycles",
        link: "/hosting/reservations/calendar/rentals/bicycles",
      })
    }
  }

  return (
    <>
      {pathType === "rentals" ? (
        // @ts-ignore
        tabs?.length > 0 && <Tabs tabs={rentalTabs} hoverColor="dark-gray" />
      ) : (
        <></>
      )}
    </>
  )
}

export default CalendarTab

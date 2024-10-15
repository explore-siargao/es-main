import Tabs from "@/common/components/Tabs"
import { usePathname } from "next/navigation"
import useGetRentalCounts from "../Calendar/hooks/useGetRentalCounts"
import { LINK_HOME } from "@/common/constants"
import useGetActivityCounts from "../Calendar/activity/hooks/use-get-activity-counts"

const CalendarTab = () => {
  const pathName = usePathname()
  const routeNames = pathName.split(LINK_HOME)
  const pathType = routeNames[4]

  const { data: rentalCountsData, isPending: rentalCountsPending } =
    useGetRentalCounts()

  const { data: activityCountsData, isPending: activityCountsPending } =
    useGetActivityCounts()

  const rentalTabs = []
  const activityTabs = []

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

  if (activityCountsData && !activityCountsPending) {
    if (activityCountsData?.item?.private > 0) {
      activityTabs.push({
        name: "Private",
        link: "/hosting/reservations/calendar/activities/private",
      })
    }
    if (activityCountsData?.item?.joiner > 0) {
      activityTabs.push({
        name: "Joiners",
        link: "/hosting/reservations/calendar/activities/joiner",
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

      {pathType === "activities" ? (
        // @ts-ignore
        tabs?.length > 0 && <Tabs tabs={activityTabs} hoverColor="dark-gray" />
      ) : (
        <></>
      )}
    </>
  )
}

export default CalendarTab

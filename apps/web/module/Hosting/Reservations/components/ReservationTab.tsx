import { LucideBuilding2, LucideCarFront, LucidePalmtree } from "lucide-react"
import useGetRentalCounts from "../Calendar/hooks/useGetRentalCounts"
import Tabs from "@/common/components/Tabs"

const ReservationTab = () => {
  const { data: rentalCountsData, isPending: rentalCountsPending } =
    useGetRentalCounts()

  let rentalLink

  if (rentalCountsData && !rentalCountsPending) {
    if (
      rentalCountsData?.item?.cars === 0 &&
      rentalCountsData?.item?.motorbikes === 0 &&
      rentalCountsData?.item?.bicycles > 0
    ) {
      rentalLink = "bicycles"
    } else if (
      rentalCountsData?.item?.cars === 0 &&
      rentalCountsData?.item?.motorbikes > 0
    ) {
      rentalLink = "motorcycles"
    } else {
      rentalLink = "cars"
    }
  }

  const tabs = [
    {
      name: "Properties",
      icon: <LucideBuilding2 className="w-5" />,
      link: "/hosting/reservations/calendar/properties",
    },
    {
      name: "Rentals",
      icon: <LucideCarFront className="w-5" />,
      link: `/hosting/reservations/calendar/rentals/${rentalLink}`,
    },
    {
      name: "Activities",
      icon: <LucidePalmtree className="w-5" />,
      link: "/hosting/reservations/calendar/activities",
    },
  ]

  return <Tabs tabs={tabs} />
}

export default ReservationTab

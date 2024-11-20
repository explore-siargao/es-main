import { LucideBuilding2, LucideCarFront, LucidePalmtree } from "lucide-react"
import Tabs from "@/common/components/Tabs"
import { E_Activity_Experience_Type } from "@repo/contract/build/Activities/enum"
import pluralize from "pluralize"
import { E_Rental_Category } from "@repo/contract"

const ReservationTab = ({
  activityTab = E_Activity_Experience_Type.Private,
  rentalTab = E_Rental_Category.Car
}: {
  activityTab?: E_Activity_Experience_Type,
  rentalTab?: E_Rental_Category
}) => {

  const tabs = [
    {
      name: "Properties",
      icon: <LucideBuilding2 className="w-5" />,
      link: "/hosting/reservations/calendar/properties",
    },
    {
      name: "Rentals",
      icon: <LucideCarFront className="w-5" />,
      link: `/hosting/reservations/calendar/rentals/${pluralize(rentalTab.toLocaleLowerCase())}`,
    },
    {
      name: "Activities",
      icon: <LucidePalmtree className="w-5" />,
      link: `/hosting/reservations/calendar/activities/${pluralize(activityTab.toLocaleLowerCase())}`,
    },
  ]

  return <Tabs tabs={tabs} />
}

export default ReservationTab

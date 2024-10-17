import { useState } from "react"
import Tabs from "@/common/components/Tabs"
import { useCalendarStore } from "../stores/use-private-store"
import Move from "../../components/controls/move"
import FilterDate from "../../components/controls/buttons/filter-date"
import SearchReservation from "../../components/controls/buttons/search-reservation"
import AddReservation from "../../components/controls/buttons/add-reservation"
import FilterDateModal from "../../modals/filter-date-modal"
import SearchActivityModal from "../../modals/search-activity-modal"
import AddReservationModal from "./modals/add-reservation-modal"
import { QK_CALENDAR_BIKE_RENTALS } from "../constants"
import { E_Activity_Experience_Type } from "@repo/contract/build/Activities/enum"
import useGetRentalCounts from "../hooks/use-get-rental-counts"
import { E_Rental_Category } from "@repo/contract"


const Controls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const {
    startDate,
    filterCalendarDate,
    searchString,
    isAddReservationModalOpen,
    setStartDate,
    setFilterCalendarDate,
    setSearchString,
    setIsAddReservationModalOpen,
  } = useCalendarStore((state) => state)

  const { data: rentalCountsData, isPending: rentalCountsPending } =
    useGetRentalCounts()

  const rentalTabs = []

  if (rentalCountsData && !rentalCountsPending) {
    if (rentalCountsData?.item?.cars > 0) {
      rentalTabs.push({
        name: E_Rental_Category.Car,
        link: "/hosting/reservations/calendar/rentals/cars",
      })
    }

    if (rentalCountsData?.item?.motorbikes > 0) {
      rentalTabs.push({
        name: E_Rental_Category.Motorbike,
        link: "/hosting/reservations/calendar/rentals/motorcycles",
      })
    }
    if (rentalCountsData?.item?.bicycles > 0) {
      rentalTabs.push({
        name: E_Rental_Category.Bicycle,
        link: "/hosting/reservations/calendar/rentals/bicycles",
      })
    }
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-2 items-center w-1/2">
        <FilterDate
          setIsModalOpen={setIsModalOpen}
          filterCalendarDate={filterCalendarDate}
          setFilterCalendarDate={setFilterCalendarDate}
          setStartDate={setStartDate}
        />
        <SearchReservation
          setIsSearchModalOpen={setIsSearchModalOpen}
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <AddReservation
          setIsAddReservationModalOpen={setIsAddReservationModalOpen}
        />
      </div>
      <Move
        className="mt-4"
        filterCalendarDate={filterCalendarDate}
        setStartDate={setStartDate}
        startDate={startDate}
        setFilterCalendarDate={setFilterCalendarDate}
        queryKey={QK_CALENDAR_BIKE_RENTALS}
      />
      <div className="normal-case">
        <Tabs tabs={rentalTabs} hoverColor="dark-gray" />
      </div>
      <FilterDateModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFilterCalendarDate={setFilterCalendarDate}
        setStartDate={setStartDate}
      />
      <SearchActivityModal
        isModalOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        setSearchString={setSearchString}
      />
      <AddReservationModal
        isModalOpen={isAddReservationModalOpen}
        onClose={() => setIsAddReservationModalOpen(false)}
      />
    </div>
  )
}

export default Controls

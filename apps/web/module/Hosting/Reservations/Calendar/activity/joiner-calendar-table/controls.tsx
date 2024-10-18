import { useState } from "react"
import Tabs from "@/common/components/Tabs"
import { useCalendarStore } from "../stores/use-joiner-store"
import Move from "../../components/controls/move"
import FilterDate from "../../components/controls/buttons/filter-date"
import SearchReservation from "../../components/controls/buttons/search-reservation"
import AddReservation from "../../components/controls/buttons/add-reservation"
import FilterDateModal from "../../modals/filter-date-modal"
import SearchActivityModal from "../../modals/search-activity-modal"
import AddActivityReservationModal from "./modals/add-reservation-modal"
import useGetActivityCounts from "../hooks/use-get-activity-counts"
import { QK_CALENDAR_PRIVATE_ACTIVITIES } from "../constants"
import { E_Activity_Experience_Type } from "@repo/contract/build/Activities/enum"

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

  const { data: activityCountsData, isPending: activityCountsPending } =
    useGetActivityCounts()

  const activityTabs = []

  if (activityCountsData && !activityCountsPending) {
    if (activityCountsData?.item?.private > 0) {
      activityTabs.push({
        name: E_Activity_Experience_Type.Private,
        link: "/hosting/reservations/calendar/activities/private",
      })
    }
    if (activityCountsData?.item?.joiner > 0) {
      activityTabs.push({
        name: E_Activity_Experience_Type.Joiner,
        link: "/hosting/reservations/calendar/activities/joiner",
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
        queryKey={QK_CALENDAR_PRIVATE_ACTIVITIES}
      />
      <div className="normal-case">
        <Tabs tabs={activityTabs} hoverColor="dark-gray" />
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
        inputDescription="Enter activity name you want to search"
        inputLabel="Enter activity name or keyword"
        inputPlaceholder="e.g., Mon 12:00 AM - 1:00 AM"
      />
      <AddActivityReservationModal
        isModalOpen={isAddReservationModalOpen}
        onClose={() => setIsAddReservationModalOpen(false)}
      />
    </div>
  )
}

export default Controls

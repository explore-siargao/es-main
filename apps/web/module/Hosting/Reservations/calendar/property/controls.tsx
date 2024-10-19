import { Button } from "@/common/components/ui/Button"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import FilterDate from "../components/controls/buttons/filter-date"
import FilterDateModal from "../modals/filter-date-modal"
import AddReservationModal from "./modals/add-reservation-modal"
import SearchActivityModal from "../modals/search-activity-modal"
import { useCalendarStore } from "./stores/use-calendar-store"
import { addDays, parse } from "date-fns"
import { useQueryClient } from "@tanstack/react-query"
import SearchReservation from "../components/controls/buttons/search-reservation"
import AddReservation from "../components/controls/buttons/add-reservation"
import Move from "../components/controls/move"
import { QK_CALENDAR_PROPERTIES } from "./constants"

const Controls = () => {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const {
    startDate,
    filterCalendarDate,
    searchString,
    setStartDate,
    setFilterCalendarDate,
    setSearchString,
    setIsAddReservationModalOpen,
  } = useCalendarStore((state) => state)

  const resetToToday = () => {
    if (filterCalendarDate !== "") {
      const parsedDate = parse(filterCalendarDate, "yyyy-MM-dd", new Date())
      setStartDate(addDays(parsedDate, -4))
    } else {
      setStartDate(addDays(new Date(), -4))
    }
  }

  const adjustStartDate = (direction: number) => {
    setStartDate(addDays(startDate, direction))
    queryClient.invalidateQueries({
      queryKey: ["calendar-property"],
    })
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
        queryKey={QK_CALENDAR_PROPERTIES}
      />
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
        inputDescription="Enter unit name you want to search"
        inputLabel="Enter unit name or keyword"
        inputPlaceholder="e.g., Liwana Siargao Suites"
      />
      <AddReservationModal />
    </div>
  )
}

export default Controls

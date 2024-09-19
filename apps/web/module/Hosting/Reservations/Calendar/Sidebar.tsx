import { Button } from "@/common/components/ui/Button"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  Plus,
  Search,
  X,
} from "lucide-react"
import { useState } from "react"
import CalendarTab from "../components/CalendarTab"
import MonthYearSelectorModal from "./SidebarActionModals/MonthYearSelectorModal"

type SideBarProps = {
  nextPrevFunction: Function
  openAddReservationModal: Function
  filterCalendarDate?: string
  setFilterCalendarDate?: (filter: string) => void
}

const Sidebar = ({
  nextPrevFunction,
  openAddReservationModal,
  filterCalendarDate,
  setFilterCalendarDate,
}: SideBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center w-full">
        <Button size={"sm"} variant={"default"} className="rounded-full w-full">
          <LayoutList className="w-5" />
        </Button>
        {!filterCalendarDate ? (
          <Button
            size={"sm"}
            variant={"default"}
            className="rounded-full w-full"
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar className="w-5" />
          </Button>
        ) : (
          <Button
            size={"sm"}
            variant={"default"}
            className="rounded-full w-full"
            onClick={() => setFilterCalendarDate && setFilterCalendarDate("")}
          >
            <X className="w-5" />
          </Button>
        )}
        {/* <Button size={"sm"} variant={"default"} className="rounded-full w-full" onClick={() => setIsModalOpen(true)}>
          <Calendar className="w-5" />
        </Button> */}
        <Button size={"sm"} variant={"default"} className="rounded-full w-full">
          <Search className="w-5" />
        </Button>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="rounded-full w-full"
          onClick={() => openAddReservationModal()}
        >
          <Plus className="w-5" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          onClick={() => nextPrevFunction(-1)}
          className="py-2 px-4 rounded w-max rounded-l-full"
        >
          <ChevronLeft />
        </Button>
        <Button variant={"outline"} className="py-2 px-4 rounded-none w-full">
          TODAY
        </Button>
        <Button
          variant={"outline"}
          onClick={() => nextPrevFunction(1)}
          className="py-2 px-4 rounded w-max rounded-r-full"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="normal-case">
        <CalendarTab />
      </div>
      <MonthYearSelectorModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filterCalendarDate={filterCalendarDate}
        setFilterCalendarDate={setFilterCalendarDate}
      />
    </div>
  )
}

export default Sidebar

import { Button } from "@/common/components/ui/Button"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  Plus,
  Search,
} from "lucide-react"
import { useState } from "react"
import CalendarTab from "../components/CalendarTab"

type SideBarProps = {
  nextPrevFunction: Function
  openAddReservationModal: Function
}

const Sidebar = ({
  nextPrevFunction,
  openAddReservationModal,
}: SideBarProps) => {
  const [isShowAllRoomTypes, setIsShowAllRoomTypes] = useState(false)

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center w-full">
        <Button size={"sm"} variant={"default"} className="rounded-full w-full">
          <LayoutList className="w-5" />
        </Button>
        <Button size={"sm"} variant={"default"} className="rounded-full w-full">
          <Calendar className="w-5" />
        </Button>
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
    </div>
  )
}

export default Sidebar

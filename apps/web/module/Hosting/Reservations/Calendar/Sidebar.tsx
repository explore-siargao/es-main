import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  Plus,
  Search,
} from "lucide-react"
import { useState } from "react"

type SideBarProps = {
  nextPrevFunction: Function
}

const Sidebar = ({ nextPrevFunction }: SideBarProps) => {
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
        >
          <Plus className="w-5" />
        </Button>
      </div>
      <div className="mb-4 flex gap-2">
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
      <div>
        <Button
          variant={"link"}
          onClick={() => setIsShowAllRoomTypes(!isShowAllRoomTypes)}
          className="px-0"
        >
          {isShowAllRoomTypes ? <ChevronRight /> : <ChevronDown />}
          All Room Types
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

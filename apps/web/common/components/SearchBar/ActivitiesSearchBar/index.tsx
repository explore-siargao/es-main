import React from "react"
// import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { format } from "date-fns"

function ActivitiesSearchBar() {
  const { register } = useFormContext()
  const dateToday = format(new Date(), "yyyy-MM-dd")

  return (
    <div className="flex gap-2 w-full justify-between items-center rounded-full pr-3 border bg-white border-gray-300 mb-4">
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Date"}
        {...register("date")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8 mx-5" />
      <Input
        type="number"
        className="w-[40rem] 4xl:w-[43rem] ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Number of Guest/s"}
        placeholder="1"
        defaultValue={"1"}
        {...register("numberOfGuest")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8 mr-6" />
      <Button
        variant={"primary"}
        className="h-full px-4 py-3 justify-center items-center rounded-full gap-x-2"
      >
        <Search className="text-white h-5 w-5" />
        Search
      </Button>
    </div>
  )
}

export default ActivitiesSearchBar

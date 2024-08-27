import React from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"

function ActivitiesSearchBar() {
  const { register } = useFormContext()

  return (
    <div className="flex gap-2 w-full justify-between items-center rounded-xl items-center py-2 pl-2 pr-[19px] border bg-white border-gray-300 mb-4">
      <div className="flex items-center">
        <Input
          type="date"
          className="w-full rounded-l-full ring-0 bg-inherit focus-within:ring-0"
          label={"Date"}
          {...register("date")}
        />
        <Separator orientation="vertical" className="bg-gray-300 h-8 mx-5" />
        <Input
          type="number"
          className="rounded-r-full ring-0 bg-inherit focus-within:ring-0"
          label={"Number of Guest/s"}
          placeholder="1"
          defaultValue={"1"}
          {...register("numberOfGuest")}
        />
      </div>
      {/* <div className="h-full p-4 bg-primary-500 justify-center items-center rounded-full">
        <Search className="text-white" />
      </div> */}
      <div className="flex items-center">
        <Separator orientation="vertical" className="bg-gray-300 h-8 mr-6" />
        <Button
          variant={"primary"}
          className="h-full px-4 py-3 justify-center items-center rounded-xl gap-x-2"
        >
          <Search className="text-white h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  )
}

export default ActivitiesSearchBar

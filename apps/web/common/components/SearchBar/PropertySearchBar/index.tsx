import React, { useEffect } from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { Separator } from "../../ui/Separator"
import { format } from "date-fns"

function PropertySearchBar() {
  const { register, watch, setValue } = useFormContext()
  const dateToday = format(new Date(), "yyyy-MM-dd")
  const siargaoLocations = [
    "General Luna",
    "Dapa",
    "Del Carmen",
    "San Isidro",
    "Pilar",
    "San Benito",
    "Burgos",
    "Santa Monica",
    "Socorro",
  ]

  useEffect(() => {
    setValue("checkOut", "")
  }, [watch("checkIn")])

  return (
    <div className="flex w-full justify-between rounded-full items-center pr-3 border bg-white border-gray-300 mb-4">
      <Select
        className="w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-4 rounded-full transition"
        label={"Location"}
        {...register("location")}
        id="testable"
      >
        <Option value="">Select Location</Option>
        {siargaoLocations.map((loc) => (
          <Option key={loc} value={loc}>
            {loc}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Check in"}
        {...register("checkIn")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Check out"}
        {...register("checkOut")}
        disabled={!watch("checkIn")}
        min={watch("checkIn")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="number"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Number of Guest/s"}
        placeholder="1"
        defaultValue={"1"}
        {...register("numberOfGuest")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
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

export default PropertySearchBar

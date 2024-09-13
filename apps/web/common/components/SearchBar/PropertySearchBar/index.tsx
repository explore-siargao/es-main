import React from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { Separator } from "../../ui/Separator"

function PropertySearchBar() {
  const { register } = useFormContext()
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

  return (
    <div className="flex gap-2 w-full justify-between rounded-full items-center py-1 pl-4 pr-3 border bg-white border-gray-300 mb-4">
      <Select
        className="w-64 w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Location"}
        {...register("search")}
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
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Check in"}
        {...register("checkIn")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Check out"}
        {...register("checkOut")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="number"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Number of Guest/s"}
        placeholder="1"
        defaultValue={"1"}
        {...register("numberOfGuest")}
      />
      {/* <div className="h-full p-4 bg-primary-500 justify-center items-center rounded-full">
        <Search className="text-white" />
      </div> */}
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

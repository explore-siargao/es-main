import React from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"

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
    <div className="flex gap-2 rounded-xl items-center py-2 px-2 border bg-primary-100 border-primary-300 mb-4">
      <Select
        className="w-64 ring-0 bg-inherit rounded-xl focus-within:ring-0 bg-white flex-1 border-2 border-solid border-primary-100 focus-within:border-2 focus-within:border-primary-500 hover:bg-gray-200"
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
      {/* <Separator orientation="vertical" className="bg-gray-300 h-8" /> */}
      <Input
        type="date"
        className="w-full ring-0 bg-inherit rounded-xl focus-within:ring-0 bg-white flex-1 border-2 border-solid border-primary-100 focus-within:border-2 focus-within:border-primary-500 hover:bg-gray-200"
        label={"Check in"}
        {...register("checkIn")}
      />
      {/* <Separator orientation="vertical" className="bg-gray-300 h-8" /> */}
      <Input
        type="date"
        className="w-full ring-0 bg-inherit rounded-xl focus-within:ring-0 bg-white flex-1 border-2 border-solid border-primary-100 focus-within:border-2 focus-within:border-primary-500 hover:bg-gray-200"
        label={"Check out"}
        {...register("checkOut")}
      />
      {/* <Separator orientation="vertical" className="bg-gray-300 h-8" /> */}
      <Input
        type="number"
        className="ring-0 bg-inherit rounded-xl focus-within:ring-0 bg-white flex-1 border-2 border-solid border-primary-100 focus-within:border-2 focus-within:border-primary-500 hover:bg-gray-200"
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
        className="h-[3.3rem] justify-center items-center gap-x-2 mr-[0.4rem] rounded-xl"
      >
        <Search className="text-white h-5 w-5" />
        Search
      </Button>
    </div>
  )
}

export default PropertySearchBar

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from "react"
import data from "../data.json"
import { Button } from "@/common/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

function GuideBlogHeader() {
  return (
    <div className="w-full h-max p-4 bg-primary-200 flex flex-col gap-2">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-7 w-7 text-primary-500"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="w-full sm:h-16 border-none focus:ring-0 rounded-md bg-white py-1.5 pl-12 pr-3 text-gray-900 placeholder:text-gray-400 sm:text-lg sm:leading-6"
          placeholder="Search"
          type="search"
        />
      </div>
      <div className="flex divide-x-2 w-full bg-white rounded-md py-2">
        <div className="font-semibold w-max shrink-0 px-4 my-auto">
          NEARBY SURF SPOTS
        </div>
        <div className="w-full px-2 flex justify-between my-auto">
          <div className="flex justify-between w-full">
            {data.surfSpots.map((spot, index) => (
              <Button variant={"link"} key={index}>
                {spot}
              </Button>
            ))}
          </div>
          <div className="flex my-auto px-4">
            <Button className="px-0 hover:text-gray-500" variant={"ghost"}>
              <ChevronLeft />
            </Button>
            <Button className="px-0 hover:text-gray-500" variant={"ghost"}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideBlogHeader

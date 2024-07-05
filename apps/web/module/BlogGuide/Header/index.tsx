import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from "react"
import data from "../data.json"
import { Button } from "@/common/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

function GuideBlogHeader() {
  return (
    <div className="w-full h-max border mt-1 rounded-lg">
      <div className="flex divide-x-2 w-full bg-white rounded-md py-2">
        <div className="font-semibold w-max shrink-0 px-4 my-auto">
          NEARBY RESTAURANTS
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

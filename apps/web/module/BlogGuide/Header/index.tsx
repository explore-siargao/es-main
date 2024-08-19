"use client"
import React from "react"
import data from "../data.json"
import { Button } from "@/common/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { usePathname } from "next/navigation"

function GuideBlogHeader({
  contentWidth,
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
}) {
  const pathName = usePathname()
  const category = pathName.split("/")[2]

  return (
    <WidthWrapper
      width={contentWidth}
      className="border-b border-b-gray-200/50"
    >
      <div className="w-full h-max">
        <div className="flex justify-between w-full py-2">
          <div className="font-semibold w-max shrink-0 pr-4 my-auto border-r">
            NEARBY{" "}
            {category === "siargao"
              ? "RESTAURANTS"
              : category === "travel"
                ? "LOCATIONS"
                : category === "surf"
                  ? "SURFS"
                  : ""}
          </div>
          <div className="px-2 flex justify-between my-auto overflow-hidden">
            <div className="flex justify-between ">
              {data.surfSpots.map((spot, index) => (
                <Button variant={"link"} key={index}>
                  {spot}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex pl-4">
            <Button className="px-0 hover:text-gray-500" variant={"ghost"}>
              <ChevronLeft />
            </Button>
            <Button className="px-0 hover:text-gray-500" variant={"ghost"}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </WidthWrapper>
  )
}

export default GuideBlogHeader

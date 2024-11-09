import React from "react"
import { Button } from "../ui/Button"
import { cn } from "@/common/helpers/cn"
import {
  LINK_SEARCH_ACTIVITIES,
  LINK_SEARCH_PROPERTY,
  LINK_SEARCH_RENTAL,
} from "@/common/constants"

const CATEGORIES_BUTTONS = [
  { name: "Places to stay", path: LINK_SEARCH_PROPERTY },
  { name: "Activities", path: LINK_SEARCH_ACTIVITIES },
  { name: "Rentals", path: LINK_SEARCH_RENTAL },
]

const NavigationByState = ({
  pathCategory: currCategory,
  setPathCategory,
  isDark = false,
}: {
  pathCategory: string
  setPathCategory: (pathCategory: string) => void
  isDark?: boolean
}) => {
  return (
    <>
      {CATEGORIES_BUTTONS.map(({ name, path }) => (
        <Button
          key={name}
          variant="link"
          size="sm"
          onClick={() => setPathCategory(path)}
          className={cn(
            `${currCategory?.includes(path) ? "font-bold underline underline-offset-4" : ""} ${isDark ? "text-white" : "text-text-950"} hover:text-secondary-500 transition px-0 text-md`
          )}
        >
          {name}
        </Button>
      ))}
    </>
  )
}

export default NavigationByState

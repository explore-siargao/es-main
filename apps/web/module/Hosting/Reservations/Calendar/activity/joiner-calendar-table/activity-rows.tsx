import React from "react"
import {
  format,
  addDays,
} from "date-fns"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useCalendarStore } from "../stores/use-joiner-store"
import ActivityTimeSlotRows from "./activity-time-slot-rows"
import { T_Calendar_Joiner_Activity, T_Joiner_Activity } from "@repo/contract"

const ActivityRows = () => {
  const {
    startDate,
    daysPerPage,
    collapsed,
    activityData,
    setCollapsed,
  } = useCalendarStore((state) => state)
  const toggleCollapse = (category: string) => {
    setCollapsed({ ...collapsed, [category]: !collapsed[category] })
  }

  return (
    <>
      {activityData.map((activity: T_Calendar_Joiner_Activity, index) => (
        <React.Fragment key={activity.name}>
          <tr
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => toggleCollapse(activity.name)}
          >
            <td
              className={`border p-4 text-left font-bold border-l-0`}
            >
              <span className="flex gap-2 items-center">
                {collapsed[activity.name] ? (
                  <ChevronRight />
                ) : (
                  <ChevronDown />
                )}
                {activity.name}
              </span>
            </td>
            {[...Array(daysPerPage)].map((_, i) => {
              const today = new Date()
              const date = format(
                addDays(startDate, i),
                "yyyy-MM-dd"
              )
              const isToday =
                format(date, "yyyy-MM-dd") ===
                format(today, "yyyy-MM-dd")
              return (
                <td
                  key={i}
                  className={`border gap-1 text-sm p-2 h-max text-center text-gray-500 bg-gray-100 font-semibold max-w-24 ${i + 1 === daysPerPage && "border-r-0"} ${isToday && "bg-primary-100"}`}
                >
                  <div
                    className="flex flex-col"
                  >
                  </div>
                </td>
              )
            })}
          </tr>
          <ActivityTimeSlotRows
            activity={activity}
            activityIndex={index}
          />
        </React.Fragment>
      ))}
    </>
  )
}

export default ActivityRows

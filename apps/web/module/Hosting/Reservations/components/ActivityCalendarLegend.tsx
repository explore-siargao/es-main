import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import { Button } from "@/common/components/ui/Button"
import ActivityLegendModal from "./ActivityLegendModal"
import { activityLegends } from "../helpers/activity-legends"

const ActivityCalendarLegend = () => {
  const [legendModalOpen, setLegendModalOpen] = useState(false)

  const date = new Date()

  return (
    <div className="flex items-center bg-white p-1 rounded-lg">
      <Button
        variant="link"
        className="text-base text-blue-600 hover:text-blue-600"
        onClick={() => setLegendModalOpen(true)}
      >
        Expand Legends
      </Button>
      <button
        className="flex items-center justify-end space-x-4 cursor-pointer"
        onClick={() => setLegendModalOpen(true)}
      >
        {activityLegends.map((item) => (
          <div className="flex items-center space-x-1.5" key={item.legend}>
            <div className={`${item.color} h-4 w-4`} />
            <Typography>{item.legend}</Typography>
          </div>
        ))}
      </button>

      <ActivityLegendModal
        isOpen={legendModalOpen}
        onClose={() => setLegendModalOpen(false)}
        date={date}
      />
    </div>
  )
}

export default ActivityCalendarLegend

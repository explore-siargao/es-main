import { Typography } from "@/common/components/ui/Typography"
import LegendModal from "./LegendModal"
import { legends } from "../helpers/legends"
import { useState } from "react"

const CalendarLegend = () => {
  const [legendModalOpen, setLegendModalOpen] = useState(false)
  return (
    <>
      <div
        className="flex items-center justify-end space-x-4 bg-white p-1 cursor-pointer"
        onClick={() => setLegendModalOpen(true)}
      >
        {legends.map((item) => (
          <div className="flex items-center space-x-1.5" key={item.legend}>
            <div className={`${item.color} h-4 w-4`} />
            <Typography>{item.legend}</Typography>
          </div>
        ))}
      </div>
      <LegendModal
        isOpen={legendModalOpen}
        onClose={() => setLegendModalOpen(false)}
      />
    </>
  )
}

export default CalendarLegend

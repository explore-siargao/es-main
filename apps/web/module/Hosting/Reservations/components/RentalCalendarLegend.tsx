import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import { Button } from "@/common/components/ui/Button"
import { rentallegends } from "../helpers/rentallegends"
import RentalLegendModal from "./RentalLegendModal"

const RentalCalendarLegend = () => {
  const [legendModalOpen, setLegendModalOpen] = useState(false)

  const date = new Date()

  return (
    <div className="flex items-center bg-white p-1">
      <Button
        variant="link"
        className="text-base text-blue-600 hover:text-blue-600"
        onClick={() => setLegendModalOpen(true)}
      >
        Expand Legends
      </Button>
      <button
        role="button"
        className="flex items-center justify-end space-x-4 cursor-pointer"
        onClick={() => setLegendModalOpen(true)}
      >
        {rentallegends.map((item) => (
          <div className="flex items-center space-x-1.5" key={item.legend}>
            <div className={`${item.color} h-4 w-4`} />
            <Typography>{item.legend}</Typography>
          </div>
        ))}
      </button>
      <RentalLegendModal
        isOpen={legendModalOpen}
        onClose={() => setLegendModalOpen(false)}
        date={date}
      />
    </div>
  )
}

export default RentalCalendarLegend

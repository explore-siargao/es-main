import { Typography } from "@/common/components/ui/Typography"
import { TitleSection } from "@/module/Listing/title-section"
import { Clock } from "lucide-react"

const Duration = ({
  durationHour,
  durationMinute,
}: {
  durationHour: number | null
  durationMinute: number | null
}) => {
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        Activity duration
      </Typography>
      <div className="mb-5"></div>
      <div className="flex gap-2 w-full items-center">
        <Clock className="text-primary-700" />
        {durationHour && durationMinute
          ? `${durationHour} hours and ${durationMinute} minutes`
          : `${durationHour} hours`}
      </div>
    </div>
  )
}

export default Duration

import { TitleSection } from "@/module/Accommodation/components/TitleSection"
import { Clock } from "lucide-react"

const Duration = ({
  durationHour,
  durationMinute,
}: {
  durationHour: number | null
  durationMinute: number | null
}) => {
  return (
    <>
      <TitleSection size="lg" title="Activity Duration">
        <div className="mb-5"></div>
        <div className="flex gap-2 w-full items-center">
          <Clock className="text-primary-700" />
          {durationHour && durationMinute
            ? `${durationHour} hours and ${durationMinute} minutes`
            : `${durationHour} hours`}
        </div>
      </TitleSection>
    </>
  )
}

export default Duration

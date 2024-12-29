import { Typography } from "@/common/components/ui/Typography"
import { TitleSection } from "@/module/Listing/title-section"
import { Check } from "lucide-react"

const Highlights = ({ highlights }: { highlights: string[] }) => {
  return (
    <>
      <Typography variant="h3" fontWeight="semibold">
        Highlights
      </Typography>
      <div className="mb-5"></div>
      <div className="flex flex-col gap-4 w-full">
        {highlights?.map((highlight) => (
          <div className="flex gap-2">
            <Check className="text-primary-700 shrink-0" />
            {highlight}
          </div>
        ))}
      </div>
    </>
  )
}

export default Highlights

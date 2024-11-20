import { TitleSection } from "@/module/Listing/Property/components/TitleSection"
import { Check } from "lucide-react"

const Highlights = ({ highlights }: { highlights: string[] }) => {
  return (
    <>
      <TitleSection size="lg" title="Highlights">
        <div className="mb-5"></div>
        <div className="flex flex-col gap-4 w-full">
          {highlights?.map((highlight) => (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              {highlight}
            </div>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default Highlights

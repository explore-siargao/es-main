import { TitleSection } from "@/module/Listing/title-section"
import { LanguagesIcon } from "lucide-react"

const Languages = ({ languages }: { languages: string[] }) => {
  return (
    <>
      <TitleSection size="lg" title="Languages">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {languages?.map((item) => (
            <div className="flex gap-2">
              <LanguagesIcon className="text-primary-700 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default Languages

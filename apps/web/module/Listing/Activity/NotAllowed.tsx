
import { TitleSection } from "@/module/Accommodation/components/TitleSection"
import { Dot } from "lucide-react"

const NotAllowed = ({ notAllowed }: { notAllowed: string[] }) => {
  return (
    <>
      <TitleSection size="lg" title="Not allowed">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {notAllowed.map((item) => (
            <div className="flex gap-2">
              <Dot className="text-primary-700 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default NotAllowed

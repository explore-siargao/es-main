import { TitleSection } from "@/module/Listing/Property/components/TitleSection"
import { Check } from "lucide-react"

const WhatToBrings = ({ whatToBrings }: { whatToBrings: string[] }) => {
  return (
    <>
      <TitleSection size="lg" title="What to bring">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {whatToBrings.map((item) => (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default WhatToBrings

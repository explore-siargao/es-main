
import { useState } from "react"
import { TitleSection } from "@/module/Listing/Rental/components/TitleSection"
import { DollarSign } from "lucide-react"
import { T_PriceLevelProps } from "../types/PriceLevel"

const PriceLevel = ({ priceLevel }: T_PriceLevelProps) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)
  return (
    <>
      <TitleSection size="lg" title="Price Levels">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2">
          {priceLevel.map((item, index) => (
            <div  key={index} className="flex items-center mb-5 gap-5">
              <div className="flex">
                {Array.from({ length: item.level }, (_, i) => (
                  <DollarSign width={16} key={i} />
                ))}
              </div>
              <div className="flex">
                {item.product}
              </div>
            </div>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default PriceLevel

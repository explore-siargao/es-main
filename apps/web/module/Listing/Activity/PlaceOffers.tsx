
import { TitleSection } from "@/module/Accommodation/components/TitleSection"
import { useState } from "react"
import { Button } from "@/common/components/ui/Button"
import { Check } from "lucide-react"
import InclusionsModal from "../components/modals/InclusionsModal"

const PlaceOffers = (
  { 
    isFoodIncluded, 
    isNonAlcoholicDrinkIncluded, 
    isAlcoholicDrinkIncluded, 
    otherInclusion,
    notIncluded
  }: 
  {
    isFoodIncluded: boolean, 
    isNonAlcoholicDrinkIncluded: boolean, 
    isAlcoholicDrinkIncluded: boolean, 
    otherInclusion: string[],
    notIncluded: string[]
  }
) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)
  const grouped = [
    {
      title: "Not Included",
      offers: notIncluded
    }
  ]
  return (
    <>
      <TitleSection size="lg" title="Inclusions">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2 gap-4 w-full">
          { 
            isFoodIncluded && 
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              Food
            </div>
          }
          { 
            isNonAlcoholicDrinkIncluded && 
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              Non-alcoholic Drinks
            </div>
          }
          { 
            isAlcoholicDrinkIncluded && 
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              Non-alcoholic Drinks
            </div>
          }
          
          {otherInclusion.map((item) => (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <Button
          className="mt-5"
          variant="outline"
          onClick={() => setShowMoreModalOpen(!showMoreModalOpen)}
        >
          Show other inclusions
        </Button>
      </TitleSection>
      <InclusionsModal
        isOpen={showMoreModalOpen}
        onClose={() => setShowMoreModalOpen(!showMoreModalOpen)}
        group={grouped}
      />
    </>
  )
}

export default PlaceOffers

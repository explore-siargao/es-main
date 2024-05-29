import IconDescription from "./IconDescription"
import { Button } from "@/common/components/ui/Button"
import { TitleSection } from "./TitleSection"
import PlaceOfferModal from "../../Listing/components/modals/PlaceOfferModal"
import { useState } from "react"
import { T_PlaceOfferProps } from "../types/PlaceOffer"

const PlaceOffers = ({ offers, group }: T_PlaceOfferProps) => {
  const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)
  return (
    <>
      <TitleSection size="lg" title="What this place offers">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2">
          {offers.map((item) => (
            <IconDescription {...item} />
          ))}
        </div>
        <Button
          className="mt-5"
          variant="outline"
          onClick={() => setShowMoreModalOpen(!showMoreModalOpen)}
        >
          Show all 8 amenities
        </Button>
      </TitleSection>
      <PlaceOfferModal
        isOpen={showMoreModalOpen}
        onClose={() => setShowMoreModalOpen(!showMoreModalOpen)}
        group={group}
      />
    </>
  )
}

export default PlaceOffers

import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import { TitleSection } from "../../../Accommodation/components/TitleSection"
import IconDescription from "../../../Accommodation/components/IconDescription"
import { T_OfferModal } from "../../../Accommodation/types/PlaceOffer"

interface PlaceOfferModalProps {
  isOpen: boolean
  onClose: () => void
  group: T_OfferModal[]
}

const PlaceOfferModal = ({ isOpen, onClose, group }: PlaceOfferModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="md">
      <div className="px-7 py-6 md:h-[700px] md:overflow-y-auto">
        <TitleSection title="What this place offers">
          {group.map((item) => (
            <div className="py-2" key={item.title}>
              <TitleSection title={item.title}>
                {item.offers.map((offer) => (
                  <div className="pt-4 pb-0 border-b" key={offer.icon}>
                    <IconDescription {...offer} />
                  </div>
                ))}
              </TitleSection>
            </div>
          ))}
        </TitleSection>
      </div>
    </ModalContainer>
  )
}

export default PlaceOfferModal

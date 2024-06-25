import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import { TitleSection } from "../../../Accommodation/components/TitleSection"
import { T_OfferModal } from "../../types/PlaceOffer"
import { Check, Dot, X } from "lucide-react"

interface InclusionModalProps {
  isOpen: boolean
  onClose: () => void
  group: T_OfferModal[]
}

const InclusionsModal = ({ isOpen, onClose, group }: InclusionModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="md">
      <div className="px-7 py-6 md:h-[700px] md:overflow-y-auto">
        <TitleSection title="Other inclusion information">
          {group.map((item) => (
            <div className="py-2" key={item.title}>
              {item.offers.length > 0 && (
                <TitleSection title={item.title}>
                  <div className="flex flex-col">
                    {item.offers.map((offer) => (
                      <div className="py-4 border-b flex gap-2">
                        {item.title === "Not Included" ? (
                          <X className=" text-error-500" />
                        ) : (
                          <Check className="text-primary-500" />
                        )}
                        {offer}
                      </div>
                    ))}
                  </div>
                </TitleSection>
              )}
            </div>
          ))}
        </TitleSection>
      </div>
    </ModalContainer>
  )
}

export default InclusionsModal

import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import { TitleSection } from "../../title-section"
import IconDescription from "../../icon-description"
import { iconMap } from "@/common/helpers/iconMap"
import { T_Offer, T_OfferModal } from "../../property/types/PlaceOffer"

interface PlaceOfferModalProps {
  isOpen: boolean
  onClose: () => void
  group?: T_OfferModal[]
}

const PlaceOfferModal: React.FC<PlaceOfferModalProps> = ({
  isOpen,
  onClose,
  group,
}) => {
  const groupByCategory = (offers: T_Offer[]) => {
    const grouped: { [key: string]: T_Offer[] } = {}

    offers.forEach((offer) => {
      const category = offer.category

      if (grouped[category as string]) {
        grouped[category as string]?.push(offer)
      } else {
        grouped[category as string] = [offer]
      }
    })

    return grouped
  }

  const groupedOffers = groupByCategory(group || [])

  const getCategoryIcon = (
    category: string
  ): keyof typeof iconMap | undefined => {
    switch (category) {
      case "Most Popular":
        return "sparkles"
      case "Safety & Security":
        return "shield"
      case "Outdoors":
        return "tentTree"
      case "Activities":
        return "dumbBell"
      case "Food & Drink":
        return "utensils"
      case "Internet":
        return "wifi"
      case "Parking":
        return "carFront"
      case "Reception Services":
        return "bellConcierge"
      case "General":
        return "house"
      case "Wellness":
        return "bike"
      case "Cleaning Services":
        return "shirt"
      case "Business Facilities":
        return "briefCase"
      case "Entertainment and family services":
        return "tv"
      case "On-site Payment Methods":
        return "handCoins"
      case "Languages Spoken":
        return "languages"

      default:
        return undefined
    }
  }

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="md">
      <div className="px-7 py-6 md:h-[700px] md:overflow-y-auto">
        <TitleSection title="What this place offers">
          {Object.keys(groupedOffers).map((category) => (
            <div key={category} className="mb-4">
              <div className="flex items-center mb-2">
                {getCategoryIcon(category) && (
                  <IconDescription
                    icon={getCategoryIcon(category)}
                    description={""}
                    isNotIncluded={false}
                  />
                )}
                <TitleSection title={category} />
              </div>
              <div className="grid grid-cols-2 items-center">
                {groupedOffers[category]?.map((item) => (
                  <div key={item._id}>
                    <IconDescription
                      description={item.facility || "No description available"}
                      isNotIncluded={item.isNotIncluded ?? false}
                      className={item.isNotIncluded ? "line-through" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TitleSection>
      </div>
    </ModalContainer>
  )
}

export default PlaceOfferModal

import React from "react"
import IconDescription from "../icon-description"
import { iconMap } from "@/common/helpers/iconMap"
// import PlaceOfferModal from "@/module/Listing/components/modals/PlaceOfferModal"
import { Typography } from "@/common/components/ui/Typography"
import { T_Facility } from "@repo/contract-2/property"

const PlaceOffers = ({ offers }: { offers: T_Facility[] }) => {
  // const [showMoreModalOpen, setShowMoreModalOpen] = useState(false)

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

  const splitOffersIntoColumns = (offers: T_Facility[]) => {
    const middleIndex = Math.ceil(offers?.length / 2)
    const leftColumn = offers?.slice(0, middleIndex).slice(0, 4)
    const rightColumn = offers?.slice(middleIndex).slice(0, 4)
    return [leftColumn, rightColumn]
  }

  const [leftColumn, rightColumn] = splitOffersIntoColumns(offers)

  return (
    <>
      <Typography variant="h3" fontWeight="semibold">
        What this place offers
      </Typography>
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <ul>
            {leftColumn?.map((item: T_Facility) => (
              <div className="space-y-2" key={item._id}>
                <IconDescription
                  key={item._id}
                  description={`${item.category}\n${item.facility}`}
                  isNotIncluded={!item.isSelected}
                  icon={getCategoryIcon(item.category as string)}
                />
              </div>
            ))}
          </ul>
          <ul>
            {rightColumn?.map((item: T_Facility) => (
              <div className="space-y-2" key={item._id}>
                <IconDescription
                  key={item._id}
                  description={`${item.category}\n${item.facility}`}
                  isNotIncluded={!item.isSelected}
                  icon={getCategoryIcon(item.category as string)}
                />
              </div>
            ))}
          </ul>
        </div>
        {/* <Button
            className="mt-5"
            variant="outline"
            onClick={() => setShowMoreModalOpen(!showMoreModalOpen)}
          >
            Show all {offers?.length} amenities
          </Button> */}
      </div>
      {/* <PlaceOfferModal
        isOpen={showMoreModalOpen}
        onClose={() => setShowMoreModalOpen(false)}
        group={group}
      /> */}
    </>
  )
}

export default PlaceOffers

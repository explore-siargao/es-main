import { Typography } from "../../../../../../common/components/ui/Typography"
import useAmenitySelectStore from "@/common/store/useAmenitySelectStore"
import {
  Palmtree,
  Bike,
  UtensilsCrossed,
  Wifi,
  ParkingCircle,
  HandHelping,
  ConciergeBell,
  ShieldCheck,
  LayoutList,
  Dumbbell,
  Leaf,
  Briefcase,
  Drama,
  CreditCard,
  BookA,
  Star,
  ShowerHead,
  ChefHat,
  Sofa,
} from "lucide-react"
import {
  PROPERTY_FACILITIES,
  UNIT_AMENITIES,
} from "../../../constants/amenities"

type Props = {
  className?: string
  level: "property" | "unit"
  category:
    | "Outdoors"
    | "Activities"
    | "Food & Drink"
    | "Internet"
    | "Parking"
    | "Services"
    | "Reception services"
    | "Safety & security"
    | "General"
    | "Wellness"
    | "Cleaning services"
    | "Business facilities"
    | "Entertainment and family services"
    | "Onsite payment methods"
    | "Languages spoken"
    | "Most popular"
    | "Bathroom"
    | "Kitchen"
    | "Living area"
}

const AmenitiesCheckbox = ({ className, level, category }: Props) => {
  let amenities: string[] = []

  const selectedAmenities = useAmenitySelectStore((state) => state.amenities)
  const setAmenities = useAmenitySelectStore((state) => state.setAmenities)

  if (level === "property") {
    const amenitySet = PROPERTY_FACILITIES.find(
      (item) => item.category === category
    )?.facilities
    amenities = amenitySet || []
  } else if (level === "unit") {
    const amenitySet = UNIT_AMENITIES.find(
      (item) => item.category === category
    )?.amenities
    amenities = amenitySet || []
  }

  const amenitiesIconMap = {
    Outdoors: <Palmtree className="h-4 w-4" />,
    Activities: <Bike className="h-4 w-4" />,
    "Food & Drink": <UtensilsCrossed className="h-4 w-4" />,
    Internet: <Wifi className="h-4 w-4" />,
    Parking: <ParkingCircle className="h-4 w-4" />,
    Services: <HandHelping className="h-4 w-4" />,
    "Reception services": <ConciergeBell className="h-4 w-4" />,
    "Safety & security": <ShieldCheck className="h-4 w-4" />,
    General: <LayoutList className="h-4 w-4" />,
    Wellness: <Dumbbell className="h-4 w-4" />,
    "Cleaning services": <Leaf className="h-4 w-4" />,
    "Business facilities": <Briefcase className="h-4 w-4" />,
    "Entertainment and family services": <Drama className="h-4 w-4" />,
    "Onsite payment methods": <CreditCard className="h-4 w-4" />,
    "Languages spoken": <BookA className="h-4 w-4" />,
    "Most popular": <Star className="h-4 w-4" />,
    Bathroom: <ShowerHead className="h-4 w-4" />,
    Kitchen: <ChefHat className="h-4 w-4" />,
    "Living area": <Sofa className="h-4 w-4" />,
  }

  return (
    <div className={className}>
      <div className="flex items-center space-x-2.5">
        {amenitiesIconMap[category]}
        <Typography variant="h4" fontWeight="semibold">
          {category}
        </Typography>
      </div>
      <div className="space-y-1 mt-2">
        {amenities.map((amenity, index) => (
          <div className="relative flex items-start" key={index}>
            <div className="flex h-6 items-center">
              <input
                id={`amenity-${category}-${index}`}
                aria-describedby={`amenity-${category}-${index}`}
                name={`amenity-${category}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                checked={selectedAmenities.some(
                  (item) =>
                    item.category === category && item.amenity === amenity
                )}
                onChange={() => setAmenities({ category, amenity })}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor={`amenity-${category}-${index}`}>{amenity}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AmenitiesCheckbox

import { LINK_HOSTING_LISTINGS } from "@/common/constants"
import {
  LucideInfo,
  LucideStar,
  LucideImage,
  LucideMapPin,
  LucideGavel,
  LucideSchool,
  LucideTv2,
  LucideCoins,
  LandPlot,
  LucideGitBranchPlus,
  LucideListPlus,
  LucideTableProperties,
  LucideNotepadText,
  LucideBlocks,
} from "lucide-react"

const PROPERTY_EDIT_BASE_PATH = `${LINK_HOSTING_LISTINGS}/properties`
const ACTIVITY_EDIT_BASE_PATH = `${LINK_HOSTING_LISTINGS}/activities`
const RENTAL_EDIT_BASE_PATH = `${LINK_HOSTING_LISTINGS}/rentals`

export const getPropertyLinks = (listingId: string) => [
  {
    title: "Property Type",
    icon: <LandPlot className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/property-type`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/property-type`,
  },
  {
    title: "Basic Info",
    icon: <LucideInfo className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/basic-info`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/basic-info`,
  },
  {
    title: "Location",
    icon: <LucideMapPin className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/location`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/location`,
  },
  {
    title: "Property Facilities",
    icon: <LucideTv2 className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/facilities`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/facilities`,
  },
  {
    title: "Units",
    icon: <LucideSchool className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/units`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/units`,
  },
  {
    title: "Pricing",
    icon: <LucideCoins className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/pricing`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/pricing`,
  },
  {
    title: "Photos",
    icon: <LucideImage className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/photos`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/photos`,
  },

  {
    title: "Policies",
    icon: <LucideGavel className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/policies`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/policies`,
  },
  {
    title: "Reviews",
    icon: <LucideStar className="h-5 w-5" />,
    link: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/reviews`,
    basePath: `${PROPERTY_EDIT_BASE_PATH}/${listingId}/reviews`,
  },
]

export const getActivityLinks = (listingId: string) => [
  {
    title: "Basic Info",
    icon: <LucideInfo className="h-5 w-5" />,
    link: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/basic-info`,
    basePath: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/basic-info`,
  },
  {
    title: "Itinerary",
    icon: <LucideTableProperties className="h-5 w-5" />,
    link: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/itinerary`,
    basePath: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/itinerary`,
  },
  {
    title: "Inclusions",
    icon: <LucideListPlus className="h-5 w-5" />,
    link: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/inclusions`,
    basePath: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/inclusions`,
  },
  {
    title: "Additional Info",
    icon: <LucideGitBranchPlus className="h-5 w-5" />,
    link: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/additional-info`,
    basePath: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/additional-info`,
  },
  {
    title: "Photos",
    icon: <LucideImage className="h-5 w-5" />,
    link: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/photos`,
    basePath: `${ACTIVITY_EDIT_BASE_PATH}/${listingId}/photos`,
  },
]

export const getRentalLinks = (listingId: string) => [
  {
    title: "Basic Info",
    icon: <LucideInfo className="h-5 w-5" />,
    link: `${RENTAL_EDIT_BASE_PATH}/${listingId}/basic-info`,
    basePath: `${RENTAL_EDIT_BASE_PATH}/${listingId}/basic-info`,
  },
  {
    title: "Details",
    icon: <LucideNotepadText className="h-5 w-5" />,
    link: `${RENTAL_EDIT_BASE_PATH}/${listingId}/details`,
    basePath: `${RENTAL_EDIT_BASE_PATH}/${listingId}/details`,
  },
  {
    title: "Add-ons",
    icon: <LucideBlocks className="h-5 w-5" />,
    link: `${RENTAL_EDIT_BASE_PATH}/${listingId}/add-ons`,
    basePath: `${RENTAL_EDIT_BASE_PATH}/${listingId}/add-ons`,
  },
  {
    title: "Photos",
    icon: <LucideImage className="h-5 w-5" />,
    link: `${RENTAL_EDIT_BASE_PATH}/${listingId}/photos`,
    basePath: `${RENTAL_EDIT_BASE_PATH}/${listingId}/photos`,
  },
  {
    title: "Pricing",
    icon: <LucideCoins className="h-5 w-5" />,
    link: `${RENTAL_EDIT_BASE_PATH}/${listingId}/pricing`,
    basePath: `${RENTAL_EDIT_BASE_PATH}/${listingId}/pricing`,
  },
  {
    title: "Location",
    icon: <LucideMapPin className="h-5 w-5" />,
    link: `${RENTAL_EDIT_BASE_PATH}/${listingId}/location`,
    basePath: `${RENTAL_EDIT_BASE_PATH}/${listingId}/location`,
  },
]

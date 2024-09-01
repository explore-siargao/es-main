import { LINK_HOSTING_LISTINGS } from "@/common/constants"
import {
  LucideInfo,
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
  LucideScrollText,
} from "lucide-react"

const PROPERTY_SETUP_BASE_PATH = `${LINK_HOSTING_LISTINGS}/properties/setup`
const ACTIVITY_SETUP_BASE_PATH = `${LINK_HOSTING_LISTINGS}/activities/setup`
const RENTAL_SETUP_BASE_PATH = `${LINK_HOSTING_LISTINGS}/rentals/setup`

export const getPropertyLinks = (listingId: string) => [
  {
    id: "type",
    title: "Property Type",
    icon: <LandPlot className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/property-type`,
    basePath: "/property-type",
  },
  {
    id: "basicInfo",
    title: "Basic Info",
    icon: <LucideInfo className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/basic-info`,
    basePath: "/basic-info",
  },
  {
    id: "location",
    title: "Location",
    icon: <LucideMapPin className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/location`,
    basePath: "/location",
  },
  {
    id: "facilities",
    title: "Property Facilities",
    icon: <LucideTv2 className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/facilities`,
    basePath: "/facilities",
  },
  {
    id: "units",
    title: "Units",
    icon: <LucideSchool className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/units`,
    basePath: "/units",
  },
  {
    id: "pricing",
    title: "Pricing",
    icon: <LucideCoins className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/pricing`,
    basePath: "/pricing",
  },
  {
    id: "photos",
    title: "Photos",
    icon: <LucideImage className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/photos`,
    basePath: "/photos",
  },

  {
    id: "policies",
    title: "Policies",
    icon: <LucideGavel className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/policies`,
    basePath: "/policies",
  },
  {
    id: "summary",
    title: "Summary",
    icon: <LucideScrollText className="h-5 w-5" />,
    link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/summary`,
    basePath: "/summary",
  },
]

export const getActivityLinks = (listingId: string) => [
  {
    id: "basicInfo",
    title: "Basic Info",
    icon: <LucideInfo className="h-5 w-5" />,
    link: `${ACTIVITY_SETUP_BASE_PATH}/${listingId}/basic-info`,
    basePath: "/basic-info",
  },
  {
    id: "itinerary",
    title: "Itinerary",
    icon: <LucideTableProperties className="h-5 w-5" />,
    link: `${ACTIVITY_SETUP_BASE_PATH}/${listingId}/itinerary`,
    basePath: "/itinerary",
  },
  {
    id: "inclusions",
    title: "Inclusions",
    icon: <LucideListPlus className="h-5 w-5" />,
    link: `${ACTIVITY_SETUP_BASE_PATH}/${listingId}/inclusions`,
    basePath: "/inclusions",
  },
  {
    id: "additionalInfo",
    title: "Additional Info",
    icon: <LucideGitBranchPlus className="h-5 w-5" />,
    link: `${ACTIVITY_SETUP_BASE_PATH}/${listingId}/additional-info`,
    basePath: "/additional-info",
  },
  {
    id: "photos",
    title: "Photos",
    icon: <LucideImage className="h-5 w-5" />,
    link: `${ACTIVITY_SETUP_BASE_PATH}/${listingId}/photos`,
    basePath: "/photos",
  },
  {
    id: "summary",
    title: "Summary",
    icon: <LucideScrollText className="h-5 w-5" />,
    link: `${ACTIVITY_SETUP_BASE_PATH}/${listingId}/summary`,
    basePath: "/summary",
  },
]

export const getRentalLinks = (listingId: string) => [
  {
    id: "basicInfo",
    title: "Basic Info",
    icon: <LucideInfo className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/basic-info`,
    basePath: "/basic-info",
  },
  {
    id: "details",
    title: "Details",
    icon: <LucideNotepadText className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/details`,
    basePath: "/details",
  },
  {
    id: "addOns",
    title: "Add-ons",
    icon: <LucideBlocks className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/add-ons`,
    basePath: "/add-ons",
  },
  {
    id: "photos",
    title: "Photos",
    icon: <LucideImage className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/photos`,
    basePath: "/photos",
  },
  {
    id: "pricing",
    title: "Pricing",
    icon: <LucideCoins className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/pricing`,
    basePath: "/pricing",
  },
  {
    id: "location",
    title: "Location",
    icon: <LucideMapPin className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/location`,
    basePath: "/location",
  },
  {
    id: "summary",
    title: "Summary",
    icon: <LucideScrollText className="h-5 w-5" />,
    link: `${RENTAL_SETUP_BASE_PATH}/${listingId}/summary`,
    basePath: "/summary",
  },
]

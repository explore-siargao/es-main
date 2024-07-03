"use client"
import Link from "next/link"
import { Typography } from "../ui/Typography"
import { WidthWrapper } from "../WidthWrapper"
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
} from "lucide-react"
import LinkIndicator from "./LinkIndicator"
import { useParams } from "next/navigation"
import { BOTTOM_LINKS } from "@/common/constants"

interface HostSidebarProps {
  children: React.ReactNode
}

const Sidebar = ({ children }: HostSidebarProps) => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const PROPERTY_EDIT_BASE_PATH = "/hosting/listings/properties"
  const TOP_LINKS = [
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
  return (
    <WidthWrapper width="wide">
      <div className="flex gap-14">
        <div className="flex-none relative">
          <div className="h-screen pt-16 sticky top-0">
            <nav className="md:flex-col h-full justify-between flex py-2">
              <ul className="lg:space-x-0 lg:space-y-1 flex flex-wrap md:flex-col justify-between">
                {TOP_LINKS.map((item) => (
                  <li key={item.title}>
                    <LinkIndicator basePath={item.basePath} />
                    <Link
                      href={item.link}
                      passHref={true}
                      className="text-gray-600 hover:text-black hover:bg-primary-100 group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      {item.icon}
                      <Typography variant="p" fontWeight="semibold">
                        {item.title}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <Typography
                  className="ml-1 text-text-400 text-sm"
                  variant="p"
                  fontWeight="semibold"
                >
                  NEED HELP?
                </Typography>
                <ul className="hidden md:flex md:flex-col mt-1">
                  {BOTTOM_LINKS.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.link}
                        passHref={true}
                        className="text-text-200 hover:text-text-500 hover:underline 
                    group flex gap-x-3 rounded-md p-1 text-sm leading-6"
                      >
                        <Typography variant="p">{item.title}</Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </WidthWrapper>
  )
}

export default Sidebar

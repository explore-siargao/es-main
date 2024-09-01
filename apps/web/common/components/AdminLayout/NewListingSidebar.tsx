"use client"
import Link from "next/link"
import { Typography } from "../ui/Typography"
import { WidthWrapper } from "../WidthWrapper"
import {
  LucideInfo,
  LucideImage,
  LucideMapPin,
  LucideGavel,
  LucideSchool,
  LucideTv2,
  LucideCoins,
  LandPlot,
  ScrollText,
} from "lucide-react"
import NewListingEditIndicator from "./NewListingEditIndicator"
import useGetFinishedSections from "@/module/Hosting/Listings/hooks/useGetFinishedSections"
import { useParams } from "next/navigation"
import { BOTTOM_LINKS } from "@/common/constants"
import { E_Listing_Category } from "@repo/contract"

interface HostSidebarProps {
  children: React.ReactNode
}

const Sidebar = ({ children }: HostSidebarProps) => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data } = useGetFinishedSections({
    listingId,
    category: E_Listing_Category.Property,
  })
  const finishedSections = data?.item?.finishedSections || []
  const PROPERTY_SETUP_BASE_PATH = "/hosting/listings/properties/setup"
  const SECTION_LINKS = [
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
      id: "photos",
      title: "Photos",
      icon: <LucideImage className="h-5 w-5" />,
      link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/photos`,
      basePath: "/photos",
    },
    {
      id: "pricing",
      title: "Pricing",
      icon: <LucideCoins className="h-5 w-5" />,
      link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/pricing`,
      basePath: "/pricing",
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
      icon: <ScrollText className="h-5 w-5" />,
      link: `${PROPERTY_SETUP_BASE_PATH}/${listingId}/summary`,
      basePath: "/summary",
    },
  ]
  return (
    <WidthWrapper width="wide">
      <div className="flex gap-14">
        <div className="flex-none relative">
          <div className="h-screen pt-16 sticky top-0">
            <nav className="md:flex-col h-full justify-between flex py-4">
              <ul className="lg:space-x-0 lg:space-y-1 flex flex-wrap md:flex-col justify-between">
                {SECTION_LINKS.map((item, index) => {
                  const isSectionFinished = finishedSections.includes(item.id)
                  return (
                    <li key={item.title}>
                      {isSectionFinished ||
                      finishedSections.length + 1 === index + 1 ? (
                        <Link
                          href={item.link}
                          passHref={true}
                          className="text-text-400 hover:text-text-700 hover:underline group flex items-center gap-x-2 rounded-md text-sm leading-6 font-semibold"
                        >
                          {isSectionFinished ? (
                            <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
                              {item.icon}
                            </div>
                          ) : (
                            <div className="h-8 w-8 bg-gray-100 text-text-300 flex items-center justify-center rounded-full">
                              {item.icon}
                            </div>
                          )}
                          <Typography
                            variant="p"
                            fontWeight="semibold"
                            className="flex items-center gap-2 justify-center"
                          >
                            {item.title}{" "}
                            <NewListingEditIndicator basePath={item.basePath} />
                          </Typography>
                        </Link>
                      ) : (
                        <div className="text-text-400 group flex items-center gap-x-2 rounded-md text-sm leading-6 font-semibold hover:cursor-not-allowed">
                          {isSectionFinished ? (
                            <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
                              {item.icon}
                            </div>
                          ) : (
                            <div className="h-8 w-8 bg-gray-100 text-text-300 flex items-center justify-center rounded-full">
                              {item.icon}
                            </div>
                          )}
                          <Typography
                            variant="p"
                            fontWeight="semibold"
                            className="flex items-center gap-2 justify-center"
                          >
                            {item.title}{" "}
                            <NewListingEditIndicator basePath={item.basePath} />
                          </Typography>
                        </div>
                      )}
                      {isSectionFinished &&
                      finishedSections.length < SECTION_LINKS.length ? (
                        <div className="ml-4 w-[2px] h-6 bg-primary-600 mt-2"></div>
                      ) : finishedSections.length < SECTION_LINKS.length &&
                        SECTION_LINKS.length > index + 1 ? (
                        <div className="ml-4 w-[2px] h-6 bg-gray-200 mt-2"></div>
                      ) : SECTION_LINKS.length > index + 1 ? (
                        <div className="ml-4 w-[2px] h-6 bg-primary-600 mt-2"></div>
                      ) : null}
                    </li>
                  )
                })}
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

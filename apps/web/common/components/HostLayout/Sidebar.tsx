import Link from "next/link"
import { Typography } from "../ui/Typography"
import { WidthWrapper } from "../WidthWrapper"
import {
  LucideAreaChart,
  LucideBookOpenCheck,
  LucideCalendar,
  LucideCoins,
  LucideHandCoins,
  LucideList,
  LucideListChecks,
  LucideMessagesSquare,
  LucideStar,
} from "lucide-react"
import LinkIndicator from "./LinkIndicator"
import { BOTTOM_LINKS } from "@/common/constants"

interface HostSidebarProps {
  children: React.ReactNode
}

const topLinks = [
  {
    title: "Today",
    icon: <LucideBookOpenCheck className="h-5 w-5" />,
    link: "/hosting/today",
    basePath: "/hosting/today",
  },
  {
    title: "Listings",
    icon: <LucideList className="h-5 w-5" />,
    link: "/hosting/listings/properties",
    basePath: "/hosting/listings",
  },
  {
    title: "Messages",
    icon: <LucideMessagesSquare className="h-5 w-5" />,
    link: "/conversation",
    basePath: "/conversation",
    newTab: true,
  },
  {
    title: "Reservations",
    icon: <LucideListChecks className="h-5 w-5" />,
    link: "/hosting/reservations/calendar/properties",
    basePath: "/hosting/reservations",
  },
  {
    title: "Insights",
    icon: <LucideAreaChart className="h-5 w-5" />,
    link: "/hosting/insights/general",
    basePath: "/hosting/insights",
  },
]

const Sidebar = ({ children }: HostSidebarProps) => {
  return (
    <WidthWrapper width="wide">
      <div className="flex gap-14">
        <div className="flex-none relative">
          <div className="h-screen pt-16 sticky top-0">
            <nav className="md:flex-col h-full justify-between flex py-2">
              <ul className="lg:space-x-0 lg:space-y-1 flex flex-wrap md:flex-col justify-between">
                {topLinks.map((item) => (
                  <li key={item.title}>
                    <LinkIndicator basePath={item.basePath} />
                    <Link
                      href={item.link}
                      passHref={true}
                      target={item.newTab ? "_blank" : "_self"}
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

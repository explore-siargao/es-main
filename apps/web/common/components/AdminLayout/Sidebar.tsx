import Link from "next/link"
import { Typography } from "../ui/Typography"
import { WidthWrapper } from "../WidthWrapper"
import {
  LucideBarChartHorizontalBig,
  LucideCoins,
  LucideCreditCard,
  LucideLayoutDashboard,
  LucideList,
  LucideUsers,
} from "lucide-react"
import LinkIndicator from "./LinkIndicator"
import { BOTTOM_LINKS } from "@/common/constants"

interface HostSidebarProps {
  children: React.ReactNode
}

const topLinks = [
  {
    title: "Dashboard",
    icon: <LucideLayoutDashboard className="h-5 w-5" />,
    link: "/admin/dashboard",
    basePath: "/admin/dashboard",
    newTab: false,
  },
  {
    title: "Listings",
    icon: <LucideList className="h-5 w-5" />,
    link: "/admin/listings/live",
    basePath: "/admin/listings",
    newTab: false,
  },
  {
    title: "Users",
    icon: <LucideUsers className="h-5 w-5" />,
    link: "/admin/users",
    basePath: "/admin/users",
    newTab: false,
  },
  {
    title: "Analytics",
    icon: <LucideBarChartHorizontalBig className="h-5 w-5" />,
    link: "/admin/analytics",
    basePath: "/admin/analytics",
    newTab: false,
  },
  {
    title: "Finances",
    icon: <LucideCoins className="h-5 w-5" />,
    link: "/admin/finances",
    basePath: "/admin/finances",
    newTab: false,
  },
  {
    title: "Refunds",
    icon: <LucideCreditCard className="h-5 w-5" />,
    link: "/admin/refunds",
    basePath: "/admin/refunds",
    newTab: false,
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

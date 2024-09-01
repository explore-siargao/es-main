"use client"
import Link from "next/link"
import { Typography } from "../../ui/Typography"
import { WidthWrapper } from "../../WidthWrapper"
import { useParams } from "next/navigation"
import { BOTTOM_LINKS } from "@/common/constants"
import { E_Listing_Category } from "@repo/contract"
import EditSidebar from "./EditSidebar"
import SetupSidebar from "./SetupSidebar"

interface HostListingSidebarProps {
  category: E_Listing_Category
  status?: 'setup' | 'edit'
  children: React.ReactNode
}

const ListingSidebar = ({ category, status = 'edit', children }: HostListingSidebarProps) => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const renderLinks = {
    setup: <SetupSidebar category={category} listingId={listingId} />,
    edit: <EditSidebar category={category} listingId={listingId} />,
  }
  
  return (
    <WidthWrapper width="wide">
      <div className="flex gap-14">
        <div className="flex-none relative">
          <div className="h-screen pt-16 sticky top-0">
            <nav className="md:flex-col h-full justify-between flex py-2">
              <ul className="lg:space-x-0 lg:space-y-1 flex flex-wrap md:flex-col justify-between">
                {renderLinks[status]}
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

export default ListingSidebar

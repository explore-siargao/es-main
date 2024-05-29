"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface IOvalTab {
  description: string
  value: number
  link: string
  isSelected?: boolean
}

interface OvalTabProps {
  tabs: IOvalTab[]
}

const OvalTab = ({ tabs }: OvalTabProps) => {
  const currentPath = usePathname()

  return (
    <div>
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          value={currentPath}
          onChange={(e) => (window.location.href = e.target.value)}
        >
          {tabs.map((tab) => (
            <option
              key={tab.description}
              value={tab.description}
              selected={tab.isSelected}
            >
              {tab.description}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div>
          <nav className="-mb-px flex space-x-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link key={tab.description} href={tab.link} passHref={true}>
                <div
                  className={`flex items-center whitespace-nowrap border border-primary-300 rounded-full py-2 px-4 text-sm font-medium gap-1 ${
                    tab.isSelected || currentPath === tab.link
                      ? "bg-primary-100 text-primary-600"
                      : "bg-transparent text-gray-500 hover:bg-primary-100 hover:text-primary-600"
                  }`}
                >
                  {tab.description && <span>{tab.description}</span>}
                  {tab.value !== undefined && tab.value !== null && (
                    <span>({tab.value})</span>
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default OvalTab

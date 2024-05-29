import Link from "next/link"
import { usePathname } from "next/navigation"

interface IProgressPagesTab {
  title: string
  link: string
  isSelected?: boolean
}

interface ProgressPagesTabProps {
  tabs: IProgressPagesTab[]
}

const ProgressPagesTab = ({ tabs }: ProgressPagesTabProps) => {
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
            <option key={tab.title} value={tab.link} selected={tab.isSelected}>
              {tab.title}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-5" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link key={tab.title} href={tab.link} passHref={true}>
                <div
                  className={`flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm text-md font-semibold ${
                    tab.isSelected || currentPath === tab.link
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-600"
                  }`}
                >
                  {tab.title}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ProgressPagesTab

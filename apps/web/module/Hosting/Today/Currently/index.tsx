import OvalTab from "@/common/components/ui/OvalTab"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import { LucideBook } from "lucide-react"
import Welcome from "../components/Welcome"
import TABS from "../constants/tabs"

interface HostingPageProps {
  icon?: JSX.Element
  description?: string
  allReservationCounts?: number
}

const HostingTodayCurrently: React.FC<HostingPageProps> = () => {
  const allTabsIsZero = TABS.every((tab) => tab.value === 0)
  let icon = null
  let description = null
  if (allTabsIsZero) {
    icon = <LucideBook />
    description = "You don't have any guests today or tomorrow"
  }
  return (
    <div className="mt-20">
      <div>
        <div>
          <Welcome />
        </div>
        <div className="">
          <div className="flex-grow" />
          <Typography
            variant="h2"
            fontWeight="semibold"
            className="flex text-2xl justify-between mb-5"
          >
            Your reservations
            <Button
              variant={"ghost"}
              className="flex items-end font-semibold underline"
            >
              All reservations (0)
            </Button>
          </Typography>
        </div>

        <div>
          <OvalTab tabs={TABS} />
          <div className="flex bg-gray-100 min-h-fit w-full mt-5 items-center justify-center rounded-lg p-12">
            <div className="text-text-200">
              <div className="flex items-center justify-center mb-5">
                {icon}
              </div>
              <div className="w-[200px]">
                <Typography fontWeight="semibold">{description}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostingTodayCurrently

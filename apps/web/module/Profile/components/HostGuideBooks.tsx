import { HostGuideBooksProps } from "../types/HostGuideBooks"
import GuideBook from "./GuideBook"
import { Typography } from "@/common/components/ui/Typography"

const HostGuideBooks = ({ name }: HostGuideBooksProps) => {
  return (
    <div>
      <Typography variant="h2" fontWeight="semibold" className="text-2xl">
        {name}'s Guidebooks
      </Typography>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
        <GuideBook name={name} />
      </div>
    </div>
  )
}

export default HostGuideBooks

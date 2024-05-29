import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import { GuideBookProps } from "../types/GuideBook"

const GuideBook = ({ name }: GuideBookProps) => {
  return (
    <Link href="#">
      <div className="rounded-md p-4 h-60 bg-primary-400 relative">
        <Typography variant="h2" className="bottom-4 absolute font-semibold">
          {name}'s Guidebook
        </Typography>
      </div>
    </Link>
  )
}

export default GuideBook

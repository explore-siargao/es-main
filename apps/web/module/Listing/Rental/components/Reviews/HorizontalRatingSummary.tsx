import OverallRating from "./OverallRating"
import Category from "./Category"
import {
  KeyRound,
  SprayCan,
  CheckCircle2,
  MessageSquare,
  Map,
  Tag,
  LucideStar,
} from "lucide-react"
import { Typography } from "@/common/components/ui/Typography"

const HorizontalRatingSummary = () => {
  return (
    <>
      <div className="flex mb-4 space-x-2 mt-20">
        <LucideStar className="h-7 w-7" />
        <Typography variant={"h3"} className="font-semibold mt-0.5">
          4.60 • 4 reviews
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-6 lg:divide-x gap-y-4 lg:gap-y-0">
        <div className="md:col-span-2 lg:col-span-2">
          <OverallRating />
        </div>
        <div className="md:col-span-3 lg:col-span-10">
          <div className="grid lg:mx-4 grid-cols-1 md:grid-cols-3 h-full items-center gap-y-2 lg:gap-y-0 md:gap-x-6">
            <div className="border-y">
              <Category
                title="Cleanliness"
                rating="4.8"
                isHorizontal={true}
                icon={<SprayCan />}
              />
            </div>
            <div className="border-y">
              <Category
                title="Accuracy"
                rating="4.8"
                isHorizontal={true}
                icon={<CheckCircle2 />}
              />
            </div>
            <div className="border-y">
              <Category
                title="Check-in"
                rating="5.0"
                isHorizontal={true}
                icon={<KeyRound />}
              />
            </div>
            <div className="border-y">
              <Category
                title="Communication"
                rating="4.4"
                isHorizontal={true}
                icon={<MessageSquare />}
              />
            </div>
            <div className="border-y">
              <Category
                title="Location"
                rating="5.0"
                isHorizontal={true}
                icon={<Map />}
              />
            </div>
            <div className="border-y">
              <Category
                title="Value"
                rating="5.0"
                isHorizontal={true}
                icon={<Tag />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HorizontalRatingSummary

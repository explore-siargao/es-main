import { Typography } from "@/common/components/ui/Typography"
import { LucideMapPin, Flag } from "lucide-react"
import React from "react"
import { TitleSection } from "@/module/Listing/Property/components/TitleSection"
import { useParams } from "next/navigation"
import { activities } from "../dummy"

const Builder = () => {
  const params = useParams<{ activityId: string }>()
  const data: any = { item: null }

  const testSegmentsData = activities.segments
  return (
    <>
      <div className=" sm:w-3/4 w-full">
        <TitleSection size="lg" title="Itinerary">
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
                <LucideMapPin className="h-5 w-5" />
              </div>
              <Typography fontWeight="semibold" className="text-text-400">
                Meet-up Point ({data?.item?.meetingPoint?.streetAddress})
              </Typography>
            </div>
            {data?.item?.segments?.map((segment: any) => {
              return (
                <>
                  <div className="ml-4 w-[2px] h-12 bg-primary-600 mt-2"></div>
                  <div
                    className={`mt-2 shadow-md rounded-xl p-4 border ${segment.transfer ? "border-secondary-200" : "border-primary-500"} `}
                  >
                    <Typography variant="h4">
                      {segment.transfer
                        ? `Transfer via ${segment.transfer} 
                  (${segment.durationHour > 0 ? segment.durationHour + "h" : ""}${segment.durationMinute > 0 ? " " + segment.durationMinute + "m" : ""})`
                        : segment.location}
                    </Typography>
                    <p className="text-text-400 text-sm">
                      {segment.activities?.join(", ")}{" "}
                      {!segment.transfer && segment.activities
                        ? `(${segment.durationHour > 0 ? segment.durationHour + "h" : ""}${segment.durationMinute > 0 ? " " + segment.durationMinute + "m" : ""})`
                        : ""}
                    </p>
                    <p className="text-text-400 text-sm">
                      {segment.optional && "Optional"}
                      {segment.hasAdditionalFee && ", Extra Fee"}
                    </p>
                  </div>
                </>
              )
            })}

            <div className="ml-4 w-[2px] h-12 bg-primary-600 mt-2"></div>
            <div className="flex items-center mt-2">
              <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
                <Flag className="h-5 w-5" />
              </div>
            </div>
          </div>
        </TitleSection>
      </div>
    </>
  )
}

export default Builder

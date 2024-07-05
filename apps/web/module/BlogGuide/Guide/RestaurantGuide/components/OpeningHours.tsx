import { TitleSection } from "@/module/Listing/Rental/components/TitleSection"
import { T_ScheduleProps } from "../types/Schedule"

const OpeningHours = ({ schedules }: T_ScheduleProps) => {
  return (
    <>
      <TitleSection size="lg" title="Opening Hours">
        <div className="mb-5"></div>
        <div className="flex flex-col gap-4">
          {schedules.map((item, index) => (
            <div key={index} className="flex justify-between w-[60%]">
              <div>{item.day}</div>
              <div>
                {item.open} - {item.close}
              </div>
            </div>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default OpeningHours

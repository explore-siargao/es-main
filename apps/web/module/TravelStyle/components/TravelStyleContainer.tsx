import { Typography } from "@/common/components/ui/Typography"
import TravelStyleItem from "./TravelStyleItem"
import { StaticImageData } from "next/image"

type T_Props = {
  title?: string
  items: T_Items[]
}

type T_Items = {
  imageKey: StaticImageData | string
  title: string
  description: string
  type: string
}

const TravelStyleContainer = ({ title, items }: T_Props) => {
  return (
    <>
      <div className="mb-8">
        <Typography variant="h2" fontWeight="semibold">
          {title}
        </Typography>
      </div>

      <div className="grid grid-cols-4 gap-10">
        {items.map((item) => (
          <TravelStyleItem
            key={item.title}
            imageKey={item.imageKey}
            title={item.title}
            description={item.description}
            type={item.type}
          />
        ))}
      </div>
    </>
  )
}

export default TravelStyleContainer

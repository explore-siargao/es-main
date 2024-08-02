import { Typography } from "@/common/components/ui/Typography"
import { StaticImageData } from "next/image"
import RentalItem from "./RentalItem"
import { Button } from "@/common/components/ui/Button"

type T_Props = {
  title?: string
  items: T_Items[]
}

type T_Items = {
  imageKey: StaticImageData | string
  title: string
  description: string
}

const RentalContainer = ({ title, items }: T_Props) => {
  return (
    <>
      <div className="mb-8">
        <Typography variant="h2" fontWeight="semibold">
          {title}
        </Typography>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {items.map((item) => (
          <RentalItem
            imageKey={item.imageKey}
            title={item.title}
            description={item.description}
            key={item.title}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button variant="outline" className="float-right">
          Show more
        </Button>
      </div>
    </>
  )
}

export default RentalContainer

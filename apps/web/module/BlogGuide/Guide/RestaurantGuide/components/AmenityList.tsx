import { Typography } from "@/common/components/ui/Typography"
import { Check } from "lucide-react"

type T_Prop = {
  amenities: T_Amenity[]
}

type T_Amenity = {
  amenity: string
  id: string
}

const AmenityList = ({ amenities }: T_Prop) => {
  return (
    <>
      <Typography variant="h1" fontWeight="bold" className="mb-4">
        Amenities and more
      </Typography>
      <div className="grid grid-cols-2 gap-4 w-full">
        {amenities.map((item) => (
          <div className="flex gap-2" key={item.id}>
            <Check className="text-primary-700 shrink-0" />
            <Typography>{item.amenity}</Typography>
          </div>
        ))}
      </div>
    </>
  )
}

export default AmenityList

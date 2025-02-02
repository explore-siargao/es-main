import { Typography } from "@/common/components/ui/Typography"
import Image from "@/common/components/ui/image"
import Link from "next/link"

type T_Props = {
  name: string
  image: string
  url: string
  index: number
}

const NearbyAccommodation = ({ name, image, url, index }: T_Props) => {
  return (
    <Link href={url} target="_blank" key={"accommodation-" + index}>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full bg-gray-200 h-80 flex items-center justify-center rounded-xl overflow-hidden hover:shadow-lg hover:cursor-pointer">
          <Image
            src={image}
            className="h-full w-full object-cover"
            width={500}
            height={500}
            alt=""
          />
        </div>
        <Typography variant="h3" fontWeight="semibold">
          {name}
        </Typography>
      </div>
    </Link>
  )
}

export default NearbyAccommodation

import Link from "next/link"
import { Typography } from "../../../common/components/ui/Typography"
import { StaticImageData } from "next/image"
import { GRAY_BASE64 } from "@/common/constants"
import Image from "@/common/components/ui/image"

type T_Props = {
  imageKey: StaticImageData | string
  title: string
  subTitle?: string
  url?: string
}

const Item = ({ imageKey, title, subTitle, url }: T_Props) => {
  return (
    <Link href={url ?? "#"} target="_blank">
      <div className="relative w-full h-56 rounded-xl overflow-hidden">
        <Image
          src={`/assets/${imageKey}`}
          placeholder="blur"
          blurDataURL={GRAY_BASE64}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-2 text-left">
        <Typography
          variant="h4"
          fontWeight="semibold"
          className="text-text-500 truncate"
        >
          {title}
        </Typography>
        <Typography className="text-text-300 text-sm" variant="h5">
          {subTitle}
        </Typography>
      </div>
    </Link>
  )
}

export default Item

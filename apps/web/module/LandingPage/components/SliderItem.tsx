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
  isGuide: boolean
}

const SliderItem = ({ imageKey, title, subTitle, url, isGuide }: T_Props) => {
  return (
    <Link href={url ?? "#"} target={isGuide ? "_blank" : "_self"}>
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
        <Image
          src={imageKey}
          placeholder="blur"
          blurDataURL={GRAY_BASE64}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-2 text-left">
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
        <Typography variant="h5">{subTitle}</Typography>
      </div>
    </Link>
  )
}

export default SliderItem

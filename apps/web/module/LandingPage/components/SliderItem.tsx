import Link from "next/link"
import { Typography } from "../../../common/components/ui/Typography"
import Image, { StaticImageData } from "next/image"

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
        <Image src={imageKey} alt={title} layout="fill" objectFit="cover" />
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

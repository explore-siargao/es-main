import Link from "next/link"
import { Typography } from "../../../common/components/ui/Typography"
import Image, { StaticImageData } from "next/image"

type T_Props = {
  imageKey: StaticImageData | string
  title: string
  subTitle?: string
  url?: string
}

const SliderItem = ({ imageKey, title, subTitle, url }: T_Props) => {
  return (
    <>
      <Link href={url ?? "#"}>
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
    </>
  )
}

export default SliderItem

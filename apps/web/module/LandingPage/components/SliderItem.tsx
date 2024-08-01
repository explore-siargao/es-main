import { Typography } from "../../../common/components/ui/Typography"
import Image, { StaticImageData } from "next/image"

type T_Props = {
  imageKey: StaticImageData | string
  title: string
  subTitle?: string
}

const SliderItem = ({ imageKey, title, subTitle }: T_Props) => {
  return (
    <>
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
        <Image
          className="cursor-pointer"
          src={imageKey}
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
    </>
  )
}

export default SliderItem

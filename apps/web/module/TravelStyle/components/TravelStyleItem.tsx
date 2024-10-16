import { useRouter } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import { StaticImageData } from "next/image"
import Image from "@/common/components/ui/image"

type T_Props = {
  imageKey: StaticImageData | string
  title: string
  description: string
  type: string
}

const TravelStyleItem = ({ imageKey, title, description, type }: T_Props) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/search?category=Property&type=${type}`)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
        <Image src={imageKey} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="mt-2 text-left">
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
        <Typography variant="h5">{description}</Typography>
      </div>
    </div>
  )
}

export default TravelStyleItem

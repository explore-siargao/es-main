import { Typography } from "@/common/components/ui/Typography"
import Image from "@/common/components/ui/image"
import Link from "next/link"

type T_Guides = {
  title: string
  imageKey: string
  link: string
}

type T_Props = {
  title: string
  guides: T_Guides[]
}

const RecommendedListing = ({ title, guides }: T_Props) => {
  return (
    <div>
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="mb-10 text-text-500"
      >
        {title}
      </Typography>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {guides.map((guide, index) => (
          <Link href="#" key={index}>
            <div className="relative h-44 mb-2">
              <Image
                src={"/assets/" + guide.imageKey}
                alt=""
                fill
                className="bg-gray-200 rounded-md"
                objectFit="cover"
              />
            </div>
            <Typography fontWeight="semibold">{guide.title}</Typography>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendedListing

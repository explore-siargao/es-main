import { Typography } from "@/common/components/ui/Typography"
import Image from "next/image"
import Link from "next/link"

type T_Props = {
  title: string
}

const guides = [
  {
    fileKey: "1.jpg",
    title: "Cloud 9 Wave",
  },
  {
    fileKey: "2.jpg",
    title: "Surfer at Jacking Horse",
  },
  {
    fileKey: "3.jpg",
    title: "Stimpy's Surf Spot",
  },
  {
    fileKey: "5.jpg",
    title: "Rock Island Waves",
  },
]

const Guides = ({ title }: T_Props) => {
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
                src={"/assets/" + guide.fileKey}
                alt={guide.title}
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

export default Guides

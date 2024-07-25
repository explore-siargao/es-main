import React from "react"
import Image, { StaticImageData } from "next/image"
import { Typography } from "@/common/components/ui/Typography"
import { LucideArrowRight } from "lucide-react"
import Link from "next/link"

interface ICardItems {
  imageKey: StaticImageData
  title: string
  description: string
  linkTitle: string
  url: string
}

const ImageTextCard = ({
  imageKey,
  title,
  description,
  linkTitle,
  url,
}: ICardItems) => {
  return (
    <div className="bg-white rounded-lg shadow-md flex-shrink-0 w-80">
      <div className="relative w-full h-56">
        <Image
          src={imageKey}
          layout="fill"
          alt={title}
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col space-y-4 p-8">
        <Typography variant="h2" fontWeight="semibold">
          {title}
        </Typography>
        <Typography className="text-gray-700">{description}</Typography>
        <Link href={url}>
          <div className="flex items-center gap-2 hover:underline">
            <Typography>{linkTitle}</Typography>
            <LucideArrowRight />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ImageTextCard

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
    <div className="bg-white rounded-xl shadow-md mx-auto">
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-56">
        <Image
          src={imageKey}
          layout="fill"
          alt={title}
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col space-y-4 p-4 sm:p-6 md:p-6 lg:p-6">
        <Typography variant="h3" fontWeight="semibold">
          {title}
        </Typography>
        <Typography className="text-gray-700 text-sm sm:text-base md:text-base">
          {description}
        </Typography>
        <Link href={url}>
          <div className="flex items-center gap-2 hover:underline">
            <Typography className="text-sm sm:text-base md:text-base">
              {linkTitle}
            </Typography>
            <LucideArrowRight />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ImageTextCard

import React from "react"
import Image from "next/image"
import { Typography } from "@/common/components/ui/Typography"
import { LucideArrowRight } from "lucide-react"
import Link from "next/link"

interface ICardItems {
  imageKey: string
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
    <div key={description} className="flex flex-col max-w-80">
      <Image
        src={`/assets/${imageKey}`}
        width={300}
        height={300}
        alt={title}
        className="object-cover h-72 w-80 rounded-lg"
      />
      <div className="flex flex-col mr-4 ml-4 space-y-4 mt-6">
        <Typography variant="h2" fontWeight="semibold">
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Link href={url}>
          <div className="flex gap-2 hover:underline">
            <Typography>{linkTitle}</Typography>
            <LucideArrowRight />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ImageTextCard

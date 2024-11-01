import React from "react"
import Image from "@/common/components/ui/image"

type T_GridImageProps = {
  src: any
  alt: string
  text: string
}
function GridImage({ src, alt, text }: T_GridImageProps) {
  return (
    <div className="grid grid-cols-2">
      <div className="relative w-24 h-16 rounded-xl">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src={`/assets/${src}`}
          alt={alt}
          className="cursor-pointer rounded-xl"
        />
      </div>

      <p className="text-sm">{text}</p>
    </div>
  )
}

export default GridImage

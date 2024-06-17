import React from "react"
import Image from "next/image"

type T_GridImageProps = {
  src: any
  alt: string
  text: string
}
function GridImage({ src, alt, text }: T_GridImageProps) {
  return (
    <div className="grid grid-cols-2">
      <Image
        width={100}
        height={100}
        src={`/assets/${src}`}
        alt={alt}
        className="cursor-pointer rounded-lg"
      />
      <p className="text-sm">{text}</p>
    </div>
  )
}

export default GridImage

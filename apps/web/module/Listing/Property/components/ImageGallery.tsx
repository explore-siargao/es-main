import { Button } from "@/common/components/ui/Button"
import Image from "next/image"
import { Grip } from "lucide-react"
import { T_ImagesProps } from "../types/SectionInfo"
import { Dialog } from "@headlessui/react"
import { useState } from "react"
import SliderImages from "@/common/components/SliderImages"

const ImageGallery = ({
  images,
  isViewModal,
  showThreeOnly,
  isRoundedEdge,
}: T_ImagesProps) => {
  const getImgSrc = (index: number) => {
    const image = images[index]
    const imgSrc = `/assets/${image?.key ? `${image.key}` : `${image?.image?.filename}` || ""}`
    const imgAlt = image?.description || image?.image?.alt || ""
    return { src: imgSrc, alt: imgAlt }
  }

  const [isOpen, setIsOpen] = useState(false)

  const renderImage = (index: number, additionalClasses: string) => (
    <div className={`relative bg-gray-200 ${additionalClasses}`}>
      <Image
        onClick={() => setIsOpen(true)}
        src={images ? getImgSrc(index).src : ""}
        layout="fill"
        objectFit="cover"
        alt={images ? getImgSrc(index).alt : ""}
        className={`${isRoundedEdge && index === 0 ? "rounded-l-xl" : isRoundedEdge && index === 2 ? "rounded-tr-xl" : isRoundedEdge && index === 4 ? "rounded-br-xl" : ""} cursor-pointer`}
      />
    </div>
  )

  const renderButton = () => (
    <Button
      variant="shaded"
      className="absolute bottom-2 md:bottom-2 right-2 md:right-2 bg-white px-1 text-[10px] h-6 p-2"
      onClick={() => setIsOpen(true)}
    >
      <Grip className="h-2 w-2 mr-1 mb-0.5" />
      Show all photos
    </Button>
  )

  if (showThreeOnly) {
    return (
      <div className="relative h-44">
        <div className="grid grid-cols-2 h-full gap-2 w-full">
          {renderImage(
            0,
            "lg:rounded-tl-xl lg:rounded-bl-xl md:rounded-tl-xl md:rounded-bl-xl sm:rounded-tl-xl sm:rounded-tr-xl rounded-tl-xl rounded-bl-xl"
          )}
          <div className="grid grid-rows-2 gap-2 col-span-1 h-full">
            {renderImage(1, "2xl:rounded-tr-xl lg:rounded-tr-xl rounded-tr-xl")}
            {renderImage(2, "2xl:rounded-br-xl lg:rounded-br-xl rounded-br-xl")}
          </div>
        </div>
        {isViewModal && renderButton()}
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-1 ${!isViewModal ? "border border-primary-500 rounded-xl" : ""} md:grid-cols-2 gap-x-2 gap-y-2 md:gap-y-0 h-96`}
      >
        {renderImage(
          0,
          "lg:rounded-tl-xl lg:rounded-bl-xl md:rounded-tl-xl md:rounded-bl-xl sm:rounded-tl-xl sm:rounded-tr-xl rounded-tl-xl rounded-tr-xl"
        )}
        <div
          className={`grid ${!isViewModal ? "grid-cols-1" : "grid-cols-2"} gap-2`}
        >
          {isViewModal && renderImage(1, "")}
          {renderImage(
            2,
            "lg-rounded-tr-xl md:rounded-tr-xl md:rounded-bl-none"
          )}
          {isViewModal && renderImage(3, "sm:rounded-bl-xl rounded-bl-xl")}
          {renderImage(4, "2xl:rounded-br-xl lg:rounded-br-xl rounded-br-xl")}
        </div>
      </div>
      {isViewModal && (
        <Button
          variant="shaded"
          className="absolute bottom-2 md:bottom-4 right-1 md:right-4 bg-white"
          onClick={() => setIsOpen(true)}
        >
          <Grip className="h-4 w-4 mr-2 mb-0.5" />
          Show all photos
        </Button>
      )}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="relative w-full h-full bg-white bg-opacity-10">
          <SliderImages
            //@ts-ignore
            images={images}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export default ImageGallery
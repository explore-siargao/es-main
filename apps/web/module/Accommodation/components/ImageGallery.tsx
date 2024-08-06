import { Button } from "@/common/components/ui/Button"
import Image from "next/image"
import { Grip } from "lucide-react"
import { T_ImagesProps } from "../types/SectionInfo"

const ImageGallery = ({
  images,
  openModal,
  isViewModal,
  showThreeOnly,
}: T_ImagesProps) => {
  if (showThreeOnly) {
    return (
      <div className="relative h-44">
        <div className="grid grid-cols-2 h-full gap-2 w-full">
          <div
            className="relative bg-gray-200 
                     lg:rounded-tl-xl lg:rounded-bl-xl 
                     md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none
                     sm:rounded-tl-xl sm:rounded-tr-xl sm:rounded-bl-none
                     rounded-tl-xl rounded-bl-xl"
          >
            <Image
              onClick={openModal}
              src={`/assets/${images[0]?.key}`}
              layout="fill"
              objectFit="cover"
              alt={String(images[0]?.description)}
              className="cursor-pointer
            2xl:rounded-tl-xl 2xl:rounded-bl-xl
            xl:rounded-tl-xl xl:rounded-bl-xl
            lg:rounded-tl-xl lg:rounded-bl-xl 
            md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none 
            sm:rounded-tl-xl sm:rounded-tr-xl sm:rounded-bl-none
            rounded-tl-xl rounded-bl-xl"
            />
          </div>
          <div className="grid grid-rows-2 gap-2 col-span-1 h-full">
            <div
              className="relative bg-gray-200 
                          2xl:rounded-tr-xl
                          lg:rounded-tr-xl
                          rounded-tr-xl"
            >
              <Image
                onClick={openModal}
                src={`/assets/${images[1]?.key}`}
                layout="fill"
                objectFit="cover"
                alt={String(images[1]?.description)}
                className="cursor-pointer 
                2xl:rounded-tr-xl 
                xl:rounded-tr-xl 
                lg:rounded-tr-xl 
                md:rounded-tr-xl
                rounded-tr-xl"
              />
            </div>
            <div
              className="relative bg-gray-200 
                          2xl:rounded-br-xl
                          lg:rounded-br-xl
                          rounded-br-xl"
            >
              <Image
                onClick={openModal}
                src={`/assets/${images[2]?.key}`}
                layout="fill"
                objectFit="cover"
                alt={String(images[2]?.description)}
                className="cursor-pointer 
              2xl:rounded-br-xl 
              xl:rounded-br-xl 
              lg:rounded-br-xl 
              md:rounded-br-xl
              rounded-br-xl"
              />
            </div>
          </div>
        </div>
        {isViewModal ? (
          <Button
            variant="shaded"
            className="absolute bottom-2 md:bottom-2 right-2 md:right-2 bg-white px-1 text-[10px] h-6 p-2"
            onClick={() => openModal()}
          >
            <Grip className="h-2 w-2 mr-1 mb-0.5" />
            Show all photos
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-1 ${!isViewModal ? "border border-primary-500 rounded-xl" : ""} md:grid-cols-2 gap-x-2 gap-y-2 md:gap-y-0 h-96`}
      >
        <div
          className="relative bg-gray-200 
                     lg:rounded-tl-xl lg:rounded-bl-xl 
                     md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none
                     sm:rounded-tl-xl sm:rounded-tr-xl sm:rounded-bl-none
                     rounded-tl-xl rounded-tr-xl"
        >
          <Image
            onClick={openModal}
            src={`/assets/${images[0]?.key}`}
            layout="fill"
            objectFit="cover"
            alt={String(images[0]?.description)}
            className="cursor-pointer
            2xl:rounded-tl-xl 2xl:rounded-bl-xl
            xl:rounded-tl-xl xl:rounded-bl-xl
            lg:rounded-tl-xl lg:rounded-bl-xl 
            md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none 
            sm:rounded-tl-xl sm:rounded-tr-xl sm:rounded-bl-none
            rounded-tl-xl rounded-tr-xl"
          />
        </div>
        <div
          className={`grid ${!isViewModal ? "grid-cols-1" : "grid-cols-2"} gap-2`}
        >
          {isViewModal ? (
            <div className="relative bg-gray-200">
              <Image
                onClick={openModal}
                src={`/assets/${images[1]?.key}`}
                layout="fill"
                objectFit="cover"
                alt={String(images[1]?.description)}
                className="cursor-pointer"
              />
            </div>
          ) : null}
          <div className="relative bg-gray-200 rounded-tr-xl">
            <Image
              onClick={openModal}
              src={`/assets/${images[2]?.key}`}
              layout="fill"
              objectFit="cover"
              alt={String(images[2]?.description)}
              className="cursor-pointer
              lg-rounded-tr-xl 
              md:rounded-tr-xl md:rounded-bl-none
              "
            />
          </div>
          {isViewModal ? (
            <div
              className="relative bg-gray-200
                          sm:rounded-bl-xl
                          rounded-bl-xl"
            >
              <Image
                onClick={openModal}
                src={`/assets/${images[3]?.key}`}
                layout="fill"
                objectFit="cover"
                alt={String(images[3]?.description)}
                className="cursor-pointer
              md:rounded-tr-none md:rounded-bl-none
              sm:rounded-bl-xl lg:rounded-bl-none
              rounded-bl-xl"
              />
            </div>
          ) : null}
          <div
            className="relative bg-gray-200 
                          2xl:rounded-br-xl
                          lg:rounded-br-xl
                          rounded-br-xl"
          >
            <Image
              onClick={openModal}
              src={`/assets/${images[1]?.key}`}
              layout="fill"
              objectFit="cover"
              alt={String(images[1]?.description)}
              className="cursor-pointer 
              2xl:rounded-br-xl 
              xl:rounded-br-xl 
              lg:rounded-br-xl 
              md:rounded-br-xl
              rounded-br-xl"
            />
          </div>
        </div>
      </div>
      {isViewModal ? (
        <Button
          variant="shaded"
          className="absolute bottom-2 md:bottom-4 right-1 md:right-4 bg-white"
          onClick={() => openModal()}
        >
          <Grip className="h-4 w-4 mr-2 mb-0.5" />
          Show all photos
        </Button>
      ) : null}
    </div>
  )
}

export default ImageGallery

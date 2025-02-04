import { Button } from "@/common/components/ui/Button"
import Image from "@/common/components/ui/image"
import { Grip } from "lucide-react"
import { Dialog } from "@headlessui/react"
import SliderImages from "@/common/components/SliderImages"
import { T_Photo } from "@repo/contract-2/photos"

type T_Image_Gallery = {
  isOpen?: boolean
  galleryHeight?: string
  openModal: (e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
  images: any
  isViewModal: boolean
  showThreeOnly?: boolean
  showTwoOnly?: boolean
  isRoundedEdge?: boolean
  isImageAllowClickView?: boolean
}

const ImageGallery = ({
  isOpen = false,
  openModal,
  images,
  isViewModal,
  showThreeOnly,
  showTwoOnly,
  isImageAllowClickView,
  isRoundedEdge,
  galleryHeight = "600px",
}: T_Image_Gallery) => {
  const getImgSrc = (index: number) => {
    const image = images[index]
    const imgSrc = image.image.url
    const imgAlt = image?.description || ""
    return { src: imgSrc, alt: imgAlt }
  }

  const getRoundedEdgeClass = (
    index: number,
    isRoundedEdge: boolean = false
  ) => {
    if (!isRoundedEdge) return ""

    if (showTwoOnly) {
      switch (index) {
        case 0:
          return "rounded-l-xl"
        case 1:
          return "rounded-r-xl"
        default:
          return ""
      }
    } else {
      switch (index) {
        case 0:
          return "rounded-l-xl"
        case 2:
          return "rounded-tr-xl"
        case 4:
          return "rounded-br-xl"
        default:
          return ""
      }
    }
  }

  const renderImage = (index: number, additionalClasses: string) => (
    <div className={`relative ${additionalClasses} w-full h-full`}>
      <Image
        onClick={(e) => openModal(e)}
        src={images ? getImgSrc(index).src : ""}
        fill
        style={{ objectFit: "cover" }}
        alt={images ? getImgSrc(index).alt : ""}
        className={`${getRoundedEdgeClass(index, isRoundedEdge)}  cursor-pointer`}
      />
    </div>
  )

  const renderButton = () => (
    <Button
      variant="shaded"
      className="absolute bottom-2 md:bottom-2 right-2 md:right-2 bg-white px-1 text-[10px] h-6 p-2"
      onClick={(e) => openModal(e)}
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
  } else if (showTwoOnly) {
    return (
      <div className="relative h-44">
        <div
          className="grid grid-cols-2 h-full gap-2 w-full"
          onClick={(e) => openModal(e)}
        >
          {renderImage(0, "rounded-lg")}
          {renderImage(1, "rounded-lg")}
        </div>
        {isViewModal && renderButton()}
        {isImageAllowClickView && (
          <Dialog
            open={isOpen}
            onClose={() => openModal()}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div
              className="relative w-full h-full bg-text-950/30"
              onClick={(e) => e.stopPropagation()}
            >
              <SliderImages images={images} />
              <button
                onClick={(e) => openModal(e)}
                className="absolute top-4 right-4 p-2 bg-text-100 rounded-full hover:bg-text-200 transition focus:outline-none"
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
        )}
      </div>
    )
  } else {
    return (
      <div className="relative" style={{ height: galleryHeight }}>
        <div
          className={`grid grid-cols-1 ${!isViewModal ? "border border-primary-500 rounded-xl" : ""} md:grid-cols-2 gap-x-2 gap-y-2 md:gap-y-0 h-full`}
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
            onClick={() => openModal()}
          >
            <Grip className="h-4 w-4 mr-2 mb-0.5" />
            Show all photos
          </Button>
        )}
        <Dialog
          open={isOpen}
          onClose={() => openModal()}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="relative w-full h-full bg-text-950/70">
            <SliderImages images={images} />
            <button
              onClick={(e) => openModal(e)}
              className="absolute top-4 right-4 p-2 bg-text-100 rounded-full hover:bg-text-200 transition focus:outline-none"
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
}

export default ImageGallery

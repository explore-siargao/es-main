import Image from "@/common/components/ui/image"
import { Dialog } from "@headlessui/react"
import SliderImages from "@/common/components/SliderImages"
import { T_Photo } from "@repo/contract-2/photos"

type T_Image_Gallery = {
  isOpen?: boolean
  openModal: (e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
  images: T_Photo[]
}

const UnitImageGallery = ({
  isOpen = false,
  openModal,
  images,
}: T_Image_Gallery) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => openModal()}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="relative w-full h-full bg-text-950/70"
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
  )
}

export default UnitImageGallery

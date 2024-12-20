import ModalContainer from "@/common/components/ModalContainer"
import ShareSave from "@/module/Listing/property/share-save"
import Image from "@/common/components/ui/image"
import { T_ImageGalleryModalProps } from "../types/SectionInfo"

const ImageGalleryModal = ({
  images,
  isOpen,
  onClose,
}: T_ImageGalleryModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="full">
      <div className="relative space-y-1 pt-2 pb-20 h-screen overflow-y-auto">
        <div className="flex justify-center my-4">
          <ShareSave />
        </div>
        {images.map((data) => {
          return (
            <div className="relative h-60 w-10/12 md:w-1/2 lg:w-1/3 mx-auto bg-gray-200">
              <Image
                src={`/assets/${data.key}`}
                fill
                style={{ objectFit: "cover" }}
                alt={`${data.description}`}
              />
            </div>
          )
        })}
      </div>
    </ModalContainer>
  )
}

export default ImageGalleryModal

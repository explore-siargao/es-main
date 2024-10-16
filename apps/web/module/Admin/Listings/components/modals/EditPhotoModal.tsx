import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import Image from "@/common/components/ui/image"
import usePhotoStore from "../../store/usePhotoStore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const EditPhotoModal = ({ isOpen, onClose }: Props) => {
  const photos = usePhotoStore((state) => state.photos)
  const toEditPhotoIndex = usePhotoStore((state) => state.toEditPhotoIndex)
  const setDescription = usePhotoStore((state) => state.setDescription)
  const setTags = usePhotoStore((state) => state.setTags)
  const setMainPhoto = usePhotoStore((state) => state.setMainPhoto)
  const removePhoto = usePhotoStore((state) => state.removePhoto)
  const currentPhoto =
    typeof toEditPhotoIndex === "number" && toEditPhotoIndex > -1
      ? photos[toEditPhotoIndex]
      : null
  const [description, editDescription] = useState(currentPhoto?.description)
  const [tags, editTags] = useState(currentPhoto?.tags)
  const [isMain, setIsMain] = useState(currentPhoto?.isMain || false)

  useEffect(() => {
    editDescription(currentPhoto?.description)
    editTags(currentPhoto?.tags)
    setIsMain(currentPhoto?.isMain || false)
  }, [isOpen])

  return (
    <ModalContainer
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Photo"
    >
      <div className="py-6 px-5">
        <div className="relative h-80 w-full bg-primary-50">
          <Image
            src={currentPhoto?.file?.preview || `/assets/${currentPhoto?.key}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="image-preview"
          />
        </div>
        <Typography variant="h4" fontWeight="semibold" className="mt-4 mb-2">
          Description
        </Typography>
        <textarea
          rows={4}
          id="description"
          className="block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
          placeholder="Enter photo description here"
          defaultValue={description}
          onChange={(e) => editDescription(e.currentTarget.value)}
          tabIndex={-1}
        />
        <Typography variant="h4" fontWeight="semibold" className="mt-6 mb-2">
          Tags
        </Typography>
        <input
          type="text"
          id="tags"
          className="block w-72 rounded-md pl-3 pr-[41px] border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="Enter photo tag here"
          defaultValue={tags}
          onChange={(e) => editTags(e.currentTarget.value)}
          tabIndex={-1}
        />
        <div className="flex mt-6 items-center">
          <input
            id="main"
            aria-describedby="main"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            tabIndex={-1}
            checked={isMain as boolean}
            onChange={() => {
              const mainPhotoExist = photos.some((photo) => photo.isMain)

              if (mainPhotoExist && !isMain) {
                toast.error(
                  "One of your photos is already marked as the main photo. Unmark it to set a new one."
                )
              } else {
                setIsMain((state: boolean | string) => !state)
              }
            }}
          />
          <label htmlFor="main" className="text-sm ml-3">
            Mark as main photo
          </label>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button
            variant="default"
            size="sm"
            type="button"
            tabIndex={-1}
            onClick={() => {
              setDescription(description as string)
              setTags(tags as string)
              setMainPhoto(isMain as boolean)
              toast.success("Photo successfully updated")
            }}
          >
            Save
          </Button>
          <Button
            variant="danger"
            size="sm"
            type="button"
            tabIndex={-1}
            onClick={() => {
              removePhoto()
              onClose()
              toast.success("Photo successfully removed")
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default EditPhotoModal

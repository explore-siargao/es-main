import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import Image from "next/image"
import usePhotoStore from "../../store/usePhotoStore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import { Textarea2 } from "@/common/components/ui/Textarea2"

type Props = {
  isOpen: boolean
  onClose: () => void
  passedCategory?: string
}

const EditPhotoModal = ({ isOpen, onClose, passedCategory }: Props) => {
  const setPhotos = usePhotoStore((state) => state.setPhotos)
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
  const category = usePhotoStore((state) => state.category)
  const setCategory = usePhotoStore((state) => state.setCategory)

  useEffect(() => {
    editDescription(currentPhoto?.description)
    editTags(currentPhoto?.tags)
    setIsMain(currentPhoto?.isMain || false)
  }, [isOpen])

  useEffect(() => {
    if (passedCategory) {
      setCategory(passedCategory)
    }
  }, [passedCategory, setCategory])

  const getDescription = () => {
    switch (category) {
      case "Room":
        return "Add description for your room photos"
      case "Bed":
        return "Add description for your bed photos"
      case "Whole-Place":
        return "Add description for your livingroom photos"
      case "Motorbike":
        return "Add description for your motorbike photos"
      case "Car":
        return "Add description for your car photos"
      case "Bicycle":
        return "Add description for your bicycle photos"
      case "Property":
        return "Add description for your property photos"
      default:
        return "Add description for your activity photos"
    }
  }
  const getPlaceholder = () => {
    switch (category) {
      case "Room":
        return "Example: Front view of room unit."
      case "Bed":
        return "Example: Front view of bed unit."
      case "Whole-Place":
        return "Example: Front view of livingroom unit."
      case "Motorbike":
        return "Example: Front view of motorbike unit."
      case "Car":
        return "Example: Front view of car unit."
      case "Bicycle":
        return "Example: Front view of bicycle unit."
      case "Property":
        return "Example: Front view of property unit."
      default:
        return "Example: This is one of our popular activity"
    }
  }
  const getTags = () => {
    switch (category) {
      case "Room":
        return "Example: Simple, minimalist"
      case "Bed":
        return "Example: Window view, morning breeze"
      case "Whole-Place":
        return "Example: Aesthetic interior, river view"
      case "Motorbike":
        return "Example: Sporty, fast"
      case "Car":
        return "Example: Relaxing, convinient, spacious"
      case "Bicycle":
        return "Example: Lightweight, chill"
      case "Property":
        return "Example: Amazing view, clean and simple"
      default:
        return "Example: Most popular, safety, tour"
    }
  }
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
        <div className="w-72 mt-4">
          <Textarea2
            label=" Description"
            rows={4}
            id="description"
            className="block  rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            description={getDescription()}
            placeholder={getPlaceholder()}
            defaultValue={description}
            onChange={(e) => editDescription(e.currentTarget.value)}
            required
            tabIndex={-1}
          />
        </div>

        <div className="mt-6 mb-2  w-72 ">
          <Textarea2
            label="Tags"
            rows={2}
            id="tags"
            className="blockrounded-xl pl-3 pr-[41px] border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            description="Enter tags separated by commas"
            placeholder={getTags()}
            defaultValue={tags}
            onChange={(e) => editTags(e.currentTarget.value)}
            tabIndex={-1}
            required
          />
        </div>

        <div className="flex mt-6 items-center">
          <input
            id="main"
            aria-describedby="main"
            type="checkbox"
            disabled={photos?.length < 2}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 disabled:opacity-70"
            tabIndex={-1}
            checked={isMain as boolean}
            onChange={() => {
              setIsMain((state: boolean | string) => !state)
            }}
          />
          <label
            htmlFor="main"
            className={cn(`text-sm ml-3`, photos?.length < 2 && "opacity-70")}
          >
            Mark as main photo
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex space-x-3">
            <Button
              variant="default"
              size="sm"
              type="button"
              tabIndex={-1}
              onClick={() => {
                if (isMain !== currentPhoto?.isMain) {
                  const updatedIsMainPhotos = photos.map((photo, index) => {
                    return {
                      ...photo,
                      isMain:
                        typeof toEditPhotoIndex === "number" &&
                        toEditPhotoIndex > -1 &&
                        toEditPhotoIndex === index &&
                        isMain,
                    }
                  })
                  setPhotos([...updatedIsMainPhotos])
                }
                setDescription(description as string)
                setTags(tags as string)
                setMainPhoto(isMain as boolean)
                toast.success("Photo successfully updated")
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              tabIndex={-1}
              onClick={() => onClose()}
            >
              Close
            </Button>
          </div>
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
            Remove Photo
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default EditPhotoModal

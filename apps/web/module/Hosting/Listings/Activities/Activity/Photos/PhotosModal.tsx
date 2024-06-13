import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { IPhotos } from "@/common/types/global"
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form"
import useUpdatePropertyPhotos from "../../../hooks/useUpdatePropertyPhotos"
import toast from "react-hot-toast"
import { T_Photo } from "@repo/contract"

interface ISetUpProfileAboutYouModalProps {
  isModalOpen: boolean
  onClose: () => void
  selectedPhoto: IPhotos
}

const PhotosModal = ({
  isModalOpen,
  onClose,
  selectedPhoto,
}: ISetUpProfileAboutYouModalProps) => {
  const { mutate } = useUpdatePropertyPhotos(1)

  const { register, handleSubmit } = useForm<T_Photo>()

  const onSubmit: SubmitHandler<T_Photo> = async (formData) => {
    try {
      // await mutate(formData)
      toast.success("Update tag successful!")
    } catch (error) {
      toast.error("Update tag failed. Please try again.")
    }
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="md"
      title="Photo Information"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="flex gap-4">
          <div className="w-full flex flex-col">
            <div className="mb-8">
              <Typography
                variant="h1"
                fontWeight="semibold"
                className="flex justify-between items-center"
              >
                Add tag
              </Typography>
            </div>
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  className=" w-3/4"
                  label={"Tag"}
                  defaultValue={selectedPhoto?.tags || ""}
                  {...register("tags")}
                />

                <div className="mt-4">
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full h-[30rem] overflow-hidden rounded-xl">
              {selectedPhoto && typeof selectedPhoto !== "string" && (
                <div className="relative w-full h-[30rem] overflow-hidden rounded-xl">
                  <Image
                    src={`/assets/${selectedPhoto.key}`}
                    alt={selectedPhoto.tags}
                    fill
                    className="object-fill"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default PhotosModal

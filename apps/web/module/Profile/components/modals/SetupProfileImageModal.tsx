import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { LucideUndo2 } from "lucide-react"
import React, { useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import Image from "@/common/components/ui/image"
import { cn } from "@/common/helpers/cn"
import useProfileEditStore from "../../Setup/store/useProfileEditStore"

interface ISetUpProfileAboutYouModalProps {
  isModalOpen: boolean
  onClose: () => void
}
const SetupProfileImageModal = ({
  isModalOpen,
  onClose,
}: ISetUpProfileAboutYouModalProps) => {
  const [file, setFile] = useState<(FileWithPath & { preview: string }) | null>(
    null
  )
  const [imageSaved, setImageSaved] = useState(false)
  const { setProfileImage } = useProfileEditStore()

  const handleSaveImage = () => {
    onClose()
    if (!imageSaved && file) {
      setImageSaved(true)
      setProfileImage(file)
    } else {
      toast.error("Image not saved")
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    setImageSaved(false)
    setProfileImage(null)
  }
  const { getRootProps, getInputProps, isFocused } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setFile(
        // @ts-ignore
        Object.assign(acceptedFiles[0], {
          // @ts-ignore
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      )
    },
    onDropRejected: () => {
      toast.error("Only images and videos are allowed")
    },
    // disabled: isPending,
  })

  return (
    <ModalContainer
      title="Add profile picture"
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
    >
      <div className="px-4 pb-4">
        <div className="w-300 h-300 mx-auto">
          {file ? (
            <div className="flex justify-center my-6 bg-primary-50 rounded-xl border border-primary-200">
              <div className="relative h-96">
                <Image
                  src={file?.preview ?? "/assets/1.jpg"}
                  alt={`Profile picture`}
                  width={300}
                  height={300}
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
            </div>
          ) : (
            <label
              {...getRootProps()}
              htmlFor="dropzone-file"
              className={cn(
                // isPending && "opacity-50",
                isFocused && "opacity-80",
                "flex flex-col items-center justify-center w-full h-64 border-2 border-primary-300 border-dashed rounded-xl cursor-pointer bg-primary-50 hover:bg-primary-100 mt-4"
              )}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-primary-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <Typography className="mb-2 text-text-500 d">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </Typography>
                <Typography className="text-xs text-text-500">
                  PNG, JPG or GIF (MAX. 800x400px)
                </Typography>
              </div>
              <input {...getInputProps()} />
            </label>
          )}
          {file && (
            <>
              <div className="flex items-center md:bottom-0">
                <div className="flex justify-between w-full">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={handleRemoveImage}
                  >
                    <LucideUndo2 className="h-6 w-6 text-text-700 group-hover:text-text-600 pr-2" />
                    Undo image
                  </Button>
                </div>
                <div className="flex justify-between w-full">
                  <Button
                    variant="primary"
                    className="ml-auto"
                    onClick={handleSaveImage}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  )
}

export default SetupProfileImageModal

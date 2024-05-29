import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import useProfileEditStore from "@/module/Profile/Setup/store/useProfileEditStore"
import SetupProfileImageModal from "@/module/Profile/components/modals/SetupProfileImageModal"
import { LucideUndo2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const SetupProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { imageFile, imageKey } = useProfileEditStore()
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="relative">
      <div className="rounded-full flex justify-center">
        {imageFile || imageKey ? (
          <div className={cn("grid")}>
            <div className={cn("w-full", "flex", "flex-col", "relative mb-4")}>
              <div
                className={cn(
                  "relative",
                  "h-52",
                  "w-52 rounded-full",
                  "overflow-hidden",
                  "border-4",
                  "border-white z-10"
                )}
              >
                <Image
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : `/assets/${imageKey}`
                  }
                  alt={`Profile picture`}
                  width={300}
                  height={300}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={cn("grid")}>
            <div className={cn("w-full", "flex", "flex-col", "relative mb-4")}>
              <div className="relative h-52 w-52 rounded-full overflow-hidden border-2 bg-gray-100 border-primary-400 border-dashed">
                <label
                  htmlFor="dropzone-file"
                  className={cn("flex flex-col h-64 rounded-full")}
                ></label>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center -mt-10">
        <Button
          variant="ghost"
          size="default"
          className={cn(
            "flex gap-1 bg-white hover:bg-primary-50 shadow-xl rounded-full z-20"
          )}
          onClick={openModal}
        >
          <LucideUndo2 className="h-4 w-4" />
          <Typography className="text-sm">Edit</Typography>
        </Button>
      </div>
      <SetupProfileImageModal isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default SetupProfileImage

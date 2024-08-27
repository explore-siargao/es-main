"use client"
import { useEffect, useState } from "react"
import { Spinner } from "@/common/components/ui/Spinner"
import toast from "react-hot-toast"
import { Typography } from "@/common/components/ui/Typography"
import Image from "next/image"
import usePhotoStore from "../../../store/usePhotoStore"
import { FileWithPath, useDropzone } from "react-dropzone"
import EditPhotoModal from "../../../components/modals/EditPhotoModal"
import { cn } from "@/common/helpers/cn"
import { Button } from "@/common/components/ui/Button"
import { useParams, useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import useGetPropertyById from "../../../hooks/useGetPropertyById"
import useUpdatePropertyPhotos from "../../../hooks/useUpdatePropertyPhotos"

type Prop = {
  pageType: "setup" | "edit"
}

const ListingPhotos = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const [editPhotoModal, setEditPhotoModal] = useState(false)
  const { data, isLoading } = useGetPropertyById(listingId)
  const { mutate, isPending } = useUpdatePropertyPhotos(listingId)

  const photos = usePhotoStore((state) => state.photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)
  const setToEditPhotoIndex = usePhotoStore(
    (state) => state.setToEditPhotoIndex
  )

  const { getRootProps, getInputProps, isFocused } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedPhotos: FileWithPath[]) => {
      const updatedPhotos = acceptedPhotos.map((file) => ({
        file: {
          ...file,
          preview: URL.createObjectURL(file),
        },
        key: "4.jpg",
        description: "",
        tags: "",
        isMain: false,
      }))
      setPhotos([...photos, ...updatedPhotos])
    },
    onDropRejected: () => {
      toast.error("Only images are allowed")
    },
    disabled: isPending,
  })

  const handleSave = () => {
    if (
      photos.length > 4 ||
      (data?.item?.Photos && data?.item?.Photos.length > 4)
    ) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(data.message)
            queryClient.invalidateQueries({
              queryKey: ["property", listingId],
            })
            queryClient.invalidateQueries({
              queryKey: ["property-finished-sections", listingId],
            })
            if (pageType === "setup") {
              router.push(
                `/hosting/listings/properties/setup/${listingId}/pricing`
              )
            }
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate({ photos }, callBackReq)
    } else {
      toast.error("Please add at least 5 photos")
    }
  }

  useEffect(() => {
    if (!isPending && data && data.item) {
      // @ts-ignore
      setPhotos(data?.item?.Photos)
    }
  }, [data, isPending])

  return (
    <div className="mt-20 mb-14">
      <div className="mb-3">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center"
        >
          Photos
        </Typography>
      </div>
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <>
          <Typography
            variant="h6"
            fontWeight="semibold"
            className="text-gray-500 mb-0.5 italic"
          >
            Please upload atleast 5 photos
          </Typography>
          <Typography
            variant="h6"
            fontWeight="semibold"
            className="text-gray-500 mb-0.5 italic"
          >
            Minimum dimension is 800x600
          </Typography>
          <Typography
            variant="h6"
            fontWeight="semibold"
            className="text-gray-500 mb-0.5 italic"
          >
            Maximum file size is 10mb
          </Typography>
          <Typography
            variant="h6"
            fontWeight="semibold"
            className="text-gray-500 mb-0.5 italic"
          >
            No photographer watermarks, logos, or readable license plates
          </Typography>
          <Typography
            variant="h6"
            fontWeight="semibold"
            className="text-gray-500 mb-0.5 italic"
          >
            Avoid screenshots/photos of printed maps or branded bus routes
          </Typography>
          <Typography
            variant="h6"
            fontWeight="semibold"
            className="text-gray-500 mb-4 italic"
          >
            No portrait/vertical format, selfies, or black and white images
          </Typography>
          <div className="grid grid-cols-4 gap-6">
            {isPending ? (
              <Spinner size="md">Loading...</Spinner>
            ) : (
              <>
                <div className="relative h-52 w-full overflow-hidden bg-primary-100 hover:bg-primary-200 flex justify-center items-center rounded-xl hover:cursor-pointer">
                  <label
                    {...getRootProps()}
                    htmlFor="dropzone-file"
                    className={cn(
                      isPending && "opacity-50",
                      isFocused && "opacity-80",
                      "flex flex-col items-center justify-center w-full h-52 border-2 border-primary-300 border-dashed rounded-xl cursor-pointer bg-primary-50 hover:bg-primary-100"
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
                      <Typography className="mb-2 text-text-500 px-2 text-center">
                        <span className="font-semibold">Drop photos here</span>{" "}
                        or click this
                      </Typography>
                      <Typography className="text-xs text-text-500">
                        PNG, JPG or GIF
                      </Typography>
                    </div>
                    <input {...getInputProps()} />
                  </label>
                </div>
                {photos.map((photo, index) => (
                  <div key={index} className="h-full">
                    {photo.isMain && (
                      <div className="flex justify-center">
                        <span className="absolute mt-[-16px] z-10 rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                          Preferred main photo
                        </span>
                      </div>
                    )}
                    <button
                      className={cn(
                        `relative h-52 w-full bg-primary-50 rounded-xl`,
                        photo.isMain && "border-2 border-secondary-500"
                      )}
                      type="button"
                      onClick={() => {
                        setToEditPhotoIndex(index)
                        setEditPhotoModal(true)
                      }}
                    >
                      <Image
                        src={photo?.file?.preview ?? `/assets/${photo.key}`}
                        alt={`preview-` + index}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-xl"
                      />
                    </button>
                    <Typography
                      className={`${photo.description ? "text-gray-900" : "text-gray-500"} text-sm mt-3 truncate`}
                    >
                      {photo.description || "No description"}
                    </Typography>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
            <Button
              size="sm"
              type="submit"
              onClick={handleSave}
              className={cn(
                "disabled:bg-gray-600",
                isLoading || isPending ? "opacity-70 cursor-progress" : ""
              )}
            >
              {pageType === "setup" ? "Save & Next" : "Save changes"}
            </Button>
          </div>
          <EditPhotoModal
            isOpen={editPhotoModal}
            onClose={() => setEditPhotoModal(false)}
          />
        </>
      )}
    </div>
  )
}

export default ListingPhotos

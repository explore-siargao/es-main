"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Spinner } from "@/common/components/ui/Spinner"
import { useForm, SubmitHandler } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { T_Property_Basic_Info } from "@repo/contract"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/common/helpers/cn"
import useUpdatePropertyBasicInfo from "../../hooks/useUpdatePropertyBasicInfo"
import useGetPropertyById from "../../../hooks/useGetPropertyById"
import { Input2 } from "@/common/components/ui/Input2"
import { Textarea2 } from "@/common/components/ui/Textarea2"
import { useState } from "react"

type Prop = {
  pageType: "setup" | "edit"
}

const BasicInfo = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetPropertyById(listingId as unknown as number)
  const { mutate, isPending } = useUpdatePropertyBasicInfo(listingId)
  const { register, handleSubmit } = useForm<T_Property_Basic_Info>()
  const [description, setDescription] = useState("")

  const onSubmit: SubmitHandler<T_Property_Basic_Info> = (formData) => {
    if (description.length < 500) {
      return toast.error("Minumum length of description is 500")
    }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["property-finished-sections", listingId],
          })
          queryClient.invalidateQueries({
            queryKey: ["property", listingId],
          })
          if (pageType === "setup") {
            router.push(
              `/hosting/listings/properties/setup/${listingId}/location`
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
    mutate(formData, callBackReq)
  }

  return (
    <div className="mt-20 mb-14">
      <div className="mb-8">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center"
        >
          Basic Information
        </Typography>
      </div>
      {isLoading ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3">
          <div className="col-span-1 ">
            <div>
              <Input2
                type="text"
                label="Title"
                description="This is the name that will appear as the title of your listing on our site."
                placeholder="Example: Tropical Tide Villas"
                disabled={isLoading || isPending}
                required
                defaultValue={data?.item?.title}
                {...register("title", { required: true })}
                className="mb-8"
              />
            </div>

            <div className="mt-2">
              <Textarea2
                className="mt-1 h-96"
                description="This is the description that will appear on your listing to highlight your hotel's features and amenities."
                placeholder="Example: Escape to our beachfront resort, where luxury meets relaxation. Enjoy spacious rooms with ocean views, fine dining, a world-class spa, and activities for all ages. Located near popular attractions, our resort offers the perfect blend of adventure and tranquility for your unforgettable vacation."
                defaultValue={data?.item?.description}
                disabled={isLoading || isPending}
                label="Description"
                required
                {...register("description", { required: true })}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={3000}
              />
            </div>
            <p className=" flex text-xs text-gray-500 justify-end">{`${description.length}/3000 characters`}</p>
          </div>
          <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
            <Button
              size="sm"
              type="submit"
              className={cn(
                "disabled:bg-gray-600",
                isLoading || isPending ? "opacity-70 cursor-progress" : ""
              )}
            >
              {pageType === "setup" ? "Save & Next" : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default BasicInfo

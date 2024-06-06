"use client"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Textarea } from "@/common/components/ui/Textarea"
import { Typography } from "@/common/components/ui/Typography"
import { Spinner } from "@/common/components/ui/Spinner"
import useUpdatePropertyBasicInfo from "../../../hooks/useUpdatePropertyBasicInfo"
import { useForm, SubmitHandler } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { T_Property_Basic_Info } from "@repo/contract"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import useGetPropertyById from "../../../hooks/useGetPropertyById"
import { cn } from "@/common/helpers/cn"

type Prop = {
  pageType: "setup" | "edit"
}

const BasicInfo = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetPropertyById(listingId)
  const { mutate, isPending } = useUpdatePropertyBasicInfo(listingId)
  const { register, handleSubmit } = useForm<T_Property_Basic_Info>()

  const onSubmit: SubmitHandler<T_Property_Basic_Info> = (formData) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["property-finished-sections", listingId],
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
          <div className="col-span-1">
            <Input
              type="text"
              label="Name"
              disabled={isLoading || isPending}
              required
              defaultValue={data?.item?.name}
              {...register("name", { required: true })}
            />
            <div className="mt-2">
              <Textarea
                className="mt-1"
                defaultValue={data?.item?.description}
                disabled={isLoading || isPending}
                label="Description"
                required
                {...register("description", { required: true })}
              />
            </div>
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

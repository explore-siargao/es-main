"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import ItemList from "./ItemList"
import RadioInput from "./RadioInput"
import { Button } from "@/common/components/ui/Button"
import { useItemStore, useRadioStore } from "./store/useItemStore"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import useGetAdditionalInfoByActivityId from "../../hooks/useGetAdditionalInfoByActivityId"
import { Spinner } from "@/common/components/ui/Spinner"
import useUpdateActivityAdditionalInfo from "../../hooks/useUpdateActivityAdditionalInfo"
import toast from "react-hot-toast"
import { QueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { T_UpdateActivityAdditionalInfo } from "@repo/contract"
import { useParams } from "next/navigation"

const radioItems = [
  { id: "1", value: 5, label: "5 days" },
  { id: "2", value: 10, label: "10 days" },
  { id: "3", value: 0, label: "Non-refundable" },
]

type Prop = {
  pageType: "setup" | "edit"
}

const AdditionalInfo = ({ pageType }: Prop) => {
  const params = useParams<{ listingId: string }>()
  const activityId = String(params.listingId)
  const queryClient = new QueryClient()
  const { whatToBring, setWhatToBring } = useItemStore()
  const { notAllowed, setNotAllowed } = useItemStore()
  const { policies, setPolicies } = useItemStore()
  const { cancellationDays, setCancellationDays } = useRadioStore()
  const { data, isPending } = useGetAdditionalInfoByActivityId(activityId)
  const { mutate, isPending: updateActivityAdditionalInfo } =
    useUpdateActivityAdditionalInfo(activityId)
  const { handleSubmit } = useForm<T_UpdateActivityAdditionalInfo>({})

  useEffect(() => {
    if (data) {
      setWhatToBring(data?.item?.whatToBring || [])
      setNotAllowed(data?.item?.notAllowed || [])
      setPolicies(data?.item?.policies || [])
      setCancellationDays(data?.item?.cancellationDays || null)
    }
  }, [data, setWhatToBring, setNotAllowed, setPolicies, setCancellationDays])

  const onSubmit: SubmitHandler<T_UpdateActivityAdditionalInfo> = () => {
    const payload = {
      whatToBring: whatToBring,
      notAllowed: notAllowed,
      policies: policies,
      cancellationDays: cancellationDays || null || undefined,
    }
    if (typeof payload.whatToBring === "string") {
      payload.whatToBring = JSON.parse(payload.whatToBring)
    }
    if (typeof payload.notAllowed === "string") {
      payload.notAllowed = JSON.parse(payload.notAllowed)
    }
    if (typeof payload.policies === "string") {
      payload.policies = JSON.parse(payload.policies)
    }
    if (cancellationDays !== null) {
      payload.cancellationDays = cancellationDays
    }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["update-activity-additional-info"],
          })
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }

    mutate(payload, callBackReq)
  }

  return (
    <div className="mt-20 mb-28">
      <form onSubmit={handleSubmit(onSubmit)}>
        {isPending ? (
          <Spinner size="md">Loading...</Spinner>
        ) : (
          <>
            <div className="md:w-1/4">
              <Typography variant="h1" fontWeight="semibold" className="mb-4">
                Additional Information
              </Typography>
              <ItemList title="What to Bring" category="whatToBring" />
              <ItemList title="Not Allowed" category="notAllowed" />
              <ItemList
                title="Activity Policies"
                category="policies"
                buttonName="Add another policy"
              />
            </div>
            <div>
              <Typography fontWeight="semibold" className="mt-4 mb-2">
                Cancellation Policy
              </Typography>
              <RadioInput
                radioItems={radioItems}
                className="space-y-2"
                selectedValue={cancellationDays}
                setSelectedValue={setCancellationDays}
              />
            </div>
            <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
              <Button size="sm" type="submit">
                {updateActivityAdditionalInfo ? (
                  <Spinner>Loading...</Spinner>
                ) : (
                  " Save Changes"
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default AdditionalInfo

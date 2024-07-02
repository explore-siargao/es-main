"use client"
import React, { useEffect, useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import { Spinner } from "@/common/components/ui/Spinner"
import useUpdateActivityAdditionalInfo from "../../hooks/useUpdateActivityAdditionalInfo"
import toast from "react-hot-toast"
import { SubmitHandler, useForm } from "react-hook-form"
import { T_Update_Activity_Additional_Info } from "@repo/contract"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/common/components/ui/Input"
import { LucidePlus, LucideX } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import useGetActivityById from "../../hooks/useGetActivityById"

const radioItems = [
  { id: "1", value: 5, label: "5 days" },
  { id: "2", value: 10, label: "10 days" },
  { id: "3", value: 0, label: "Non-refundable" },
]

type Prop = {
  pageType: "setup" | "edit"
}

interface Item {
  id: number
  name: string
}

const AdditionalInfo = ({ pageType }: Prop) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const activityId = String(params.listingId)
  const queryClient = useQueryClient()

  const [whatToBring, setWhatToBring] = useState<Item[]>([])
  const [whatToBringName, setWhatToBringName] = useState<string>("")

  const [notAllowed, setNotAllowed] = useState<Item[]>([])
  const [notAllowedName, setNotAllowedName] = useState<string>("")

  const [policies, setPolicies] = useState<Item[]>([])
  const [policyName, setPolicyName] = useState<string>("")

  const [cancellationDays, setCancellationDays] = useState<string | null>(null)
  const { data, isPending } = useGetActivityById(activityId)
  const { mutate, isPending: updateActivityAdditionalInfo } =
    useUpdateActivityAdditionalInfo(activityId)
  const { handleSubmit } = useForm<T_Update_Activity_Additional_Info>({})

  useEffect(() => {
    if (!isPending && data && data.item) {
      setWhatToBring(
        (data.item?.whatToBring || []).map((name: string, index: number) => ({
          id: index + 1,
          name,
        }))
      )
      setNotAllowed(
        (data.item?.notAllowed || []).map((name: string, index: number) => ({
          id: index + 1,
          name,
        }))
      )
      setPolicies(
        (data.item?.policies || []).map((name: string, index: number) => ({
          id: index + 1,
          name,
        }))
      )
      setCancellationDays(data?.item?.cancellationDays || null)
    }
  }, [data, isPending])

  const removeItem = (
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    idToRemove: number
  ) => {
    setList((prevItems) => prevItems.filter((item) => item.id !== idToRemove))
  }

  const addItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const itemName = name.trim()
    if (!itemName) {
      toast.error("Add item first")
      return
    }
    const newItem = { id: Date.now(), name: itemName }
    setList([...list, newItem])
    setName("")
  }

  const onSubmit: SubmitHandler<T_Update_Activity_Additional_Info> = () => {
    const payload = {
      whatToBring: whatToBring.map((item) => item.name),
      notAllowed: notAllowed.map((item) => item.name),
      policies: policies.map((item) => item.name),
      cancellationDays: cancellationDays,
    }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["activity", activityId],
          })
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["activity-finished-sections", activityId],
            })
            router.push(
              `/hosting/listings/activities/setup/${activityId}/photos`
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
    mutate(payload, callBackReq)
  }

  return (
    <div className="mt-20 mb-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6"
      >
        {isPending ? (
          <Spinner size="md">Loading...</Spinner>
        ) : (
          <>
            <div>
              <Typography variant="h1" fontWeight="semibold" className="mb-4">
                Additional Information
              </Typography>

              <div className="mt-4">
                <Typography variant="h4" fontWeight="semibold" className="mb-4">
                  What are the things that guest/s need to bring?
                </Typography>
                {whatToBring.length > 0 && (
                  <ul>
                    {whatToBring.map((item) => (
                      <li
                        key={item.id}
                        className="mt-2 p-2 border border-gray-100 rounded-md flex justify-between items-center"
                      >
                        <p className="text-sm">{item.name}</p>
                        <button
                          className="hover:cursor-pointer"
                          onClick={() => removeItem(setWhatToBring, item.id)}
                          aria-label="Remove Item"
                        >
                          <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2">
                  <Input
                    className="p-2 rounded-md"
                    type="text"
                    label="Bring"
                    value={whatToBringName}
                    onChange={(event) => {
                      const inputValue = event.target.value
                      setWhatToBringName(inputValue)
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="flex hover:cursor-pointer mt-2 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                      onClick={() => {
                        addItem(
                          whatToBring,
                          setWhatToBring,
                          whatToBringName,
                          setWhatToBringName
                        )
                      }}
                    >
                      <LucidePlus
                        color="black"
                        className="rounded-sm w-4 h-4"
                      />
                      <Typography className="text-sm"> Add item</Typography>
                    </button>
                  </div>
                  <Typography className="text-xs text-gray-500 italic mt-2">
                    Such as a swimmers or a towel for water activities, or
                    comfortable shoes for a hike. Add a new item for each one.
                  </Typography>
                </div>
              </div>

              <div className="mt-4">
                <Typography variant="h4" fontWeight="semibold" className="mb-4">
                  What are the things or actions that are not allowed?
                </Typography>
                {notAllowed.length > 0 && (
                  <ul>
                    {notAllowed.map((item) => (
                      <li
                        key={item.id}
                        className="mt-2 p-2 border border-gray-100 rounded-md flex justify-between items-center"
                      >
                        <p className="text-sm">{item.name}</p>
                        <button
                          className="hover:cursor-pointer"
                          onClick={() => removeItem(setNotAllowed, item.id)}
                          aria-label="Remove Item"
                        >
                          <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2">
                  <Input
                    className="p-2 rounded-md"
                    type="text"
                    label="Allow"
                    value={notAllowedName}
                    onChange={(event) => {
                      const inputValue = event.target.value
                      setNotAllowedName(inputValue)
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="flex hover:cursor-pointer mt-2 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                      onClick={() => {
                        addItem(
                          notAllowed,
                          setNotAllowed,
                          notAllowedName,
                          setNotAllowedName
                        )
                      }}
                    >
                      <LucidePlus
                        color="black"
                        className="rounded-sm w-4 h-4"
                      />
                      <Typography className="text-sm"> Add item</Typography>
                    </button>
                  </div>
                  <Typography className="text-xs text-gray-500 italic mt-2">
                    List any object, clothing, or action that's not allowed on
                    your activity. You should include types of travelers who
                    should not join this activity, like under 18s or pregnant
                    women. Add a new item for each one.
                  </Typography>
                </div>
              </div>

              <div className="mt-4">
                <Typography variant="h4" fontWeight="semibold" className="mb-4">
                  What are the policies for this activity?
                </Typography>
                {policies.length > 0 && (
                  <ul>
                    {policies.map((item) => (
                      <li
                        key={item.id}
                        className="mt-2 p-2 border border-gray-100 rounded-md flex justify-between items-center"
                      >
                        <p className="text-sm">{item.name}</p>
                        <button
                          className="hover:cursor-pointer"
                          onClick={() => removeItem(setPolicies, item.id)}
                          aria-label="Remove Item"
                        >
                          <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2">
                  <Input
                    className="p-2 rounded-md"
                    type="text"
                    label="Policy"
                    value={policyName}
                    onChange={(event) => {
                      const inputValue = event.target.value
                      setPolicyName(inputValue)
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="flex hover:cursor-pointer mt-2 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                      onClick={() => {
                        addItem(
                          policies,
                          setPolicies,
                          policyName,
                          setPolicyName
                        )
                      }}
                    >
                      <LucidePlus
                        color="black"
                        className="rounded-sm w-4 h-4"
                      />
                      <Typography className="text-sm"> Add item</Typography>
                    </button>
                  </div>
                  <Typography className="text-xs text-gray-500 italic mt-2">
                    List any activity policies, such as prerequisites, valid ID
                    required, weather retalated cancellation policy. Add a new
                    policy for each one.
                  </Typography>
                </div>
              </div>

              <div>
                <Typography
                  variant="h4"
                  fontWeight="semibold"
                  className="mt-4 mb-2"
                >
                  Cancellation Policy
                </Typography>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      id="fiveDays"
                      type="radio"
                      name="cancellationDays"
                      disabled={isPending}
                      defaultChecked={data?.item?.cancellationDays === "5 Days"}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                      onChange={(e) => setCancellationDays(e.target.value)}
                      value="5 Days"
                    />
                    <label
                      htmlFor="fiveDays"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      5 Days
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="tenDays"
                      type="radio"
                      name="cancellationDays"
                      disabled={isPending}
                      defaultChecked={
                        data?.item?.cancellationDays === "10 Days"
                      }
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                      onChange={(e) => setCancellationDays(e.target.value)}
                      value="10 Days"
                    />
                    <label
                      htmlFor="tenDays"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      10 Days
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="nonRefundable"
                      type="radio"
                      name="cancellationDays"
                      disabled={isPending}
                      defaultChecked={
                        data?.item?.cancellationDays === "Non-refundable"
                      }
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                      onChange={(e) => setCancellationDays(e.target.value)}
                      value="Non-refundable"
                    />
                    <label
                      htmlFor="nonRefundable"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Non-refundable
                    </label>
                  </div>
                </div>
              </div>
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

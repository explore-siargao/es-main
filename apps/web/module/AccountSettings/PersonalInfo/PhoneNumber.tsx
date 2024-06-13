import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { IPersonalInfo } from "@/common/types/global"
import React, { useState } from "react"
import useUpdatePersonalInfo from "../hooks/useUpdatePersonalInfo"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Typography } from "@/common/components/ui/Typography"
import { APP_NAME } from "@repo/constants"

type PersonalInfoProps = {
  isButtonClicked: boolean
  contentId: string
}
const PhoneNumber = ({ phoneNumber, userId }: IPersonalInfo) => {
  const [contentState, setContentState] = useState<PersonalInfoProps>({
    isButtonClicked: false,
    contentId: "",
  })

  const {
    register: registerPhoneNumber,
    reset: resetPhoneNumber,
    handleSubmit: handlePhoneNumberSubmit,
  } = useForm<IPersonalInfo>()
  const { mutate: mutatePhoneNumber, isPending: isPendingPhoneNumber } =
    useUpdatePersonalInfo(userId as string)
  const queryClient = useQueryClient()

  const onSubmitPhoneNumber = (formData: IPersonalInfo) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["session"],
          })
          toast.success(data.message)
          resetPhoneNumber()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutatePhoneNumber({ ...formData }, callBackReq)
  }

  return (
    <div className="text-sm">
      {!contentState.isButtonClicked ? (
        <div className="flex justify-between py-5">
          <div>
            <Typography variant={"p"}>Phone number</Typography>
            <Typography variant={"p"} fontWeight={"light"}>
              {phoneNumber !== "" ? phoneNumber : "Enter a new phone number"}
            </Typography>
          </div>
          <button
            onClick={() =>
              setContentState({
                isButtonClicked: !contentState.isButtonClicked,
                contentId: "PhoneNumber",
              })
            }
            className="underline self-start select-none"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="grid py-5">
          <div className="flex justify-between">
            <Typography variant={"p"}>Phone number</Typography>
            <button
              className="underline self-start select-none"
              onClick={() =>
                setContentState({
                  isButtonClicked: !contentState.isButtonClicked,
                  contentId: " ",
                })
              }
            >
              Cancel
            </button>
          </div>
          <Typography variant={"p"} fontWeight={"light"}>
            Add a number so confirmed guests and {APP_NAME} can get in touch.
            You can add other numbers and choose how they’re used
          </Typography>
          <form onSubmit={handlePhoneNumberSubmit(onSubmitPhoneNumber)}>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Input
                id="phoneNumber"
                label="Phone number"
                defaultValue={
                  phoneNumber !== "" ? phoneNumber : "Enter a new phone number"
                }
                required
                {...registerPhoneNumber("phoneNumber")}
              />
            </div>
            <Button className="w-20" size={"sm"}>
              {isPendingPhoneNumber ? (
                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent text-primary-200 rounded-full">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PhoneNumber

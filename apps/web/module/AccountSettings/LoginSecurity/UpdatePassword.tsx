import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Typography } from "@/common/components/ui/Typography"
import { T_BackendResponse } from "@repo/contract"
import useSessionStore from "@/common/store/useSessionStore"
import useUpdateAccountPassword, {
  T_ChangePassword,
} from "../hooks/useUpdateAccountPassword"
import dayjs from "dayjs"

type T_ContentState = {
  isButtonClicked: boolean
  contentId: string
}

const UpdatePassword = () => {
  const [contentState, setContentState] = useState<T_ContentState>({
    isButtonClicked: false,
    contentId: "",
  })
  const { register, reset, handleSubmit } = useForm<T_ChangePassword>()
  const session = useSessionStore((state) => state)
  const { mutate, isPending } = useUpdateAccountPassword(session.id as number)
  const onSubmitLegalName = (formData: T_ChangePassword) => {
    const callBackReq = {
      onSuccess: (data: T_BackendResponse) => {
        if (!data.error) {
          toast.success(data.message as string)
          reset()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutate({ ...formData }, callBackReq)
  }
  const changePasswordLastUpdated = (changePasswordAt: string): number => {
    const isDateValid = dayjs(changePasswordAt).isValid()
    if (!changePasswordAt && isDateValid) {
      return 0
    }
    const currentDate = dayjs()
    const passwordChangeDate = dayjs(changePasswordAt)
    return currentDate.diff(passwordChangeDate, "day")
  }
  const passwordDuration = changePasswordLastUpdated(
    session.changePasswordAt as string
  )
  const passwordDescription =
    session.registrationType === "Manual"
      ? `Password updated ${passwordDuration} days ago`
      : `You are registered using ${session.registrationType}`

  return (
    <>
      <Typography variant="h2" fontWeight="semibold">
        Update password
      </Typography>
      <div className="text-sm mt-2 border-b border-text-100">
        {!contentState.isButtonClicked ? (
          <div className="flex justify-between py-5">
            <div>
              <Typography>Password</Typography>
              <Typography fontWeight="light">{passwordDescription}</Typography>
            </div>
            <button
              disabled={session.registrationType !== "Manual"}
              onClick={() =>
                setContentState({
                  isButtonClicked: !contentState.isButtonClicked,
                  contentId: "legalName",
                })
              }
              className="underline self-start select-none disabled:opacity-40"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="grid py-5">
            <div className="flex justify-between">
              <Typography>Password</Typography>
              <button
                className="underline self-start select-none "
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
            <form onSubmit={handleSubmit(onSubmitLegalName)}>
              <div className="grid grid-cols-2 gap-4 my-4">
                <Input
                  id="oldPassword"
                  type="password"
                  label="Old Password"
                  {...register("currentPassword")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 my-4">
                <Input
                  id="newPassword"
                  type="password"
                  label="New Password"
                  {...register("newPassword")}
                />
                <Input
                  id="confirmNewPassword"
                  type="password"
                  label="Confirm New Password"
                  {...register("confirmNewPassword")}
                />
              </div>
              <Button className="w-20" size={"sm"} type="submit">
                {isPending ? (
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
    </>
  )
}

export default UpdatePassword

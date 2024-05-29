import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { IUser } from "@/common/types/global"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Typography } from "@/common/components/ui/Typography"
import useUpdateUserEmail from "../hooks/useUpdateUserEmail"

type PersonalInfoProps = {
  isButtonClicked: boolean
  contentId: string
}
const EmailAddress = ({ email, id }: IUser) => {
  const [contentState, setContentState] = useState<PersonalInfoProps>({
    isButtonClicked: false,
    contentId: "",
  })
  const {
    register: registerEmail,
    reset: resetEmail,
    handleSubmit: handleEmailSubmit,
  } = useForm<IUser>()
  const { mutate: mutateEmail, isPending: isPendingEmail } = useUpdateUserEmail(
    id as number
  )
  const queryClient = useQueryClient()

  const onSubmitEmail = (formData: IUser) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          // Cookies.set("accessToken", data?.items?.accessToken)
          // signIn("credentials", {
          //   username: formData.email,
          // })
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["session"],
          })
          resetEmail()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutateEmail({ ...formData }, callBackReq)
  }

  return (
    <div className="text-sm">
      {!contentState.isButtonClicked ? (
        <div className="flex justify-between py-5">
          <div>
            <Typography variant={"p"}>Email address</Typography>
            <Typography fontWeight={"light"}>{email}</Typography>
          </div>
          <button
            onClick={() =>
              setContentState({
                isButtonClicked: !contentState.isButtonClicked,
                contentId: "emailAddress",
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
            <Typography variant={"p"}>Email address</Typography>
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
          <Typography fontWeight={"light"}>
            Use an address you’ll always have access to.
          </Typography>
          <form onSubmit={handleEmailSubmit(onSubmitEmail)}>
            <Input
              id="email"
              label="Email Address"
              placeholder="you@sample.com"
              defaultValue={email}
              className="my-4"
              {...registerEmail("email", { required: true })}
              required
            />
            <Button className="w-20" size={"sm"} type="submit">
              {isPendingEmail ? (
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

export default EmailAddress

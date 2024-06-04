import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { IPersonalInfo } from "@/common/types/global"
import React, { useState } from "react"
import useUpdatePersonalInfo from "../hooks/useUpdatePersonalInfo"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Typography } from "@/common/components/ui/Typography"
import toast from "react-hot-toast"

type PersonalInfoProps = {
  isButtonClicked: boolean
  contentId: string
}

const LegalName = ({ firstName, lastName, userId }: IPersonalInfo) => {
  const [contentState, setContentState] = useState<PersonalInfoProps>({
    isButtonClicked: false,
    contentId: "",
  })
  const {
    register: registerLegalName,
    reset: resetLegalName,
    handleSubmit: handleLegalNameSubmit,
  } = useForm<IPersonalInfo>()
  const { mutate: mutateLegalName, isPending: isPendingLegalName } =
    useUpdatePersonalInfo(userId as string)
  const queryClient = useQueryClient()

  const onSubmitLegalName = (formData: IPersonalInfo) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["session"],
          })
          toast.success(data.message)
          resetLegalName()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutateLegalName({ ...formData }, callBackReq)
  }

  return (
    <div className="text-sm">
      {!contentState.isButtonClicked ? (
        <div className="flex justify-between py-5">
          <div>
            <Typography variant={"p"}>Legal name</Typography>
            <Typography fontWeight={"light"}>
              {firstName + " " + lastName}
            </Typography>
          </div>
          <button
            onClick={() =>
              setContentState({
                isButtonClicked: !contentState.isButtonClicked,
                contentId: "legalName",
              })
            }
            className="underline self-start select-none "
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="grid py-5">
          <div className="flex justify-between">
            <Typography variant={"p"}>Legal name</Typography>
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
          <Typography fontWeight={"light"}>
            This is the name on your travel document, which could be a license
            or a passport.
          </Typography>
          <form onSubmit={handleLegalNameSubmit(onSubmitLegalName)}>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Input
                id="firstName"
                label="First name"
                defaultValue={firstName}
                {...registerLegalName("firstName")}
                required
              />
              <Input
                id="lastName"
                label="Last name"
                defaultValue={lastName}
                {...registerLegalName("lastName")}
                required
              />
            </div>
            <Button className="w-20" size={"sm"} type="submit">
              {isPendingLegalName ? (
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

export default LegalName

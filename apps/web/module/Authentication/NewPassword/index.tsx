"use client"
import React from "react"
import { Button } from "@/common/components/ui/Button"
import { SUBMIT } from "@/common/constants"
import AuthContainer from "@/common/components/AuthContainer"
import { Input } from "@/common/components/ui/Input"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import useVerifyForgotPassword, {
  TVerifyForgotPassword,
} from "../hooks/useVerifyForgotPassword2"
import toast from "react-hot-toast"
import { EncryptionService } from "@repo/services/"
import { LINK_HOME } from "@/common/constants"

type TForm = TVerifyForgotPassword & { confirmPassword: string }

const encryptionService = new EncryptionService("password")
const NewPassword = () => {
  const params = useSearchParams()
  const code = params.get("code")
  const email = params.get("email")
  const router = useRouter()
  const { mutate: forgotPassword, isPending: isPendingNewPassword } =
    useVerifyForgotPassword()
  const { register, handleSubmit } = useForm<TForm>()
  const onSubmit = (data: TForm) => {
    const { newPassword, confirmPassword } = data
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error && !isPendingNewPassword) {
          if (data.action && data.action.link) {
            router.push(data.action.link)
          }
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    if (newPassword === confirmPassword) {
      forgotPassword(
        {
          code: Number(code),
          email: email as string,
          newPassword: encryptionService.encrypt(newPassword),
        },
        callBackReq
      )
    } else {
      toast.error("Password not match")
    }
  }

  if (!email || !code) {
    router.push(LINK_HOME)
  }

  return (
    <AuthContainer title="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-4">
          <div>
            <Input
              label="Enter New Password"
              id="newPassword"
              type="password"
              {...register("newPassword")}
              disabled={isPendingNewPassword}
            />
            <Input
              label="Confirm password"
              id="confirmPassword"
              type="password"
              className="mt-2"
              {...register("confirmPassword")}
              disabled={isPendingNewPassword}
            />
          </div>
          <Button
            className="w-full my-5"
            type="submit"
            variant={"primary"}
            disabled={isPendingNewPassword}
          >
            {isPendingNewPassword ? (
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent text-primary-200 rounded-full">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              SUBMIT
            )}
          </Button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default NewPassword

"use client"
import React, { useRef, useState } from "react"
import { Button } from "@/common/components/ui/Button"
import AuthContainer from "@/common/components/AuthContainer"
import { Input } from "@/common/components/ui/Input"
import { useForm } from "react-hook-form"
import useForgotPassword, { TForgotPassword } from "../hooks/useForgotPassword"
import toast from "react-hot-toast"
import ReCAPTCHA from "react-google-recaptcha"
import useGlobalInputEmail from "../store/useGlobalInputEmail"
import { Typography } from "@/common/components/ui/Typography"

const ForgotPassword = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const forgotPassEmail = useGlobalInputEmail((state) => state.email)
  const [captcha, setCaptcha] = useState<string | null>("")
  const { mutate: forgotPassword, isPending: isForgotPasswordPending } =
    useForgotPassword()
  const { register, handleSubmit, reset } = useForm<TForgotPassword>({
    values: { email: forgotPassEmail || "", token: "" },
  })
  const onSubmit = (data: TForgotPassword) => {
    const { email } = data
    if (captcha) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            if (data.message && !isForgotPasswordPending) {
              toast.success(String(data.message), { duration: 5000 })
              reset()
            }
          } else {
            toast.error(String(data.message))
          }
          recaptchaRef.current?.reset()
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      forgotPassword(
        {
          token: captcha,
          email,
        },
        callBackReq
      )
    } else {
      toast.error("Please complete the reCAPTCHA before proceeding")
    }
  }

  return (
    <AuthContainer title="Forgot Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-4">
          <div>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              disabled={isForgotPasswordPending}
              required
            />
            <Typography variant={"p"} className="text-sm mt-2 text-text-300">
              Please enter your email in the box above. We will send you link to
              access further instructions.
            </Typography>
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.RECAPTCHA_KEY || ""}
            onChange={setCaptcha}
          />
          <Button
            className="w-full my-5"
            type="submit"
            variant={"primary"}
            disabled={isForgotPasswordPending}
          >
            {isForgotPasswordPending ? (
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent text-primary-200 rounded-full">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Send email"
            )}
          </Button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default ForgotPassword

"use client"
import React from "react"
import AuthContainer from "@/common/components/AuthContainer"
import SignUpForm from "@/module/Authentication/components/SignUpForm"
import { useRouter } from "next/navigation"
import PreSignUpForm from "../components/PreSignUpForm"
import useGlobalInputEmail from "../store/useGlobalInputEmail"

const CreateAccount = () => {
  const router = useRouter()
  const createAccountEmail = useGlobalInputEmail((state) => state.email)
  const removeAccountEmail = useGlobalInputEmail((state) => state.remove)
  return (
    <AuthContainer
      title="Create account using your email"
      onBack={() => {
        if (createAccountEmail !== null) {
          removeAccountEmail()
        } else {
          router.push("/login")
        }
      }}
    >
      {createAccountEmail ? <SignUpForm /> : <PreSignUpForm />}
    </AuthContainer>
  )
}

export default CreateAccount

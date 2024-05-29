"use client"
import React from "react"
import AuthContainer from "@/common/components/AuthContainer"
import { useParams, useRouter } from "next/navigation"
import { LINK_LOGIN } from "@/common/constants/links"
import { capitalizeFirstLetter } from "@/common/helpers/capitalizeFirstLetter"
import SignUpForm from "@/module/Authentication/components/SignUpForm"

const CreateAccountSocial = () => {
  const params = useParams()
  const router = useRouter()
  const capitalizedText = capitalizeFirstLetter(params.type as string)

  return (
    <AuthContainer
      title={`Create account using your ${capitalizedText}`}
      onBack={() => router.push(LINK_LOGIN)}
    >
      <SignUpForm isSocial={true} />
    </AuthContainer>
  )
}

export default CreateAccountSocial

"use client"
import React from "react"
import LoginForm from "@/module/Authentication/components/LoginForm"
import AuthContainer from "@/common/components/AuthContainer"
import { useRouter } from "next/navigation"
import { LINK_HOME } from "@/common/constants"
const Login = () => {
  const router = useRouter()

  return (
    <AuthContainer
      title="Login or sign up"
      onBack={() => router.push(LINK_HOME)}
    >
      <LoginForm />
    </AuthContainer>
  )
}

export default Login

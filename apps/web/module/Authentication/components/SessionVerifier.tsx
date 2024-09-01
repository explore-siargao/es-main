"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { Spinner } from "@/common/components/ui/Spinner"
import useGoogleRedirect from "../hooks/useGoogleRedirect"
import { LINK_HOME } from "@/common/constants"

const SessionVerifier = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const googleError = searchParams.get("error")
  const { data } = useGoogleRedirect()
  if (!googleError && !data?.error && data?.action?.link) {
    if (data.message) {
      toast.success(data.message as string)
    }
    router.push(data?.action?.link)
  }
  if (googleError) {
    router.push(LINK_HOME)
  }
  return <Spinner variant="primary" middle />
}

export default SessionVerifier

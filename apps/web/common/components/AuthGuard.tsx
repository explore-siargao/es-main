"use client"
import React from "react"
import { useRouter, usePathname } from "next/navigation"
import useSessionStore from "../store/useSessionStore"
import { LINK_HOME } from "../constants"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSessionStore((state) => state)

  if (!session.id) {
    const redirect = pathname !== LINK_HOME ? `?redirect_to=${pathname}` : ``
    router.push(`/login${redirect}`)
  }

  return <>{children}</>
}

export default AuthGuard

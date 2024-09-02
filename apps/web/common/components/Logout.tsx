"use client"
import React, { useEffect } from "react"
import { Spinner } from "./ui/Spinner"
import useLogout from "@/module/Authentication/hooks/useLogout"
import toast from "react-hot-toast"
import { LINK_HOME } from "../constants"

const Logout = () => {
  const { mutate } = useLogout()
  useEffect(() => {
    setTimeout(function () {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            if (data.action && data.action.link) {
              window.location.replace(data.action.link)
            }
          } else {
            toast.error(String(data.message))
            window.location.replace(LINK_HOME)
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
          window.location.replace(LINK_HOME)
        },
      }
      mutate(undefined, callBackReq)
    }, 1000)
  }, [])
  return <Spinner variant="primary" middle />
}

export default Logout

"use client"

import { WidthWrapper } from "@/common/components/WidthWrapper"
import React, { useEffect } from "react"
import FirstLevel from "./FirstLevel"
import SetUpProfileAboutYou from "./SetUpProfileAboutYou"
import ProfileFourthLevel from "./ProfileFourthLevel"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import toast from "react-hot-toast"
import SetupProfileImage from "@/module/Profile/Setup/SetupProfileImage"
import { APP_NAME } from "@repo/constants"
import useGetProfile from "../hooks/useGetProfile"
import useProfileEditStore from "./store/useProfileEditStore"
import useUpdateProfile from "../hooks/useUpdateProfile"
import { useQueryClient } from "@tanstack/react-query"
import { Spinner } from "@/common/components/ui/Spinner"

const dest = [
  {
    year: "2000",
    destination: "Boracay",
  },
  {
    year: "2019",
    destination: "Coron, Palawan",
  },
  {
    year: "2020",
    destination: "La Union",
  },
  {
    year: "2021",
    destination: "Baler, Quezon",
  },
]

const Setup = () => {
  const { data, isPending: profileIsPending } = useGetProfile()
  const { mutate, isPending } = useUpdateProfile()
  const profile = useProfileEditStore.getState()
  const { setProfileEdit } = useProfileEditStore((state) => state)
  useEffect(() => {
    if (data?.item) {
      setProfileEdit({ ...data?.item })
    }
  }, [data])

  const queryClient = useQueryClient()
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["user-profile"],
        })
        toast.success(data.message)
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }
  const save = () => {
    mutate(profile, callBackReq)
  }
  return (
    <WidthWrapper width="small" className="mt-32 lg:mt-40">
      {profileIsPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <div className="flex flex-col lg:flex-row gap-0 md:gap-8 mx-auto">
          <div className="w-72 mx-auto md:mx-none">
            <SetupProfileImage />
          </div>
          <div className="flex-1">
            <div>
              <Typography variant="h1" fontWeight="semibold">
                Your profile
              </Typography>
              <Typography className="pt-5 text-gray-500">
                The information you share will be used across {APP_NAME} to help
                other guests and Hosts get to know you.{" "}
                <Link href="" className="font-semibold underline">
                  Learn more
                </Link>
              </Typography>
            </div>
            <div className="mt-2">
              <FirstLevel />
            </div>
            <div className="py-6">
              <SetUpProfileAboutYou />
            </div>
            <div className="border-t mt-5"></div>
            <div className="py-6">
              <ProfileFourthLevel description={dest} />
            </div>
            <div className="border-t mt-5"></div>
            <div className="flex justify-end sm:text-right pt-5">
              <Button variant="primary" onClick={save}>
                {isPending ? <Spinner size="sm">Loading...</Spinner> : "Done"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </WidthWrapper>
  )
}

export default Setup

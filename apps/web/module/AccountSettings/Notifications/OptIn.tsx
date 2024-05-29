import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import ToggleSwitch from "@/common/components/ui/Toggle"
import useSessionStore from "@/common/store/useSessionStore"
import useSetReceivedEmail from "@/module/Authentication/hooks/useSetReceivedEmail"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"

const OptIn = () => {
  const session = useSessionStore((state) => state)
  const queryClient = useQueryClient()
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["session"],
        })
        toast.success(data.message, { duration: 5000 })
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }
  const { mutate, isPending } = useSetReceivedEmail(session.id as number, {
    onSuccess: callBackReq.onSuccess,
    onError: callBackReq.onError,
  })
  return (
    <>
      <div className="text-sm mt-2 border-b border-text-100">
        <div className="flex justify-between py-5">
          <div>
            <Typography variant="p">
              Travel tips, uplifting content and exclusive deals
            </Typography>
          </div>
          <ToggleSwitch
            checked={session.canReceiveEmail}
            onChange={() => mutate({ canReceive: !session.canReceiveEmail })}
            disabled={isPending}
          />
        </div>
      </div>
    </>
  )
}

export default OptIn

import ModalContainer from "@/common/components/ModalContainer"
import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import useOptMessageStore from "@/common/store/useOptMessageStore"
import { Button } from "@/common/components/ui/Button"
import useSetReceivedEmail from "../../hooks/useSetReceivedEmail"
import toast from "react-hot-toast"
import useSessionStore from "@/common/store/useSessionStore"
import { APP_NAME } from "@repo/constants"
import { LucideCheckCircle } from "lucide-react"

const OptMessageModal = () => {
  const isOpen = useOptMessageStore((state) => state.isOpen)
  const closeModal = useOptMessageStore((state) => state.setIsClose)
  const [canReceive, setCanReceive] = useState(false)
  const session = useSessionStore((state) => state)
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        toast.success(data.message, { duration: 5000 })
        closeModal()
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }
  const {
    mutate: updateCanReceivedEmail,
    isPending: IsPendingCetCanReceivedEmail,
  } = useSetReceivedEmail(session.id as number, {
    onSuccess: callBackReq.onSuccess,
    onError: callBackReq.onError,
  })
  return (
    <ModalContainer onClose={() => closeModal()} isOpen={isOpen} size="sm">
      <div className="p-6 text-center h-screen md:h-full">
        <LucideCheckCircle className="mx-auto w-12 h-12 text-success-700" />
        <Typography variant={"h3"} fontWeight={"semibold"}>
          You’re all signed up!
        </Typography>

        <Button
          variant={"secondary"}
          className="w-full mt-4"
          onClick={() => {
            closeModal()
            if (canReceive) updateCanReceivedEmail({ canReceive })
          }}
          disabled={IsPendingCetCanReceivedEmail}
        >
          OK
        </Button>
        {!session.canReceiveEmail && (
          <div className="flex mt-6">
            <input
              id="received"
              onChange={(e) => setCanReceive(e.target.checked)}
              type="checkbox"
              className="h-6 w-6 rounded border-gray-400 text-secondary-600 focus:ring-transparent"
            />
            <label
              htmlFor="recieved"
              className="text-sm select-none text-left ml-2"
            >
              I’d like to receive travel tips, uplifting content, and exclusive
              deals from {APP_NAME}. You can opt out at any time.
            </label>
          </div>
        )}
      </div>
    </ModalContainer>
  )
}

export default OptMessageModal

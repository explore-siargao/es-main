import ModalContainer from "@/common/components/ModalContainer"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"
import useDeleteWishGroupByTitle from "../hooks/useDeleteWishGroupByTitle"
import useSessionStore from "@/common/store/useSessionStore"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface RemoveWishlistsProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const DeleteWIshlistsModal = ({
  isOpen,
  title,
  onClose,
}: RemoveWishlistsProps) => {
  const userId = useSessionStore((state) => state).id
  const queryClient = useQueryClient()
  const { mutate, isPending } = useDeleteWishGroupByTitle(
    userId as number,
    title
  )
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["wish-group-count"],
        })
        onClose()
        toast.success("Wish Group Successfully deleted")
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }

  const deleteWishGroup = () => {
    mutate({}, callBackReq)
  }
  return (
    <ModalContainer
      title="Delete this wishlist?"
      onClose={onClose}
      isOpen={isOpen}
      size="auto"
    >
      <div className="p-6 flex flex-col items-center">
        <Typography className="text-text-400 font-light w-60 text-center">
          "{title}" will be permanently deleted.
        </Typography>
      </div>
      <ModalContainerFooter
        positive="Delete"
        negative="Cancel"
        isSubmit={false}
        isPending={isPending}
        buttonFn={() => deleteWishGroup()}
        onClose={onClose}
      />
    </ModalContainer>
  )
}

export default DeleteWIshlistsModal

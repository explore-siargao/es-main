"use client"
import ModalContainer from "@/common/components/ModalContainer"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import useSessionStore from "@/common/store/useSessionStore"
import {
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import React, { useState } from "react"
import useEditWishGroupTitle from "../../hooks/useEditWishGroupTitle"
import { useForm } from "react-hook-form"
import { IWishGroup } from "@/common/types/global"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { LINK_ACCOUNT_WISHLIST } from "@/common/constants/links"
import useDeleteWishGroupByTitle from "../../hooks/useDeleteWishGroupByTitle"

interface MenuProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const MenuModal = ({
  isOpen: openModal,
  onClose: hideModal,
  title,
}: MenuProps) => {
  const [modalState, setModalState] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const handleTextAreaChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value
    setInputValue(newValue)
  }
  const userId = useSessionStore((state) => state).id
  const { mutate: renameTitle, isPending: renameTitleIsPending } =
    useEditWishGroupTitle(userId)
  const { mutate: deleteWishGroup, isPending: deleteWishGroupIsPending } =
    useDeleteWishGroupByTitle(userId as number, title)
  const { register, getValues } = useForm<IWishGroup>()
  const queryClient = useQueryClient()
  const router = useRouter()
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["wish-group-count"],
        })
        router.push(LINK_ACCOUNT_WISHLIST + "/" + getValues("newTitle"))
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }

  const callBackReq2 = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["wish-group-count"],
        })
        router.back()
        toast.success(data.message)
        router.push(LINK_ACCOUNT_WISHLIST)
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }
  const renameWishListTitle = () => {
    renameTitle(
      { oldTitle: title, newTitle: getValues("newTitle") },
      callBackReq
    )
  }

  const deleteWishGroupFn = () => {
    deleteWishGroup({}, callBackReq2)
  }

  const renderMenu = () => {
    return (
      <ModalContainer
        onClose={hideModal}
        title="Settings"
        isOpen={openModal}
        size="sm"
      >
        <div className="p-6 flex flex-col items-center divide-y divide-text-100">
          <button
            onClick={() => setModalState(1)}
            className="flex justify-between w-full py-5"
          >
            <div className="flex">
              <PencilIcon className="h-5 w-auto text-text-400 mr-2" />
              <Typography variant={"h5"}>Rename</Typography>
            </div>
            <ChevronRightIcon className="h-7 w-auto" />
          </button>
          <button
            onClick={() => setModalState(2)}
            className="flex justify-between w-full py-5"
          >
            <div className="flex">
              <TrashIcon className="h-5 w-auto text-text-400 mr-2" />
              <Typography variant={"h5"}>Delete</Typography>
            </div>
            <ChevronRightIcon className="h-7 w-auto" />
          </button>
        </div>
      </ModalContainer>
    )
  }
  const renderRename = () => {
    return (
      <ModalContainer
        onClose={() => setModalState(0)}
        title="Rename wishlist"
        isOpen={openModal}
      >
        <div className="p-6 flex flex-col ">
          <Input
            label="Name"
            {...register("newTitle", { required: "This field is required" })}
            disabled={renameTitleIsPending}
            id="newTitle"
            defaultValue={title}
            className={`w-full ${
              inputValue.replace(/\s/g, "").length > 50 &&
              "ring-error-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-error-600"
            }`}
            onChange={handleTextAreaChange}
          />
          <Typography
            variant={"h6"}
            fontWeight={"bold"}
            className={`${
              inputValue.replace(/\s/g, "").length > 50
                ? "text-error-400 mt-2"
                : "text-text-400 mt-2"
            }`}
          >
            {inputValue.replace(/\s/g, "").length}/50 characters{" "}
          </Typography>
        </div>
        <ModalContainerFooter
          positive="Rename"
          negative="Cancel"
          isPending={renameTitleIsPending}
          isSubmit={false}
          buttonFn={() => renameWishListTitle()}
          onClose={() => setModalState(0)}
        />
      </ModalContainer>
    )
  }
  const renderDelete = () => {
    return (
      <ModalContainer
        title="Delete this wishlist?"
        onClose={() => setModalState(0)}
        isOpen={openModal}
        size="sm"
      >
        <div className="p-6 flex flex-col items-center">
          <Typography className="text-text-400 font-light w-60 text-center">
            {'"' + title + '"'} will be permanently deleted.
          </Typography>
        </div>
        <ModalContainerFooter
          positive="Delete"
          negative="Cancel"
          isSubmit={false}
          isPending={deleteWishGroupIsPending}
          buttonFn={() => deleteWishGroupFn()}
          onClose={() => setModalState(0)}
        />
      </ModalContainer>
    )
  }
  const toRender = () => {
    let componentToRender

    if (modalState === 0) {
      componentToRender = renderMenu()
    } else if (modalState === 1) {
      componentToRender = renderRename()
    } else {
      componentToRender = renderDelete()
    }

    return componentToRender
  }
  return <>{toRender()}</>
}

export default MenuModal

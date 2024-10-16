import ModalContainer from "@/common/components/ModalContainer"
import { Input } from "@/common/components/ui/Input"
import React, { useRef, useState } from "react"
import Image from "@/common/components/ui/image"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import useAddWishGroup from "../../hooks/useAddWishGroup"
import useSessionStore from "@/common/store/useSessionStore"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { IWishGroup } from "@/common/types/global"
import useWishGroupWithCount from "../../hooks/useGetWishGroupWithCount"
import { Spinner } from "@/common/components/ui/Spinner"
import useAddToExistingWishGroup from "../../hooks/useAddToExistingWishGroup"
import { cn } from "@/common/helpers/cn"

interface AddWishlistProps {
  listingId: number
  isOpen: boolean
  onClose: () => void
  handleAdded: () => void
}

const AddWishlistModal = ({
  listingId,
  isOpen: showModal,
  onClose: hideModal,
  handleAdded,
}: AddWishlistProps) => {
  const userId = useSessionStore((state) => state).id
  const cancelButtonRef = useRef(null)
  const [renderState, setRenderState] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const handleTextAreaChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value
    setInputValue(newValue)
  }
  const queryClient = useQueryClient()
  const { register, getValues } = useForm<IWishGroup>()
  const { mutate, isPending: addWishgroupIsPending } = useAddWishGroup(
    userId as number
  )
  const { data: wishGroup, isPending: wishGroupIsPending } =
    useWishGroupWithCount(userId as number)
  const { mutate: addExistingWishGroup } = useAddToExistingWishGroup(
    userId as number
  )
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["wish-group-count"],
        })
        handleAdded()
        hideModal()
        toast.success("Wish Group Successfully Created")
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }
  const addToExistingGroup = (title: string) => {
    addExistingWishGroup({ title: title, listingId: listingId }, callBackReq)
  }

  const renderAddToWishlist = () => {
    return (
      <ModalContainer
        title="Add to wishlist"
        onClose={hideModal}
        isOpen={showModal}
        size="sm"
      >
        {wishGroupIsPending ? (
          <Spinner
            variant="primary"
            size={"lg"}
            className="mx-auto my-auto d-block"
          >
            Loading...
          </Spinner>
        ) : (
          <div
            className={cn(
              `grid grid-cols-2 max-h-[550px] overflow-y-auto`,
              wishGroup?.item?.length > 0 && "p-6"
            )}
          >
            {wishGroup?.item?.map((item: any, index: number) => (
              <button
                type="button"
                aria-label="button"
                className="flex flex-col"
                key={item.title}
                onClick={() => addToExistingGroup(item.title)}
              >
                <div className="h-60 w-60 rounded-3xl relative border border-text-100">
                  <Image
                    src={`/assets/${item?.images[0].fileKey}`}
                    width={300}
                    height={300}
                    alt="photo"
                    className="object-cover h-full w-full rounded-3xl p-1"
                  />
                </div>
                <div className="flex-1 ml-1 -space-y-1 w-auto">
                  <Typography
                    variant="h3"
                    fontWeight="semibold"
                    className="text-text-500 text-left"
                  >
                    {item.title}
                  </Typography>
                  <Typography className="text-text-300 text-left">
                    {item._count + " saved"}
                  </Typography>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="w-full p-5">
          <Button className="w-full" onClick={() => setRenderState(1)}>
            Create new wishlist
          </Button>
        </div>
      </ModalContainer>
    )
  }
  const createNewWishGroup = () => {
    mutate({ title: getValues("title"), listingId: listingId }, callBackReq)
  }

  const renderCreateWishlist = () => {
    return (
      <ModalContainer
        title="Create wishlist"
        onClose={() => setRenderState(0)}
        isOpen={showModal}
        size="auto"
      >
        <div className="p-6 w-80">
          <Input
            label="Name"
            id="createModal"
            {...register("title", { required: "This field is required" })}
            disabled={addWishgroupIsPending}
            className={`w-full ${
              inputValue.replace(/\s/g, "").length > 50 &&
              "ring-error-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-error-600"
            }`}
            onChange={handleTextAreaChange}
          />
          <Typography
            variant="h6"
            fontWeight="semibold"
            className={`${
              inputValue.replace(/\s/g, "").length > 50
                ? "text-error-400 mt-2"
                : "text-text-400 mt-2"
            }`}
          >
            {inputValue.replace(/\s/g, "").length}/50 characters{" "}
          </Typography>{" "}
        </div>
        <ModalContainerFooter
          isPending={addWishgroupIsPending}
          isSubmit={false}
          positive="Create"
          negative="clear"
          buttonFn={() => createNewWishGroup()}
        />
      </ModalContainer>
    )
  }

  return (
    <>{renderState === 0 ? renderAddToWishlist() : renderCreateWishlist()}</>
  )
}

export default AddWishlistModal

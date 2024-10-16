import { Button } from "@/common/components/ui/Button"
import { LINK_ACCOUNT_YOUR_PAYMENT, LINK_GIFT } from "@/common/constants"
import { useRouter } from "next/navigation"
import React, { Fragment, useState } from "react"
import AddCardDetailModal from "../components/modals/AddCardDetailModal"
import Image from "@/common/components/ui/image"
import { Input } from "@/common/components/ui/Input"
import { Popover, Transition } from "@headlessui/react"
import RemovePaymentModal from "../components/modals/RemovePaymentModal"
import useGetPaymentMethods from "../hooks/useGetPaymentMethods"
import { ICoupon } from "@/common/types/global"
import useUpdatePaymentMethod from "../hooks/useUpdatePaymentMethod"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import useUpdateCoupon from "../hooks/useUpdateCoupon"
import { Typography } from "@/common/components/ui/Typography"
import useSessionStore from "@/common/store/useSessionStore"
import { Spinner } from "@/common/components/ui/Spinner"
import { APP_NAME } from "@repo/constants"
import { EncryptionService } from "@repo/services"
import cardIconMap from "@/common/helpers/cardIconMap"
import { LucideCreditCard, LucideMoreHorizontal } from "lucide-react"
import { T_CardInfo } from "@repo/contract"

const encryptionService = new EncryptionService("card")

const Payments = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [addCardModal, setAddCardModal] = useState<boolean>(false)
  const [removePaymentModal, setRemovePaymentModal] = useState<boolean>(false)
  const [paymentMethodId, setPaymentMethodId] = useState("0")
  const [showHide, setShowHide] = useState(false)
  const { register, reset, getValues } = useForm<ICoupon>()
  const toggleVisibility = () => {
    setShowHide(!showHide)
  }
  const session = useSessionStore((state) => state)
  const { data: paymentMethods, isPending: isPendingPaymentMethods } =
    useGetPaymentMethods()
  const { mutate, isPending } = useUpdatePaymentMethod()
  const { mutate: redeemCoupon, isPending: isPendingRedeemCoupon } =
    useUpdateCoupon(session.id as string)
  const callBackReqDefaultPaymentMethod = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["payment-method"],
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

  const CallBackCheckCoupon = {
    onSuccess: (data: any) => {
      if (!data.error) {
        toast.success("Code Successfully redeemed")
      } else {
        toast.error(String(data.message))
      }
      reset()
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }

  return (
    <>
      {isPendingPaymentMethods ? (
        <Spinner variant="primary" className="mt-5" />
      ) : (
        <div className="space-y-10 my-5">
          <div>
            <Typography variant="h2" fontWeight="semibold">
              Your payments
            </Typography>
            <Typography fontWeight="light" className="pb-4">
              Keep track of all your payments and refunds.
            </Typography>
            <Button onClick={() => router.push(LINK_ACCOUNT_YOUR_PAYMENT)}>
              Manage payments
            </Button>
          </div>
          <div>
            <Typography variant="h2" fontWeight="semibold">
              Payment methods
            </Typography>
            <Typography fontWeight="light" className="py-3">
              Add a payment method using our secure payment system, then start
              planning your next trip.
            </Typography>
            {paymentMethods?.items?.length !== 0 ? (
              paymentMethods?.items?.map((paymentMethod) => {
                console.log(paymentMethod)
                const cardInfo = encryptionService.decrypt(
                  paymentMethod.cardInfo
                ) as T_CardInfo
                return (
                  <div
                    key={paymentMethod.id}
                    className="flex my-4 py-5 border-y border-y-text-100 justify-between"
                  >
                    <div className="flex gap-4">
                      {cardIconMap.hasOwnProperty(paymentMethod.cardType) ? (
                        <Image
                          // @ts-expect-error
                          src={cardIconMap[paymentMethod.cardType]}
                          width={500}
                          height={500}
                          className="h-8 w-auto"
                          alt="mastercard"
                        />
                      ) : (
                        <LucideCreditCard
                          className="h-7 w-7"
                          strokeWidth={1.5}
                        />
                      )}
                      <div className="text-sm">
                        <Typography>
                          <span className="font-medium">
                            ************{paymentMethod.lastFour}
                          </span>{" "}
                          {paymentMethod.isDefault ? (
                            <span className="bg-primary-100 text-primary-800 ml-2 px-2 py-1 rounded-md text-sm font-semibold">
                              Default
                            </span>
                          ) : (
                            ""
                          )}
                        </Typography>
                        <Typography className="text-text-200">
                          Expiration:{" "}
                          <span className="font-medium">
                            {cardInfo && typeof cardInfo === "object"
                              ? `${cardInfo?.expirationMonth}/${cardInfo?.expirationYear}`
                              : ""}
                          </span>{" "}
                        </Typography>
                      </div>
                    </div>
                    <Popover className="relative">
                      <Popover.Button className="items-center focus:outline-none px-2 py-1">
                        {isPending ? (
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent text-primary-200 rounded-full">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <LucideMoreHorizontal className="place-self-center select-none text-xs" />
                        )}
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 top-5 z-10 mt-5 flex w-screen max-w-max">
                          <div className="flex flex-col bg-white text-sm leading-6 border border-gray-200 ring-transparent rounded-md cursor-pointer">
                            <button
                              className="relative rounded hover:bg-gray-50 px-5 py-2 text-left"
                              onClick={() => {
                                console.log(
                                  "PaymentMethod Object:",
                                  paymentMethod
                                )
                                if (!paymentMethod.id) {
                                  console.error("PaymentMethod ID is undefined")
                                  toast.error("Payment method ID is missing")
                                  return
                                }
                                mutate(
                                  { id: paymentMethod.id, isDefault: true },
                                  callBackReqDefaultPaymentMethod
                                )
                              }}
                            >
                              Set as default
                            </button>
                            <button
                              onClick={() => {
                                setPaymentMethodId(paymentMethod.id as string)
                                setRemovePaymentModal(true)
                              }}
                              className="relative rounded hover:bg-gray-50 px-5 py-2 text-left"
                            >
                              Remove
                            </button>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </div>
                )
              })
            ) : (
              <div className="pt-5 border-t border-t-text-100"></div>
            )}
            <Button onClick={() => setAddCardModal(true)}>
              Add payment method
            </Button>
          </div>
          <div>
            <Typography variant="h2" fontWeight="semibold" className="pb-4">
              {APP_NAME} gift credit
            </Typography>
            <Button onClick={() => router.push(LINK_GIFT)}>
              Add gift card
            </Button>
          </div>
          <div className="space-y-4">
            <Typography variant="h2" fontWeight="semibold">
              Coupons
            </Typography>
            <div className="flex justify-between border-y border-y-text-100  py-4">
              <Typography fontWeight="light">Your coupons</Typography>
              <Typography>0</Typography>
            </div>
            {showHide === false ? (
              <Button onClick={toggleVisibility}>Add coupon</Button>
            ) : (
              <>
                <Input
                  id="couponCode"
                  label="Enter coupon code"
                  {...register("code", { required: true })}
                  disabled={isPendingRedeemCoupon}
                />
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      if (getValues("code")?.length !== 0) {
                        redeemCoupon(
                          {
                            code: getValues("code"),
                            isUsed: true,
                            usedBy: session.id as number,
                          },
                          CallBackCheckCoupon
                        )
                      } else {
                        toast.error("Please enter a coupon code")
                      }
                    }}
                  >
                    <div>
                      {isPendingRedeemCoupon ? (
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent text-primary-200 rounded-full">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Redeem coupon"
                      )}
                    </div>
                  </Button>
                  <Button
                    onClick={toggleVisibility}
                    variant="outline"
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <AddCardDetailModal
        isOpen={addCardModal}
        onClose={() => setAddCardModal(false)}
        userId={session.id as string}
      />
      <RemovePaymentModal
        id={paymentMethodId}
        userId={session.id as string}
        isOpen={removePaymentModal}
        onClose={() => setRemovePaymentModal(false)}
      />
    </>
  )
}

export default Payments

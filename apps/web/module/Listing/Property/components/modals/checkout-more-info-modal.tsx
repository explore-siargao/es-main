"use Client"
import React, { useRef, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Typography } from "@/common/components/ui/Typography"
import { LucideX } from "lucide-react"
import { APP_NAME, GUEST_COMMISSION_PERCENT } from "@repo/constants"

type T_Checkout_More_Info_Modal = {
  isOpen: boolean
  onClose: () => void
}

const CheckoutMoreInfoModal = ({
  isOpen,
  onClose,
}: T_Checkout_More_Info_Modal) => {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-sm">
                <div className="bg-white shadow rounded-2xl">
                  <div className="flex border-b-gray-200 border-b p-4">
                    <div>
                      <LucideX
                        className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-300/30"
                        onClick={() => onClose()}
                      />
                    </div>
                    <div className="flex-1">
                      <Typography className="w-full place-self-center text-sm ml-2 mt-0.5">
                        {APP_NAME} adds {GUEST_COMMISSION_PERCENT * 100}% commission to the booking, this helps us run our platform and offer services like
                        24/7 support on your trip.
                      </Typography>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CheckoutMoreInfoModal

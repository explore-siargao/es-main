"use Client"
import React, { useRef, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/common/helpers/cn"
import { Typography } from "../ui/Typography"
import { LucideX } from "lucide-react"

type Props = {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose?: () => void
  size?: "sm" | "md" | "lg" | "full" | "calendar" | "auto"
}

const ModalContainer = ({
  children,
  title,
  onClose,
  isOpen,
  size = "lg",
}: Props) => {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => (onClose ? onClose() : null)}
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
              <Dialog.Panel
                className={cn(
                  "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all",
                  {
                    "m-5 w-full h-auto md:w-4/12": size === "sm",
                    "m-5 w-full h-auto md:w-8/12": size === "md",
                    "m-5 w-full h-auto md:w-10/12": size === "lg",
                    "m-5 w-full h-auto md:w-auto": size === "auto",
                    "w-screen h-screen": size === "full",
                  }
                )}
              >
                <div className="bg-white shadow rounded-2xl">
                  <div className="flex border-b-gray-200 border-b p-4">
                    {onClose && (
                      <div>
                        <LucideX
                          className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-300/30"
                          onClick={onClose}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Typography
                        fontWeight="semibold"
                        className="w-full text-center place-self-center"
                      >
                        {title}
                      </Typography>
                    </div>
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalContainer

import { Typography } from "@/common/components/ui/Typography"
import { IPrice } from "@/common/types/global"
import { Popover, Transition } from "@headlessui/react"
import { APP_NAME } from "@repo/constants"
import React, { Fragment, useState } from "react"

interface PriceBreakdownProps {
  buttonTitle: React.ReactNode
  price: IPrice
}

const PriceBreakdownModal = ({ buttonTitle, price }: PriceBreakdownProps) => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)

  return (
    <Popover className="relative">
      <Popover.Button
        onClick={() => setTimeout(() => setMenuIsVisible(true), 500)}
      >
        <Typography className="text-text-300 text-sm underline">
          {buttonTitle}
        </Typography>
      </Popover.Button>
      {menuIsVisible && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -right-0 top-5 shadow-sm rounded-2xl z-10 mt-5 min-w-[400px] w-full">
            <div className="bg-white shadow rounded-2xl ">
              <div className="flex border-b-gray-200 border-b p-4">
                <div className="flex-1">
                  <Typography
                    fontWeight="semibold"
                    className="w-full text-center place-self-center"
                  >
                    Price breakdown
                  </Typography>
                </div>
              </div>
              <div className="grid grid-flow-row p-6 gap-5">
                <div className="flex justify-between">
                  <Typography className="text-text-600">
                    ₱{price.fee} x 1{" "}
                  </Typography>
                  <Typography className="text-text-600">
                    ₱{price.fee}
                  </Typography>
                </div>
                <div className="flex justify-between ">
                  <Typography className="text-text-600">
                    Cleaning fee{" "}
                  </Typography>
                  <Typography className="text-text-600">
                    ₱{price.cleaningFee}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-text-600">
                    {APP_NAME} service fee
                  </Typography>
                  <Typography className="text-text-600">
                    ₱{price.serviceFee}
                  </Typography>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      )}
    </Popover>
  )
}

export default PriceBreakdownModal

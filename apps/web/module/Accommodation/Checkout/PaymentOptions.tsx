"use client"
import { useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { cn } from "@/common/helpers/cn"
import PaymentMethodForm from "@/module/Accommodation/Checkout/PaymentMethodForm"
import useGetPaymentMethods from "@/module/AccountSettings/hooks/useGetPaymentMethods"
import useSessionStore from "@/common/store/useSessionStore"
import usePaymentInfoStore from "./store/usePaymentInfoStore"
import { E_PaymentType } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"
import PaymentSavedForm from "./PaymentSavedForm"

export default function PaymentOptions() {
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )
  const session = useSessionStore((state) => state)
  const [selected, setSelected] = useState<number | null>(null)
  const { data: paymentMethods, isPending: isPendingPaymentMethods } =
    useGetPaymentMethods()
  const savedCreditDebitOptions =
    paymentMethods?.items?.map((paymentMethod) => {
      return {
        type: E_PaymentType.SavedCreditDebit,
        name: `${paymentMethod.cardType} ending with ${paymentMethod.lastFour}`,
        description: "Pay using your saved card information.",
        content: <PaymentSavedForm />,
        selected: paymentMethod.isDefault,
        paymentMethodId: paymentMethod.id,
      }
    }) ?? []
  const options = [
    {
      type: E_PaymentType.CreditDebit,
      name: "Pay using Credit or Debit card",
      description: "Pay manually using your credit or debit card.",
      content: <PaymentMethodForm />,
      paymentMethodId: null,
      selected: false,
    },
    {
      type: E_PaymentType.GCASH,
      name: "Pay using GCash",
      description: "Pay using E-Wallet called GCash.",
      content: null,
      paymentMethodId: null,
      selected: false,
    },
  ]
  const combinedOptions = [...options, ...savedCreditDebitOptions].map(
    (option, index) => {
      return {
        ...option,
        id: index + 1,
      }
    }
  )
  const defaultSelectedOption = combinedOptions.find(
    (option) => option.selected
  )
  useEffect(() => {
    if (!selected && defaultSelectedOption) {
      setSelected(defaultSelectedOption.id)
      updatePaymentInfo({
        key: "paymentType",
        value: E_PaymentType.SavedCreditDebit,
      })
      updatePaymentInfo({
        key: "paymentMethodId",
        value: defaultSelectedOption.paymentMethodId,
      })
    }
  }, [defaultSelectedOption])
  return (
    <>
      {isPendingPaymentMethods ? (
        <Spinner variant="primary" />
      ) : (
        <RadioGroup
          value={selected ? selected : 1}
          onChange={(e) => {
            const option = combinedOptions.find((option) => option.id === e)
            updatePaymentInfo({ key: "paymentType", value: option?.type ?? "" })
            updatePaymentInfo({
              key: "paymentMethodId",
              value: option?.paymentMethodId,
            })
            setSelected(e)
          }}
        >
          <RadioGroup.Label className="sr-only">
            Payment Options
          </RadioGroup.Label>
          <div className="-space-y-px rounded-md bg-white">
            {combinedOptions.map((setting, settingIdx) => (
              <RadioGroup.Option
                key={setting.name}
                value={setting.id}
                className={({ checked }) =>
                  cn(
                    settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                    settingIdx === combinedOptions.length - 1
                      ? "rounded-bl-md rounded-br-md"
                      : "",
                    checked ? "z-10 border-primary-500" : "hover:bg-primary-50",
                    "relative flex cursor-pointer border p-4 focus:outline-none "
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={cn(
                        checked
                          ? "bg-primary-600 border-transparent"
                          : "bg-white border-gray-300",
                        active ? "ring-2 ring-offset-2 ring-primary-600" : "",
                        "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <span className="ml-3 flex flex-col w-full">
                      <RadioGroup.Label
                        as="span"
                        className={cn(
                          checked ? "text-primary-700" : "text-text-900",
                          "block text-sm font-medium"
                        )}
                      >
                        {setting.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={cn(
                          checked ? "text-primary-700" : "text-text-300",
                          "block text-sm"
                        )}
                      >
                        <div>{setting.description}</div>
                        {checked && (
                          <div className={cn(setting.content && "mt-2")}>
                            {setting.content}
                          </div>
                        )}
                      </RadioGroup.Description>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    </>
  )
}

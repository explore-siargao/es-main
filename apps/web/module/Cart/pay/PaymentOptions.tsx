"use client"
import { useEffect, useState } from "react"
import { Menu } from "@headlessui/react"
import useGetPaymentMethods from "@/module/AccountSettings/hooks/useGetPaymentMethods"
import usePaymentInfoStore from "./store/usePaymentInfoStore"
import { E_PaymentType } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"
import PaymentSavedForm from "./PaymentSavedForm"
import { ChevronDownIcon } from "lucide-react"
import PaymentMethodForm from "./PaymentMethodForm"

export default function PaymentOptions() {
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )
  const [selected, setSelected] = useState<number | null>(null)
  const { data: paymentMethods, isPending: isPendingPaymentMethods } =
    useGetPaymentMethods()

  const savedCreditDebitOptions =
    paymentMethods?.items?.map((paymentMethod) => ({
      type: E_PaymentType.SavedCreditDebit,
      name: `${paymentMethod.cardType} ending with ${paymentMethod.lastFour}`,
      description: "Pay using your saved card information.",
      content: <PaymentSavedForm />,
      selected: paymentMethod.isDefault,
      paymentMethodId: paymentMethod.id,
    })) ?? []

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
    (option, index) => ({
      ...option,
      id: index + 1,
    })
  )

  useEffect(() => {
    if (selected === null) {
      const defaultOption = combinedOptions.find((option) => option.selected)
      if (defaultOption) {
        setSelected(defaultOption.id)
        updatePaymentInfo({
          key: "paymentType",
          value: defaultOption.type,
        })
        updatePaymentInfo({
          key: "paymentMethodId",
          value: defaultOption.paymentMethodId,
        })
      }
    }
  }, [combinedOptions, selected])

  const handleSelectionChange = (id: number) => {
    const selectedOption = combinedOptions.find((option) => option.id === id)
    setSelected(id)
    updatePaymentInfo({
      key: "paymentType",
      value: selectedOption?.type ?? "",
    })
    updatePaymentInfo({
      key: "paymentMethodId",
      value: selectedOption?.paymentMethodId,
    })
  }

  return (
    <>
      {isPendingPaymentMethods ? (
        <Spinner variant="primary" />
      ) : (
        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center justify-between w-full p-4 bg-white border border-primary-600 rounded-md">
              <div className="flex flex-col text-left">
                <span className="font-medium">
                  {selected
                    ? combinedOptions.find((option) => option.id === selected)
                        ?.name
                    : "Select a payment method"}
                </span>
                <p className="text-xs text-gray-500">
                  {selected
                    ? combinedOptions.find((option) => option.id === selected)
                        ?.description
                    : "Choose a payment method to see the details."}
                </p>
              </div>
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </Menu.Button>
            <Menu.Items className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
              {combinedOptions.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSelectionChange(option.id)}
                      className={`w-full text-left px-4 py-2 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <p className="text-sm font-medium">{option.name}</p>
                      <p className="text-xs text-gray-500">
                        {option.description}
                      </p>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>

          {selected &&
            combinedOptions.find((option) => option.id === selected)
              ?.content && (
              <div className="mt-4 border border-primary-600 p-4 rounded-md">
                {combinedOptions
                  .filter((option) => option.id === selected)
                  .map((option) => (
                    <div key={option.id}>
                      <div className="mt-4">{option.content}</div>
                    </div>
                  ))}
              </div>
            )}
        </div>
      )}
    </>
  )
}

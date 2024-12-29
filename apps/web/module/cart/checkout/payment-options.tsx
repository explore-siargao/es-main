"use client"
import { useEffect, useState } from "react"
import useGetPaymentMethods from "@/module/AccountSettings/hooks/useGetPaymentMethods"
import usePaymentInfoStore from "./stores/use-payment-info-store"
import { E_PaymentType } from "@repo/contract"
import { Spinner } from "@/common/components/ui/Spinner"
import PaymentSavedForm from "./payment-saved-form"
import PaymentMethodForm from "./payment-method-form"
import { Select2 } from "@/common/components/ui/Select2"

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

  const selectedOption = combinedOptions?.find(
    (option) => option.id === selected
  )

  return (
    <>
      {isPendingPaymentMethods ? (
        <Spinner variant="primary" />
      ) : (
        <div>
          <Select2
            onChange={(e) => handleSelectionChange(Number(e.target.value))}
            className="w-1/2"
          >
            <option>Select payment method</option>
            {combinedOptions.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              )
            })}
          </Select2>

          {selected &&
          selectedOption &&
          selectedOption?.content &&
          typeof selected === "number" ? (
            <div className="mt-6 rounded-md">
              <div className="mt-4">{selectedOption?.content}</div>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

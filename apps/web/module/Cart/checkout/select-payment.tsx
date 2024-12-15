import { Typography } from '@/common/components/ui/Typography';
import { Listbox } from '@headlessui/react';
import { LucideCheck, LucideChevronDown, LucideCoins, LucideCreditCard, LucideLandmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import amex from "@/common/assets/amex.png"
import discover from "@/common/assets/discover-card.png"
import mastercard from "@/common/assets/mastercard.png"
import visa from "@/common/assets/visa.png"
import Image from "@/common/components/ui/image"
import xendit from "@/common/assets/powered-xendit.png"
import useGetPaymentMethods from "@/module/AccountSettings/hooks/useGetPaymentMethods"
import usePaymentInfoStore from "./store/usePaymentInfoStore"
import { E_PaymentType } from "@repo/contract"
import PaymentSavedForm from "./payment-saved-form"
import PaymentMethodForm from "./payment-method-form"
import Link from 'next/link';

export default function PaymentDropdown() {
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )
  const { data: paymentMethods, isPending: isPendingPaymentMethods } =
    useGetPaymentMethods()

  const savedCreditDebitOptions =
    paymentMethods?.items?.map((paymentMethod) => ({
      type: E_PaymentType.SavedCreditDebit,
      name: `${paymentMethod.cardType} ending with ${paymentMethod.lastFour}`,
      icon: <LucideCreditCard className="text-text-300" />,
      content: <PaymentSavedForm />,
      paymentMethodId: paymentMethod.id,
    })) ?? []

  const options = [
    {
      type: E_PaymentType.CreditDebit,
      name: "Pay using Credit or Debit card",
      icon: <LucideLandmark className="text-text-300" />,
      content: <PaymentMethodForm />,
      paymentMethodId: null,
    },
    {
      type: E_PaymentType.GCASH,
      name: "Pay using GCash",
      icon: <LucideCoins className="text-text-300" />,
      content: null,
      paymentMethodId: null,
    },
  ]

  const combinedOptions = [...options, ...savedCreditDebitOptions].map(
    (option, index) => ({
      ...option,
      id: index + 1,
    })
  )

  const [selected, setSelected] = useState(combinedOptions[0]);

  useEffect(() => {
    if (selected !== null) {
      updatePaymentInfo({
        key: "paymentType",
        value: selected?.type as E_PaymentType,
      })
      updatePaymentInfo({
        key: "paymentMethodId",
        value: selected?.paymentMethodId,
      })
    }
  }, [selected])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* Text */}
          <Typography variant="h3" fontWeight="semibold">Pay with</Typography>
          {/* Icons */}
          <div className="flex gap-2">
            <Image
              src={mastercard}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="mastercard"
            />
            <Image
              src={visa}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="visa"
            />
            <Image
              src={amex}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="amex"
            />
            <Image
              src={discover}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="discover"
            />
          </div>
        </div>
        <Link href="https://xendit.co/" target="_blank">
          <Image
            src={xendit}
            width={500}
            height={500}
            className="h-10 w-auto"
            alt="mastercard"
          />
        </Link>
      </div>
      <div className="w-80 mt-3">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1 z-10">
            {/* Button */}
            <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white py-3 pl-4 pr-4 text-left focus:outline-none sm:text-sm border border-text-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="mr-2">{selected?.icon}</span>
                  <span className="block truncate">{selected?.name}</span>

                </span>
                <LucideChevronDown className="ml-2 h-4 w-4" />
              </div>
            </Listbox.Button>

            {/* Options */}
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {combinedOptions.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none py-2 pl-4 pr-4 ${active ? 'bg-primary-100 text-primary-900' : 'text-text-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      {/* Left side: Icon and Name */}
                      <div className="flex items-center">
                        <span className="mr-2">{option.icon}</span>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {option.name}
                        </span>
                      </div>
                      {/* Right side: Checkmark */}
                      {selected && (
                        <LucideCheck className="h-5 w-5 text-info-500" aria-hidden="true" />
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      {selected &&
        selected &&
        selected?.content ? (
        <div className="mt-2 rounded-md">
          <div className="mt-4">{selected.content}</div>
        </div>
      ) : null}
    </div>
  );
}
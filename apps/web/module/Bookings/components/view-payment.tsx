import { Typography } from "@/common/components/ui/Typography"
import { Listbox } from "@headlessui/react"
import {
  LucideCheck,
  LucideChevronDown,
  LucideCoins,
  LucideCreditCard,
  LucideLandmark,
} from "lucide-react"
import { useEffect, useState } from "react"
import amex from "@/common/assets/amex.png"
import discover from "@/common/assets/discover-card.png"
import mastercard from "@/common/assets/mastercard.png"
import visa from "@/common/assets/visa.png"
import gcash from "@/common/assets/gcash.png"
import Image from "@/common/components/ui/image"
import xendit from "@/common/assets/powered-xendit.png"
import Link from "next/link"
import { E_PaymentType } from "@repo/contract"

export default function PaymentDropdown() {

  const options = [
    {
      type: E_PaymentType.CreditDebit,
      name: "Paid using Credit or Debit card",
      icon: <LucideLandmark className="text-text-300" />,
      paymentMethodId: null,
    },
    {
      type: E_PaymentType.GCASH,
      name: "Paid using GCash",
      icon: (
        <Image
          src={gcash}
          width={500}
          height={500}
          className="h-5 w-auto"
          alt="mastercard"
        />
      ),
      paymentMethodId: null,
    },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {options[1]?.icon}
          <Typography variant="h3" fontWeight="semibold">    
          {options[1]?.name}
          </Typography>
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

    </div>
  )
}

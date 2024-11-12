import { E_Supported_Currencies } from "@repo/contract-2/currency"
import React from "react"

type CurrencyIconProps = {
  currency?: E_Supported_Currencies
} & React.HTMLAttributes<HTMLSpanElement>

const CurrencyIcon: React.FC<CurrencyIconProps> = ({ currency, ...props }) => {
  const storedCurrency = localStorage.getItem(
    "currency"
  ) as E_Supported_Currencies | null
  const current =
    storedCurrency &&
    Object.values(E_Supported_Currencies).includes(storedCurrency)
      ? storedCurrency
      : E_Supported_Currencies.PHP

  const icons: { [key in E_Supported_Currencies]: JSX.Element } = {
    PHP: <span {...props}>₱</span>,
    USD: <span {...props}>$</span>,
    KRW: <span {...props}>₩</span>,
    EUR: <span {...props}>€</span>,
    AUD: <span {...props}>A$</span>,
    ILS: <span {...props}>₪</span>,
    GBP: <span {...props}>£</span>,
  }

  return icons[currency || current]
}

export default CurrencyIcon

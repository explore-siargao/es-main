import {
  E_Supported_Currencies,
  Z_Supported_Currency,
} from "@repo/contract-2/currency"

function formatCurrency(
  amount: number,
  currencyCode?: E_Supported_Currencies
): string {
  const storedCurrency = localStorage.getItem(
    "currency"
  ) as E_Supported_Currencies | null
  const isValid = Z_Supported_Currency.safeParse(storedCurrency).success
  const finalCurrency =
    currencyCode ||
    (isValid ? storedCurrency : E_Supported_Currencies.PHP) ||
    E_Supported_Currencies.PHP

  const locale = {
    PHP: "en-PH",
    USD: "en-US",
    KRW: "ko-KR",
    EUR: "de-DE",
    AUD: "en-AU",
    ILS: "he-IL",
    GBP: "en-GB",
  }[finalCurrency]

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: finalCurrency,
    minimumFractionDigits: finalCurrency === "KRW" ? 0 : 2,
    maximumFractionDigits: finalCurrency === "KRW" ? 0 : 2,
  })

  let formattedAmount = formatter.format(amount ? amount : 0)

  if (finalCurrency === "EUR") {
    formattedAmount = `€${formattedAmount.replace("€", "").trim()}`
  }

  return formattedAmount
}

export default formatCurrency

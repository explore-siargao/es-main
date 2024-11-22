import { E_Supported_Currencies } from '@repo/contract-2/currency'

export const convertPrice = (
  amountInPHP: number,
  targetCurrency: E_Supported_Currencies,
  conversionRates: { [key in E_Supported_Currencies]: number }
): number => {
  const rate = conversionRates[targetCurrency ?? E_Supported_Currencies.PHP]
  return amountInPHP * rate
}

import { E_Supported_Currencies } from '../constants'

export const convertPrice = (
  amountInPHP: number,
  targetCurrency: E_Supported_Currencies,
  conversionRates: { [key in E_Supported_Currencies]: number }
): number => {
  const rate = conversionRates[targetCurrency]
  return amountInPHP * rate
}

import { E_Supported_Currencies } from "../types/global";

function formatCurrency(amount: number, currencyCode: E_Supported_Currencies): string {
  // Define locale based on currency, with default for currency-specific formatting
  const locale = {
    PHP: 'en-PH',
    USD: 'en-US',
    KRW: 'ko-KR',
    EUR: 'de-DE',
    AUD: 'en-AU',
    ILS: 'he-IL',
    GBP: 'en-GB',
  }[currencyCode];

  // Format the amount as currency
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currencyCode === 'KRW' ? 0 : 2,
    maximumFractionDigits: currencyCode === 'KRW' ? 0 : 2,
  });

  // Format amount and handle Euro (€) symbol position
  let formattedAmount = formatter.format(amount);

  if (currencyCode === 'EUR') {
    // Ensure Euro symbol is in front for consistent formatting
    formattedAmount = `€${formattedAmount.replace('€', '').trim()}`;
  }

  return formattedAmount;
}

export default formatCurrency

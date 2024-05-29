const formatCurrency = (
  amount: number,
  country?: "Philippines" | "United States" | "Australia"
) => {
  const countryFormat: Record<string, string> = {
    PH: "en-PH",
    "United States": "en-US",
    Australia: "en-AU",
  }

  const countryCurrency: Record<string, string> = {
    Philippines: "PHP",
    "United States": "USD",
    Australia: "AUD",
  }

  const formatter = new Intl.NumberFormat(
    countryFormat[country || "United States"],
    {
      style: "currency",
      currency: countryCurrency[country || "United States"],
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  )

  return formatter.format(amount)
}

export default formatCurrency

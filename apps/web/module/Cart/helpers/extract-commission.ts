function extractCommission(total: number, percentage: number) {
  const basePrice = total / (1 + (percentage)); // Calculate the base price
  const extractedPercentage = total - basePrice;    // Calculate the 3% extracted
  
  return {
    basePrice: basePrice, // Rounded to 2 decimal places
    extractedPercentage: extractedPercentage // Rounded to 2 decimal places
  };
}

export default extractCommission;
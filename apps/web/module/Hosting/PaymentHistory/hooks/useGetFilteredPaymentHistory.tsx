import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { data } from "../../components/dummy"

const apiService = new ApiService("mock")
export async function getFilteredPaymentHistory(
  category: String,
  listing: String,
  year: String,
  month: String
) {
  const filteredData = data.filter(
    (item) =>
      (!category || item.category === category) &&
      (!listing || item.listing === listing)
  )

  const paymentHistoryByYear = filteredData.map((item) =>
    item.paymentHistoryData?.find((entry) => entry.year === year)
  )

  let filteredPaymentHistory: any[]

  if (month.toLowerCase() === "all") {
    filteredPaymentHistory = paymentHistoryByYear.flatMap(
      (paymentHistory) =>
        paymentHistory?.data.map(({ date, cancelled, completed }) => ({
          date,
          cancelled,
          completed,
        })) || []
    )
  } else {
    filteredPaymentHistory = filteredData.flatMap((item, index) => {
      const paymentHistory = paymentHistoryByYear[index]
      return (
        paymentHistory?.data
          .filter((entry) => entry.date === month)
          .map(({ cancelled, completed }) => ({ cancelled, completed })) || []
      )
    })
  }

  return filteredPaymentHistory
}

function useGetFilteredPaymentHistory(
  category: String,
  listing: String,
  year: String,
  month: String
) {
  const query = useQuery({
    queryKey: [category, listing, year, month],
    queryFn: () => getFilteredPaymentHistory(category, listing, year, month),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetFilteredPaymentHistory

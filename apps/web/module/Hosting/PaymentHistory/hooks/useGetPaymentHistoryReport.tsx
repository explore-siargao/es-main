import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { data } from "../../components/dummy"

const apiService = new ApiService("mock")
export async function getPaymentHistoryReport(
  category: String,
  listing: String
) {
  const filteredData = data.filter(
    (item) =>
      (!category || item.category === category) &&
      (!listing || item.listing === listing)
  )

  return filteredData
}

function useGetPaymentHistoryReport(category: String, listing: String) {
  const query = useQuery({
    queryKey: ["insights", category, listing],
    queryFn: () => getPaymentHistoryReport(category, listing),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetPaymentHistoryReport

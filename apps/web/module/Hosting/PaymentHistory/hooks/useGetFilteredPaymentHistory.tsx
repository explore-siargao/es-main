import { ApiService } from "@/common/service/api"
import { data } from "@/dummy"
import { useQuery } from "@tanstack/react-query"

const apiService = new ApiService("mock")
export async function getFilteredPaymentHistory(
  category: String,
  listing: String
) {
  const filteredData = data.filter(
    (item) =>
      (!category || item.category === category) &&
      (!listing || item.listing === listing)
  )
  return filteredData
  //return await apiService.get(`${API_URL_PAYMENT}/${category}/${listing}`)
}

function useGetFilteredPaymentHistory(category: String, listing: String) {
  const query = useQuery({
    queryKey: ["insights", category, listing],
    queryFn: () => getFilteredPaymentHistory(category, listing),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetFilteredPaymentHistory

import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { data } from "../../components/dummy"

const apiService = new ApiService("mock")
export async function getInsights(
  category: String,
  listing: String,
  year: String,
  month: String
) {
  const filteredData = data.filter(
    (item) =>
      (!category || item.category === category) &&
      (!listing || item.name === listing) &&
      (!year || item.year === year)
  )
  return filteredData
  //return await apiService.get(`${API_URL_INSIGHTS}/${category}/${listing}/${year}/${month}`)
}

function useGetInsights(
  category: String,
  listing: String,
  year: String,
  month: String
) {
  const query = useQuery({
    queryKey: ["insights", category, listing, year, month],
    queryFn: () => getInsights(category, listing, year, month),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetInsights

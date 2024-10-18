import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalNamesByCategory(category: string) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}/${category}/list`)
}

function useGetRentalNamesByCategory(category: string) {
  const query = useQuery({
    queryKey: ["rental-category-list", category],
    queryFn: () => getRentalNamesByCategory(category),
    enabled: !!category,
  })
  return query
}

export default useGetRentalNamesByCategory

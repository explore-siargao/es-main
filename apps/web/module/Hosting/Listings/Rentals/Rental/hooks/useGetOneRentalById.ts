import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getOneRentalById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/${id}/rates`)
}
function useGetOneRentalsById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["rental-by-id"],
    queryFn: () => getOneRentalById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetOneRentalsById

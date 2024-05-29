import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getOneRentalsByDetailsId(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/${id}/details`)
}
function useGetOneRentasByDetailsId(id: number | undefined) {
  const query = useQuery({
    queryKey: ["rental-by-detailId"],
    queryFn: () => getOneRentalsByDetailsId(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetOneRentasByDetailsId

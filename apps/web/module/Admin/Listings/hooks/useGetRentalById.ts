import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRentalById(id: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}/${id}`)
}

function useGetRentalById(id: string | undefined) {
  const query = useQuery({
    queryKey: ["rental", id],
    queryFn: () => getRentalById(id),
    enabled: !!id,
  })
  return query
}
export default useGetRentalById

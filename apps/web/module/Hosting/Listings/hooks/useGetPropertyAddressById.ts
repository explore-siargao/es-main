import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyAddressById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_PROPERTIES}/${id}/address`)
}

function useGetPropertyAddressById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["properties-address", id],
    queryFn: () => getPropertyAddressById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetPropertyAddressById

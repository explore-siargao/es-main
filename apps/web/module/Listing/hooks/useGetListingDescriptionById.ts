import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getDescriptionById(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/listing-description/${id}`)
}

function useGetListingDescriptionbyid(id: number | undefined) {
  const query = useQuery({
    queryKey: ["listing-description", id],
    queryFn: () => getDescriptionById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetListingDescriptionbyid

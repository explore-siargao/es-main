import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyLphotosById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_PROPERTIES}/${id}/photos`)
}

function useGetPropertyLphotosById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["properties-photos", id],
    queryFn: () => getPropertyLphotosById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetPropertyLphotosById

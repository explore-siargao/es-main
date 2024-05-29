import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getBasicAboutPlace(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/basic-about-place/${id}`)
}

function useGetBasicAboutPlace(id: number | undefined) {
  const query = useQuery({
    queryKey: ["basic-about-place", id],
    queryFn: () => getBasicAboutPlace(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetBasicAboutPlace

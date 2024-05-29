import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getHostProperties() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_PROPERTIES}`)
}

function useGetHostProperties() {
  const query = useQuery({
    queryKey: ["host-properties"],
    queryFn: () => getHostProperties(),
  })
  return query
}
export default useGetHostProperties

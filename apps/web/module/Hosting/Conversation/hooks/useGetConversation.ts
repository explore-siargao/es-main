import { API_URL_V1_CONVERSATIONS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getConversation() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_V1_CONVERSATIONS}/`)
}

function useGetConversation() {
  const query = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversation(),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetConversation

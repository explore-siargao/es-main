import { API_URL_V1_CONVERSATIONS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getConversationByConversationId(
  conversationId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_V1_CONVERSATIONS}/${conversationId}/messages`
  )
}

function useGetConversationByConversationId(
  conversationId: number | undefined
) {
  const query = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationByConversationId(conversationId),
    refetchOnWindowFocus: false,
    enabled: !!conversationId,
  })
  return query
}

export default useGetConversationByConversationId

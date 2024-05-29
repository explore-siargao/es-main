import { API_URL_V1_CONVERSATIONS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_AddConversation } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addConversation(props: T_AddConversation) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_V1_CONVERSATIONS}/`, props)
}

function useAddConversation() {
  const query = useMutation({
    mutationFn: (props: T_AddConversation) => addConversation(props),
  })
  return query
}

export default useAddConversation

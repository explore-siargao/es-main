import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"

export async function setReceivedEmail(canReceive: boolean) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_USERS}/received-email`, {
    canReceive,
  })
}
function useSetReceivedEmail(callbacks: {
  onSuccess: Function
  onError: Function
}) {
  const query = useMutation({
    mutationFn: ({ canReceive }: { canReceive: boolean }) =>
      setReceivedEmail(canReceive),
    onSuccess: (data, variables, context) => {
      callbacks.onSuccess(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks.onError(error, variables, context)
    },
  })
  return query
}

export default useSetReceivedEmail

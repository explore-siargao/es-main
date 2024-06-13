import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"

export async function setReceivedEmail(
  userId: number | string,
  canReceive: boolean
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_USERS}/${userId}/received-email`, {
    canReceive,
  })
}
function useSetReceivedEmail(
  userId: number | string,
  callbacks: { onSuccess: Function; onError: Function }
) {
  const query = useMutation({
    mutationFn: ({ canReceive }: { canReceive: boolean }) =>
      setReceivedEmail(userId, canReceive),
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

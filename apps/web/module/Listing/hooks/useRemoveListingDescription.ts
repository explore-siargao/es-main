import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeListingDescription(userId: number, id: number) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_LISTINGS}/${userId}/listing-description/${id}`
  )
}

function useRemoveListingDescription(userId: number, id: number) {
  const query = useMutation({
    mutationFn: () => removeListingDescription(userId, id),
  })
  return query
}
export default useRemoveListingDescription

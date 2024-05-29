import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeListing(userId: number, listingId: number) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_LISTINGS}/${userId}/listing/${listingId}`
  )
}

function useRemoveListing(userId: number, listingId: number) {
  const query = useMutation({
    mutationFn: () => removeListing(userId, listingId),
  })
  return query
}
export default useRemoveListing

import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Listing } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateListing(userId: number | null, props: T_Listing) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/listing/${props.id}`,
    props
  )
}

function useUpdateListing(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_Listing) => updateListing(userId, props),
  })
  return query
}
export default useUpdateListing

import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_ListingDescription } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateListingDescription(
  userId: number | null,
  props: T_ListingDescription
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/listing-description/${props.id}`,
    props
  )
}

function useUpdateListingDescription(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_ListingDescription) =>
      updateListingDescription(userId, props),
  })
  return query
}
export default useUpdateListingDescription

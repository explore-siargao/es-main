import { ApiService } from "@/common/service/api"
import { IWishGroup } from "@/common/types/global"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function addToExisting(
  userId: number | undefined,
  props: IWishGroup
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/add-existing-group`,
    props
  )
}

function useAddToExistingWishGroup(userId: number) {
  const query = useMutation({
    mutationFn: (props: IWishGroup) => addToExisting(userId, props),
  })
  return query
}
export default useAddToExistingWishGroup

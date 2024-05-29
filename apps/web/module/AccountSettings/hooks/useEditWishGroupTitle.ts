import { ApiService } from "@/common/service/api"
import { IWishGroup } from "@/common/types/global"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function editWishgroupTitle(
  userId: number | null,
  props: IWishGroup
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/wish-group/update-title`,
    props
  )
}

function useEditWishGroupTitle(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: IWishGroup) => editWishgroupTitle(userId, props),
  })
  return query
}
export default useEditWishGroupTitle

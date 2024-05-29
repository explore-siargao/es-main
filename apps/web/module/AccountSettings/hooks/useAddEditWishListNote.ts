import { ApiService } from "@/common/service/api"
import { IWishGroup } from "@/common/types/global"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function addEditWishListNote(
  userId: number | undefined,
  wishGroupId: number | undefined,
  props: IWishGroup
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/note/${wishGroupId}`,
    props
  )
}

function useAddEditWishListNote(userId: number, wishGroupId: number) {
  const query = useMutation({
    mutationFn: (props: IWishGroup) =>
      addEditWishListNote(userId, wishGroupId, props),
  })
  return query
}
export default useAddEditWishListNote

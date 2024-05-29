import { ApiService } from "@/common/service/api"
import { IWishGroup } from "@/common/types/global"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteWishGroup(userId: number, title: string) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_LISTINGS}/${userId}/wish-group/delete/${String(title)}`
  )
}

function useDeleteWishGroupByTitle(userId: number, title: string) {
  const query = useMutation({
    mutationFn: (props: IWishGroup) => deleteWishGroup(userId, title),
  })
  return query
}
export default useDeleteWishGroupByTitle

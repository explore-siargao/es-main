import { ApiService } from "@/common/service/api"
import { IWishGroup } from "@/common/types/global"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeFromWishGroup(listingId: number) {
  const apiService = new ApiService()
  return await apiService.delete(`${API_URL_LISTINGS}/wish/delete/${listingId}`)
}

function useRemoveFromWishGroup() {
  const query = useMutation({
    mutationFn: (props: IWishGroup) => removeFromWishGroup(props?.id as number),
  })
  return query
}
export default useRemoveFromWishGroup

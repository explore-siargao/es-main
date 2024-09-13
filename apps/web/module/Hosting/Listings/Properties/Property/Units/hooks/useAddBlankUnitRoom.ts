import { useMutation } from "@tanstack/react-query"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addBlankUnitRoom(propertyId: string) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_PROPERTIES}/${propertyId}/units/room`,
    {}
  )
}

function useAddBlankUnitRoom(propertyId: string) {
  const query = useMutation({
    mutationFn: () => addBlankUnitRoom(propertyId),
  })
  return query
}

export default useAddBlankUnitRoom

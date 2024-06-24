import { useMutation } from "@tanstack/react-query"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addBlankUnitWholePlace(propertyId: string) {
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${propertyId}/units/whole-place`,
    {}
  )
}

function useAddBlankUnitWholePlace(propertyId: string) {
  const query = useMutation({
    mutationFn: () => addBlankUnitWholePlace(propertyId),
  })
  return query
}

export default useAddBlankUnitWholePlace

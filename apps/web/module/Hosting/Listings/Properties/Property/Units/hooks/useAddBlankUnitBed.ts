import { useMutation } from "@tanstack/react-query"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addBlankUnitBed(propertyId: string) {
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${propertyId}/units/bed`,
    {}
  )
}

function useAddBlankUnitBed(propertyId: string) {
  const query = useMutation({
    mutationFn: () => addBlankUnitBed(propertyId),
  })
  return query
}

export default useAddBlankUnitBed

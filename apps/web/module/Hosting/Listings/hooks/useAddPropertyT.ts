import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Property } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addPropertyType(props: T_Property) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_PROPERTIES}/add/property-type`, props)
}

function useAddPropertyType() {
  const query = useMutation({
    mutationFn: addPropertyType,
  })
  return query
}

export default useAddPropertyType

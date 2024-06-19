import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

export async function addBlankProperty() {
  const apiService = new ApiService("v2")
  return await apiService.post(`${API_URL_PROPERTIES}`, {})
}

function useAddBlankProperty() {
  const query = useMutation({
    mutationFn: () => addBlankProperty(),
  })
  return query
}

export default useAddBlankProperty

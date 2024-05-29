import { useMutation } from "@tanstack/react-query"
import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addBlankRental() {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_RENTALS}`, {})
}

function useAddBlankRental() {
  const query = useMutation({
    mutationFn: () => addBlankRental(),
  })
  return query
}

export default useAddBlankRental

import { useMutation } from "@tanstack/react-query"
import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addRentals() {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_RENTALS}/`, null)
}

function useAddRentals() {
  const query = useMutation({
    mutationFn: () => addRentals(),
  })
  return query
}
export default useAddRentals

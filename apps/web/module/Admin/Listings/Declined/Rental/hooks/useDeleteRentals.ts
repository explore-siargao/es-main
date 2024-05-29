import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteRentals(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.delete(`${API_URL_RENTALS}/${id}`)
}

function useDeleteRentals(id: number | undefined) {
  const query = useMutation({
    mutationFn: () => deleteRentals(id),
  })
  return query
}

export default useDeleteRentals

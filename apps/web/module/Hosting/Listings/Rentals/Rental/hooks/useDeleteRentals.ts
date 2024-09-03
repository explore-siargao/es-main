import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteRentals(id: string | undefined) {
  const apiService = new ApiService()
  return await apiService.delete(`${API_URL_RENTALS}/${id}`)
}

function useDeleteRentals(id: string | undefined) {
  const query = useMutation({
    mutationFn: () => deleteRentals(id),
  })
  return query
}

export default useDeleteRentals

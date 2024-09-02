import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getHostRentals() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}`)
}

function useGetHostRentals() {
  const query = useQuery({
    queryKey: ["host-rentals"],
    queryFn: () => getHostRentals(),
  })
  return query
}
export default useGetHostRentals

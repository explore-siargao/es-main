import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getVehiclesByRentalId(id:string) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}/${id}/ids`)
}

function useGetVehiclesByRentalId(id:string) {
  const query = useQuery({
    queryKey: ["rental-vehicles-ids"],
    queryFn: () => getVehiclesByRentalId(id),
  })
  return query
}

export default useGetVehiclesByRentalId

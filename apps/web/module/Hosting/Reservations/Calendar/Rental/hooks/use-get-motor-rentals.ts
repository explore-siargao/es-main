import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { T_BackendResponse, T_Calendar_Motor_Rental } from "@repo/contract"
import { useQuery } from "@tanstack/react-query"


type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  items: T_Calendar_Motor_Rental[]
}

export async function getMotorRentals(startDate: string, endDate: string) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(
    `${API_URL_RENTALS}/calendar/motor?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetMotorRentals(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-motor"],
    queryFn: () => getMotorRentals(startDate, endDate),
  })
  return query
}

export default useGetMotorRentals

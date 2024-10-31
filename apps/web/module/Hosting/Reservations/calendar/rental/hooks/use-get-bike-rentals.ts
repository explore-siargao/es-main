import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { QK_CALENDAR_BIKE_RENTALS } from "../constants"
import { T_BackendResponse, T_Calendar_Bike_Rental } from "@repo/contract"

type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  items: T_Calendar_Bike_Rental[]
}

export async function getBikeRentals(startDate: string, endDate: string) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(
    `${API_URL_RENTALS}/calendar/bike?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetBikeRentals(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: [QK_CALENDAR_BIKE_RENTALS],
    queryFn: () => getBikeRentals(startDate, endDate),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetBikeRentals

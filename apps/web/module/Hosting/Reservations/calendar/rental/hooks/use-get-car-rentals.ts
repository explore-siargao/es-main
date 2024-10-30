import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { T_BackendResponse, T_Calendar_Car_Rental } from "@repo/contract"
import { useQuery } from "@tanstack/react-query"
import { QK_CALENDAR_CAR_RENTALS } from "../constants"

type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  items: T_Calendar_Car_Rental[]
}

export async function getCarRentals(startDate: string, endDate: string) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(
    `${API_URL_RENTALS}/calendar/car?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCarRentals(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: [QK_CALENDAR_CAR_RENTALS],
    queryFn: () => getCarRentals(startDate, endDate),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetCarRentals

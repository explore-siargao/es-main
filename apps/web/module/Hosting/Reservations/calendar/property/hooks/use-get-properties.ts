import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { QK_CALENDAR_PROPERTIES } from "../constants"
import { T_BackendResponse, T_Calendar_Property } from "@repo/contract"

type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  items: T_Calendar_Property[]
}

export async function getProperties(startDate: string, endDate: string) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(
    `${API_URL_PROPERTIES}/calendar/property?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetProperties(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: [QK_CALENDAR_PROPERTIES],
    queryFn: () => getProperties(startDate, endDate),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetProperties

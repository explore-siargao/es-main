import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPaymentHistoryTable(date: string) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_BOOKINGS}/payment-history/${date}/bookings`
  )
}

function useGetPaymentHistoryTable(date: string) {
  const query = useQuery({
    queryKey: ["payment-history-table"],
    queryFn: () => getPaymentHistoryTable(date),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetPaymentHistoryTable

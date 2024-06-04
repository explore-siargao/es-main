import { ApiService } from "@/common/service/api"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPaymentMethods(userId: string | null) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_PAYMENTS}/${userId}/payment-method`)
}

function useGetPaymentMethods(userId: string | null) {
  const query = useQuery({
    queryKey: ["payment-method", userId],
    queryFn: () => getPaymentMethods(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetPaymentMethods

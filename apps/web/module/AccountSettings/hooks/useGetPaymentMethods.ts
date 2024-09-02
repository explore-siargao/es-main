import { ApiService } from "@/common/service/api"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPaymentMethods() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PAYMENTS}/payment-method`)
}

function useGetPaymentMethods() {
  const query = useQuery({
    queryKey: ["payment-method"],
    queryFn: () => getPaymentMethods(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetPaymentMethods

import { ApiService } from "@/common/service/api"
import { API_URL_TAX } from "@/common/constants"
import { T_Taxes, T_BackendResponse } from "@repo/contract"
import { useQuery } from "@tanstack/react-query"

type T_DBReturn = Omit<T_BackendResponse, "item"> & {
  item: T_Taxes
}

export async function geTaxId(userId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(`${API_URL_TAX}/${userId}`)
}

function useGetTaxByUser(userId: number | undefined) {
  const query = useQuery({
    queryKey: ["tax", userId],
    queryFn: () => geTaxId(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}

export default useGetTaxByUser

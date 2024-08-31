import { API_URL_TAX } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"
import { T_Taxes } from "@repo/contract"

export async function addTax(props: T_Taxes) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_TAX}`, props)
}

function useAddTax() {
  const query = useMutation({
    mutationFn: (props: T_Taxes) => addTax(props),
  })
  return query
}
export default useAddTax

import { useQuery } from "@tanstack/react-query"
import { ForPaymentService } from "@repo/contract-2/for-payment-listings"

const queryKeys = ForPaymentService.getQueryKeys()

export async function getForPayment(forPaymentId: string) {
  const forPayment = new ForPaymentService()
  return await forPayment.getForPayment(forPaymentId)
}

function useGetForPayment(forPaymentId: string) {
  const query = useQuery({
    queryKey: [queryKeys.getItems],
    queryFn: () => getForPayment(forPaymentId),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetForPayment

import { useQuery } from "@tanstack/react-query"
import { ReservationService } from "@repo/contract-2/reservations"

const queryKeys = ReservationService.getQueryKeys()

export async function getGroupedReservations(
  page: number,
  referenceId: string
) {
  const reservation = new ReservationService()
  return await reservation.getGroupedReservations(page, referenceId)
}

function useGetGroupedReservations(page: number, referenceId: string) {
  const query = useQuery({
    queryKey: [queryKeys.getGroupedReservations, page, referenceId],
    queryFn: () => getGroupedReservations(page, referenceId),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetGroupedReservations

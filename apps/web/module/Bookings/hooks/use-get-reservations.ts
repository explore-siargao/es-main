import { useQuery } from "@tanstack/react-query";
import { ReservationService } from "@repo/contract-2/reservations";

const queryKeys = ReservationService.getQueryKeys();

export type T_Reservation_Status = "Cancelled" | "Done" | "Active"

export async function getReservations(status: T_Reservation_Status, page: number, referenceId?: string) {
  const reservation = new ReservationService();
  return await reservation.getReservations(status, page, referenceId);
}

function useGetReservations(status: T_Reservation_Status, page: number, referenceId?: string) {
  const query = useQuery({
    queryKey: [queryKeys.getItems, page, referenceId], 
    queryFn: () => getReservations(status, page, referenceId),
    refetchOnWindowFocus: false,
  });
  return query;
}

export default useGetReservations;

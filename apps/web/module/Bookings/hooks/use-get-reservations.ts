import { useQuery } from "@tanstack/react-query";
import { ReservationService } from "@repo/contract-2/reservations";

const queryKeys = ReservationService.getQueryKeys();

export type T_Reservation_Status = "Cancelled" | "Done" | "Active"

export async function getReservations(status: T_Reservation_Status, page: number) {
  const reservation = new ReservationService();
  return await reservation.getReservations(status, page);
}

function useGetReservations(status: T_Reservation_Status, page: number) {
  const query = useQuery({
    queryKey: [queryKeys.getItems,page], 
    queryFn: () => getReservations(status, page),
    refetchOnWindowFocus: false,
  });
  return query;
}

export default useGetReservations;

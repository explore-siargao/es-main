import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

export async function getReservations({
  status,
  category,
  year,
  month,
}: {
  status: string
  category: string
  year: string
  month: string
}) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_RESERVATIONS}/host?status=${status}&category=${category}&year=${year}&month=${month}`
  )
}

function useGetReservations({ status }: { status: string }) {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const query = useQuery({
    queryKey: ["reservations", status, category, year, month],
    queryFn: () =>
      getReservations({
        status: status || "Upcoming",
        category: category || "Property",
        year: year || "2024",
        month: month || "All",
      }),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetReservations

import { useQuery } from "@tanstack/react-query"
import { data } from "@/dummy"

export async function getEarningsReport() {
  
  return data[0]?.earningsData;
}

function useGetEarningsReport() {
  const query = useQuery({
    queryKey: ["earnings"],
    queryFn: () => getEarningsReport(),
  })
  return query
}

export default useGetEarningsReport

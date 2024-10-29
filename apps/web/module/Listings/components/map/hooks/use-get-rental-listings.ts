import { ApiService } from "@/common/service/api";
import { API_URL_RENTALS } from "@/common/constants";
import { useQuery } from "@tanstack/react-query";

const normalizeParam = (param: string | null): string => {
  return param ? param : "any";
}

export async function getRentalListings(
  location: string | null,
  type:  string | null, 
  transmission: string | null,
  seats:  string | null, 
  priceFrom:  string | null,
  priceTo:  string | null, 
  stars:  string | null
) {
  const apiService = new ApiService();
  return await apiService.get(`${API_URL_RENTALS}/filtered?` +
    `location=${normalizeParam(location)}` +
    `&type=${normalizeParam(type)}` +
    `&transmission=${normalizeParam(transmission)}` +
    `&seats=${normalizeParam(seats)}` +
    `&priceFrom=${normalizeParam(priceFrom)}` +
    `&priceTo=${normalizeParam(priceTo)}` +
    `&stars=${normalizeParam(stars)}` 
  );
}

function useGetRentalListings(
  location: string | null,
  type:  string | null, 
  transmission: string | null,
  seats:  string | null, 
  priceFrom:  string | null,
  priceTo:  string | null, 
  stars:  string | null
) {
  const query = useQuery({
    queryKey: ["filter-rentals"],
    refetchOnWindowFocus: false,
    queryFn: () => getRentalListings(
      location,
      type, 
      transmission,
      seats, 
      priceFrom,
      priceTo, 
      stars
    ),
  });
  return query;
}

export default useGetRentalListings;

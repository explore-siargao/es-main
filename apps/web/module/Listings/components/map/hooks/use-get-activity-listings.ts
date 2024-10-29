import { ApiService } from "@/common/service/api";
import { API_URL_RENTALS } from "@/common/constants";
import { useQuery } from "@tanstack/react-query";

const normalizeParam = (param: string | null): string => {
  return param ? param : "any";
}

export async function getActivityListings(
  location: string | null,
  type:  string | null, 
  activityTypes: string | null,
  priceFrom:  string | null,
  priceTo:  string | null, 
  duration:  string | null, 
  stars:  string | null
) {
  const apiService = new ApiService();
  return await apiService.get(`${API_URL_RENTALS}/filtered?` +
    `location=${normalizeParam(location)}` +
    `&type=${normalizeParam(type)}` +
    `&activityTypes=${normalizeParam(activityTypes)}` +
    `&priceFrom=${normalizeParam(priceFrom)}` +
    `&priceTo=${normalizeParam(priceTo)}` +
    `&duration=${normalizeParam(duration)}` +
    `&stars=${normalizeParam(stars)}` 
  );
}

function useGetActivityListings(
  location: string | null,
  type:  string | null, 
  activityTypes: string | null,
  priceFrom:  string | null,
  priceTo:  string | null, 
  duration:  string | null, 
  stars:  string | null
) {
  const query = useQuery({
    queryKey: ["filter-activities"],
    refetchOnWindowFocus: false,
    queryFn: () => getActivityListings(
     location, type, activityTypes, priceFrom, priceTo, duration, stars
    ),
  });
  return query;
}

export default useGetActivityListings;

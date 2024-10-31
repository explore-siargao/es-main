import { ApiService } from "@/common/service/api";
import { API_URL_ACTIVITIES } from "@/common/constants";
import { useQuery } from "@tanstack/react-query";

const normalizeParam = (param: string | null): string => {
  return param ? param : "any";
}

export async function getActivityListings(
  location: string | null,
  activityTypes: string | null,
  type:  string | null, 
  priceFrom:  string | null,
  priceTo:  string | null, 
  duration:  string | null, 
  stars:  string | null
) {
  const apiService = new ApiService();
  return await apiService.get(`${API_URL_ACTIVITIES}/filtered?` +
    `location=${normalizeParam(location)}` +
    `&activityTypes=${normalizeParam(activityTypes)}` +
    `&type=${normalizeParam(type)}` +
    `&priceFrom=${normalizeParam(priceFrom)}` +
    `&priceTo=${normalizeParam(priceTo)}` +
    `&duration=${normalizeParam(duration)}` +
    `&stars=${normalizeParam(stars)}` 
  );
}

function useGetActivityListings(
  location: string | null,
  activityTypes: string | null,
  type:  string | null, 
  priceFrom:  string | null,
  priceTo:  string | null, 
  duration:  string | null, 
  stars:  string | null
) {
  const query = useQuery({
    queryKey: ["filter-activities"],
    refetchOnWindowFocus: false,
    queryFn: () => getActivityListings(
     location,  activityTypes, type, priceFrom, priceTo, duration, stars
    ),
  });
  return query;
}

export default useGetActivityListings;

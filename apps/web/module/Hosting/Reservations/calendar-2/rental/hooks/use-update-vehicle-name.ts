import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type VEHICLE = {
  id: string
  name: string
}
export async function updateVehicleName(props: VEHICLE) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_RENTALS}/update-vehicle`, props)
}

function useUpdateVehicleName() {
  const query = useMutation({
    mutationFn: (props: VEHICLE) => updateVehicleName(props),
  })
  return query
}
export default useUpdateVehicleName

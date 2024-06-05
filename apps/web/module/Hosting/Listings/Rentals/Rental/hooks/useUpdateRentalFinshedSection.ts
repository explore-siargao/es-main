import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Listing_Location } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

interface I_RentalFinishedSection{
    finishedSection:string[]
}
export async function updateRentalFinishedSection(
  id: string | undefined,
  props: I_RentalFinishedSection
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/finished-sections`, props)
}

function useUpdateRentalFinishedSection(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: I_RentalFinishedSection) => updateRentalFinishedSection(id, props),
  })
  return query
}

export default useUpdateRentalFinishedSection

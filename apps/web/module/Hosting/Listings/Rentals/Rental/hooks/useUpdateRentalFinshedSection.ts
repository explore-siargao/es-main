import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface IRentalFinishedSection {
  finishedSection: string[]
}
export async function updateRentalFinishedSection(
  id: string | undefined,
  props: IRentalFinishedSection
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_RENTALS}/${id}/finished-sections`,
    props
  )
}

function useUpdateRentalFinishedSection(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: IRentalFinishedSection) =>
      updateRentalFinishedSection(id, props),
  })
  return query
}

export default useUpdateRentalFinishedSection

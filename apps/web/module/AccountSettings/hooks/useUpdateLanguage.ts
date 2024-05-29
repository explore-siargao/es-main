import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface ILanguage {
  language: string
}

export async function updateLanguage(
  personalInfoId: number | null,
  props: ILanguage
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_USERS}/personal-info/language/${personalInfoId}`,
    props
  )
}

function useUpdateLanguage(personalInfoId: number | null) {
  const query = useMutation({
    mutationFn: (props: ILanguage) => updateLanguage(personalInfoId, props),
  })
  return query
}
export default useUpdateLanguage

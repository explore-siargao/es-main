import ErrorContent from "@/common/components/ErrorContent"
import { MESSAGE_404 } from "@/common/constants"

export default function NotFound() {
  return (
    <>
      <ErrorContent mainError="404 - PAGE NOT FOUND" errorDesc={MESSAGE_404} />
    </>
  )
}
